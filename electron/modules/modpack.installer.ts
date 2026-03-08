import path from 'node:path';
import fs from 'node:fs';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { InstanceManager, GameInstance } from './instance.manager';

// mrpack manifest types
interface MrpackFile {
  path: string;
  hashes: { sha512?: string; sha1?: string };
  downloads: string[];
  fileSize: number;
  env?: { client?: string; server?: string };
}

interface MrpackIndex {
  game: string;
  versionId: string;
  name: string;
  summary?: string;
  dependencies: {
    minecraft: string;
    'fabric-loader'?: string;
    'forge'?: string;
    'neoforge'?: string;
    'quilt-loader'?: string;
  };
  files: MrpackFile[];
}

export type InstallProgress = {
  stage: 'downloading_mrpack' | 'extracting' | 'installing_loader' | 'downloading_files' | 'done' | 'error';
  message: string;
  percent: number;
};

type ProgressCallback = (progress: InstallProgress) => void;

// Скачать файл в буфер
async function downloadToBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} при скачивании ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Скачать файл на диск
async function downloadToFile(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} при скачивании ${url}`);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const writer = createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body as any), writer);
}

// Распаковать zip (mrpack = zip)
async function extractZip(zipBuffer: Buffer, extractDir: string): Promise<Map<string, Buffer>> {
  // Используем встроенный Node.js zlib для простых случаев
  // Для zip нужен сторонний модуль. Используем динамический import.
  const AdmZip = (await import('adm-zip')).default;
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries();
  const files = new Map<string, Buffer>();

  for (const entry of entries) {
    if (!entry.isDirectory) {
      files.set(entry.entryName, entry.getData());
    }
  }

  return files;
}

export async function installModpack(
  mrpackUrl: string,
  projectId: string,
  versionId: string,
  projectName: string,
  iconUrl: string | null,
  gamePath: string,
  onProgress: ProgressCallback
): Promise<string> {
  const instanceManager = new InstanceManager(gamePath);

  // Генерируем id инстанса из названия
  const instanceId = `modpack-${projectId}-${versionId}`.slice(0, 64).replace(/[^a-zA-Z0-9\-_]/g, '-');

  try {
    // 1. Скачать .mrpack файл
    onProgress({ stage: 'downloading_mrpack', message: `Скачивание ${projectName}...`, percent: 5 });
    const mrpackBuffer = await downloadToBuffer(mrpackUrl);

    // 2. Распаковать и найти modrinth.index.json
    onProgress({ stage: 'extracting', message: 'Распаковка модпака...', percent: 15 });
    const files = await extractZip(mrpackBuffer, '');

    const indexBuffer = files.get('modrinth.index.json');
    if (!indexBuffer) throw new Error('modrinth.index.json не найден в архиве');

    const index: MrpackIndex = JSON.parse(indexBuffer.toString('utf-8'));

    // 3. Определяем загрузчик
    const mcVersion = index.dependencies.minecraft;
    let loaderType: 'fabric' | 'forge' | 'neoforge' | 'vanilla' = 'vanilla';
    let loaderVersion: string | undefined;

    if (index.dependencies['fabric-loader']) {
      loaderType = 'fabric';
      loaderVersion = index.dependencies['fabric-loader'];
    } else if (index.dependencies['neoforge']) {
      loaderType = 'neoforge';
      loaderVersion = index.dependencies['neoforge'];
    } else if (index.dependencies['forge']) {
      loaderType = 'forge';
      loaderVersion = index.dependencies['forge'];
    }

    // 4. Создаём инстанс
    const instanceDir = instanceManager.ensureInstanceDir(instanceId);

    // 5. Копируем overrides (файлы из папки overrides/ в архиве)
    onProgress({ stage: 'extracting', message: 'Копирование файлов модпака...', percent: 25 });
    for (const [entryName, data] of files.entries()) {
      if (entryName.startsWith('overrides/')) {
        const relPath = entryName.slice('overrides/'.length);
        if (!relPath) continue;
        const destPath = path.join(instanceDir, relPath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, data);
      }
      if (entryName.startsWith('client-overrides/')) {
        const relPath = entryName.slice('client-overrides/'.length);
        if (!relPath) continue;
        const destPath = path.join(instanceDir, relPath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, data);
      }
    }

    // 6. Скачиваем файлы из index.files (моды и прочее)
    const clientFiles = index.files.filter(f => {
      // Пропускаем server-only файлы
      if (f.env?.client === 'unsupported') return false;
      return true;
    });

    onProgress({ stage: 'downloading_files', message: `Скачивание файлов (0/${clientFiles.length})...`, percent: 30 });

    let downloaded = 0;
    const CONCURRENT = 4;

    // Скачиваем пачками по CONCURRENT файлов
    for (let i = 0; i < clientFiles.length; i += CONCURRENT) {
      const batch = clientFiles.slice(i, i + CONCURRENT);
      await Promise.all(batch.map(async (file) => {
        const destPath = path.join(instanceDir, file.path);
        // Не перескачиваем если уже есть и размер совпадает
        if (fs.existsSync(destPath) && fs.statSync(destPath).size === file.fileSize) {
          downloaded++;
          return;
        }
        const url = file.downloads[0];
        if (!url) return;
        await downloadToFile(url, destPath);
        downloaded++;
      }));

      const percent = 30 + Math.floor((downloaded / clientFiles.length) * 60);
      onProgress({
        stage: 'downloading_files',
        message: `Скачивание файлов (${downloaded}/${clientFiles.length})...`,
        percent
      });
    }

    // 7. Сохраняем инстанс в реестре
    const instance: GameInstance = {
      id: instanceId,
      name: projectName,
      type: loaderType === 'neoforge' ? 'forge' : (loaderType as any),
      gameVersion: mcVersion,
      loaderVersion,
      iconUrl: iconUrl || undefined,
      description: index.summary,
      createdAt: new Date().toISOString(),
      modrinthProjectId: projectId,
      modrinthVersionId: versionId,
    };
    instanceManager.save(instance);

    onProgress({ stage: 'done', message: `${projectName} установлен!`, percent: 100 });
    return instanceId;

  } catch (err: any) {
    onProgress({ stage: 'error', message: `Ошибка: ${err.message}`, percent: 0 });
    throw err;
  }
}
