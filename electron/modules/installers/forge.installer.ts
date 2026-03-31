import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const FORGE_MAVEN = 'https://maven.minecraftforge.net/net/minecraftforge/forge';
const NEOFORGE_MAVEN = 'https://maven.neoforged.net/releases/net/neoforged/neoforge';
const S3_BASE = 'https://s3.twcstorage.ru/25f7f6a6-e7bd-4e1a-b0ff-5abadb3c2fcc/hardlauncher/forge-installers';

// ── URL инсталлера ────────────────────────────────────────────────────────────

function getForgeInstallerInfo(gameVersion: string, loaderVersion: string): { url: string; name: string } {
  const parts = gameVersion.split('.');
  const minor = parseInt(parts[1]);
  const patch = parseInt(parts[2] || '0');

  const isLegacy = minor < 12 || (minor === 12 && patch < 2);

  // ОЧИЩАЕМ loaderVersion от дублей версии игры, если они там есть
  // Если пришло "1.20.1-47.4.10", оставляем только "47.4.10"
  const cleanLoader = loaderVersion.includes(`${gameVersion}-`) 
    ? loaderVersion.split(`${gameVersion}-`)[1] 
    : loaderVersion;

  if (isLegacy) {
    const name = `forge-${gameVersion}-${cleanLoader}-${gameVersion}-installer.jar`;
    const url = `${FORGE_MAVEN}/${gameVersion}-${cleanLoader}-${gameVersion}/${name}`;
    return { url, name };
  }

  // Для современных версий (1.12.2+) формат: 1.20.1-47.4.10
  const fullVersion = `${gameVersion}-${cleanLoader}`;
  const name = `forge-${fullVersion}-installer.jar`;
  const url = `${FORGE_MAVEN}/${fullVersion}/${name}`;
  
  return { url, name };
}

function extractNeoVer(gameVersion: string, loaderVersion: string): string {
  if (loaderVersion.includes(`${gameVersion}-`)) {
    return loaderVersion.split(`${gameVersion}-`)[1];
  }
  if (loaderVersion.includes('-')) {
    return loaderVersion.split('-').slice(1).join('-');
  }
  return loaderVersion;
}

function getInstallerInfo(gameVersion: string, loaderVersion: string, isNeo: boolean): { url: string; name: string } {
  if (isNeo) {
    const neoVer = extractNeoVer(gameVersion, loaderVersion);
    const name = `neoforge-${neoVer}-installer.jar`;
    const url = `${NEOFORGE_MAVEN}/${neoVer}/${name}`;
    return { url, name };
  }
  return getForgeInstallerInfo(gameVersion, loaderVersion);
}

// ── Скачивание с retry + S3 fallback ─────────────────────────────────────────

async function downloadFileFromUrl(
  url: string,
  dest: string,
  webContents: Electron.WebContents,
  label = ''
): Promise<void> {
  const response = await fetch(url, { signal: AbortSignal.timeout(300000) });
  if (!response.ok) throw new Error(`HTTP ${response.status} — ${url}`);

  const total = Number(response.headers.get('content-length') || 0);
  let current = 0;

  const writer = fs.createWriteStream(dest);
  const reader = response.body!.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    writer.write(value);
    current += value.length;
    if (total > 0) {
      webContents.send('download-progress', {
        percent: Math.round((current / total) * 100),
        current: current.toString(),
        total: total.toString(),
        isChecking: false,
        label,
      });
    }
  }

  await new Promise<void>((resolve, reject) => {
    writer.end();
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  // Проверяем что файл не пустой
  const stat = fs.statSync(dest);
  if (stat.size < 10000) {
    fs.unlinkSync(dest);
    throw new Error(`Файл скачался слишком маленьким (${stat.size} байт) — возможно ошибка сервера`);
  }
}

async function downloadWithRetry(
  urls: string[],          // список источников по приоритету
  dest: string,
  webContents: Electron.WebContents,
  label = '',
  retries = 2
): Promise<void> {
  for (const url of urls) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`[Forge] Попытка ${attempt}/${retries}: ${url}`);
        webContents.send('launch-status', `Скачивание ${label} (попытка ${attempt})...`);
        await downloadFileFromUrl(url, dest, webContents, label);
        console.log(`[Forge] Успешно скачан с: ${url}`);
        return; // успех — выходим
      } catch (err: any) {
        console.warn(`[Forge] Ошибка (${url}, попытка ${attempt}): ${err.message}`);
        // Удаляем битый файл если есть
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, 2000 * attempt)); // пауза перед retry
        }
      }
    }
    console.warn(`[Forge] Все попытки для ${url} исчерпаны, пробуем следующий источник...`);
  }
  throw new Error(`Не удалось скачать ${label} ни из одного источника`);
}

// ── Основная функция ──────────────────────────────────────────────────────────

export async function installForge(
  gameVersion: string,
  loaderVersion: string,
  gamePath: string,
  javaPath: string,
  webContents: Electron.WebContents,
  isNeoForge = false
): Promise<string> {
  const prefix = isNeoForge ? 'NeoForge' : 'Forge';

  // --- ИСПРАВЛЕННЫЙ БЛОК: Очистка loaderVersion от дублей ---
  // Если пришло "1.20.1-47.4.10", оставляем только "47.4.10"
  const cleanLoader = loaderVersion.includes(`${gameVersion}-`) 
    ? loaderVersion.split(`${gameVersion}-`)[1] 
    : loaderVersion;

  // Формируем ID так, как его обычно создает официальный инсталлер
  const expectedId = isNeoForge
    ? `neoforge-${cleanLoader}`
    : `${gameVersion}-forge-${cleanLoader}`; 
  // Теперь вместо "1.20.1-forge-1.20.1-47.4.10" будет "1.20.1-forge-47.4.10"
  // --------------------------------------------------------

  const versionDir = path.join(gamePath, 'versions', expectedId);
  const jsonPath = path.join(versionDir, `${expectedId}.json`);

  // Если уже стоит — выходим сразу
  if (fs.existsSync(jsonPath)) {
    console.log(`[${prefix}] Уже установлен: ${expectedId}`);
    return expectedId;
  }

  // Создаем папку версии заранее
  if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true });
  }

  const { url: mavenUrl, name: installerName } = getInstallerInfo(gameVersion, loaderVersion, isNeoForge);
  const installerPath = path.join(gamePath, 'forge-installers', installerName);
  
  if (!fs.existsSync(path.join(gamePath, 'forge-installers'))) {
    fs.mkdirSync(path.join(gamePath, 'forge-installers'), { recursive: true });
  }

  if (!fs.existsSync(installerPath)) {
    const s3Url = `${S3_BASE}/${installerName}`;
    const urls = [s3Url, mavenUrl];

    webContents.send('launch-status', `Скачивание ${prefix} ${gameVersion}...`);
    await downloadWithRetry(urls, installerPath, webContents, `${prefix} ${gameVersion}`);
  }

  webContents.send('launch-status', `Установка ${prefix} ${gameVersion}...`);
  console.log(`[${prefix}] Запускаем installer...`);

  try {
    await runForgeInstaller(installerPath, javaPath, gamePath, webContents);
  } catch (err: any) {
    // Проверяем, может он все-таки поставился (инсталлеры часто кидают ошибки на ровном месте)
    const installedId = findInstalledId(gamePath, gameVersion, isNeoForge, loaderVersion);
    if (installedId) {
      return installedId;
    }
    
    if (fs.existsSync(installerPath)) {
      fs.unlinkSync(installerPath);
    }
    throw new Error(`${prefix} installer завершился с ошибкой: ${err.message}`);
  }

  // Финальная проверка после установки
  const installedId = findInstalledId(gamePath, gameVersion, isNeoForge, loaderVersion);
  if (!installedId) {
    throw new Error(`${prefix} установлен, но папка не найдена. Ожидался: ${expectedId}`);
  }

  return installedId;
}

// ── Запуск installer ──────────────────────────────────────────────────────────

function runForgeInstaller(
  installerPath: string,
  javaPath: string,
  gamePath: string,
  webContents: Electron.WebContents
): Promise<void> {
  return new Promise((resolve, reject) => {
    webContents.send('download-progress', {
      percent: 50,
      current: '1',
      total: '2',
      isChecking: true,
    });

    const proc = spawn(javaPath, [
      '-jar', installerPath,
      '--installClient', gamePath
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      // Увеличиваем таймаут — installer качает библиотеки сам
    });

    let lastLine = '';
    const timeout = setTimeout(() => {
      console.error('[Forge Installer] Таймаут 10 минут — принудительное завершение');
      proc.kill();
      reject(new Error('Forge installer завис (таймаут 10 минут)'));
    }, 10 * 60 * 1000);

    proc.stdout.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      if (line && line !== lastLine) {
        lastLine = line;
        console.log(`[Forge Installer] ${line}`);
        webContents.send('launch-status', `Установка: ${line.slice(0, 80)}`);
      }
    });

    proc.stderr.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      if (line) console.error(`[Forge Installer ERR] ${line}`);
    });

    proc.on('close', (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Forge installer завершился с кодом ${code}`));
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// ── Поиск установленной версии ────────────────────────────────────────────────

function findInstalledId(
  gamePath: string,
  gameVersion: string,
  isNeo: boolean,
  loaderVersion?: string
): string | null {
  const versionsDir = path.join(gamePath, 'versions');
  if (!fs.existsSync(versionsDir)) return null;

  const dirs = fs.readdirSync(versionsDir);

  if (isNeo && loaderVersion) {
    // Ищем точное совпадение по версии NeoForge
    const neoVer = extractNeoVer(gameVersion, loaderVersion);
    const exact = dirs.find(d => d === `neoforge-${neoVer}`);
    if (exact) return exact;
    // Fallback — любая neoforge папка для этой MC версии
    return dirs.find(d => d.toLowerCase().startsWith('neoforge-')) || null;
  }

  if (!isNeo) {
    // Forge: "1.20.1-forge-47.3.0"
    const exact = dirs.find(d =>
      d.startsWith(gameVersion) &&
      d.toLowerCase().includes('forge') &&
      loaderVersion && d.includes(loaderVersion)
    );
    if (exact) return exact;
    // Fallback
    return dirs.find(d => d.startsWith(gameVersion) && d.toLowerCase().includes('forge')) || null;
  }

  return null;
}