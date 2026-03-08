import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const FORGE_MAVEN = 'https://maven.minecraftforge.net/net/minecraftforge/forge';

function getForgeInstallerInfo(gameVersion: string, loaderVersion: string): { url: string; name: string } {
  const parts = gameVersion.split('.');
  const minor = parseInt(parts[1]);
  const patch = parseInt(parts[2] || '0');

  // 1.7.x - 1.11.x и 1.12.0, 1.12.1 — legacy формат с суффиксом версии игры
  const isLegacy = minor < 12 || (minor === 12 && patch < 2);

  if (isLegacy) {
    const name = `forge-${gameVersion}-${loaderVersion}-${gameVersion}-installer.jar`;
    const url = `${FORGE_MAVEN}/${gameVersion}-${loaderVersion}-${gameVersion}/${name}`;
    return { url, name };
  }

  // 1.12.2+ — стандартный формат
  const name = `forge-${gameVersion}-${loaderVersion}-installer.jar`;
  const url = `${FORGE_MAVEN}/${gameVersion}-${loaderVersion}/${name}`;
  return { url, name };
}

export async function installForge(
  gameVersion: string,
  loaderVersion: string,
  gamePath: string,
  javaPath: string,
  webContents: Electron.WebContents
): Promise<string> {
  const forgeId = `${gameVersion}-forge-${loaderVersion}`;
  const versionDir = path.join(gamePath, 'versions', forgeId);
  const jsonPath = path.join(versionDir, `${forgeId}.json`);

  // Уже установлен
  if (fs.existsSync(jsonPath)) {
    console.log(`[Forge] Уже установлен: ${forgeId}`);
    return forgeId;
  }

  fs.mkdirSync(versionDir, { recursive: true });

  const { url: installerUrl, name: installerName } = getForgeInstallerInfo(gameVersion, loaderVersion);
  const installerPath = path.join(gamePath, 'forge-installers', installerName);

  fs.mkdirSync(path.join(gamePath, 'forge-installers'), { recursive: true });

  if (!fs.existsSync(installerPath)) {
    webContents.send('launch-status', `Скачивание Forge ${gameVersion}...`);
    console.log(`[Forge] Скачиваем installer: ${installerUrl}`);
    await downloadFile(installerUrl, installerPath, webContents);
  }

  // Запускаем installer
  webContents.send('launch-status', `Установка Forge ${gameVersion}...`);
  await runForgeInstaller(installerPath, javaPath, gamePath, webContents);

  // Ищем созданную папку версии
  const forgeVersionId = findInstalledForgeId(gamePath, gameVersion);
  if (!forgeVersionId) {
    throw new Error(`Forge установлен но папка версии не найдена для ${gameVersion}`);
  }

  console.log(`[Forge] Успешно установлен: ${forgeVersionId}`);
  return forgeVersionId;
}

async function downloadFile(
  url: string,
  dest: string,
  webContents: Electron.WebContents
): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки Forge: ${response.status} ${url}`);
  }

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
      });
    }
  }

  await new Promise<void>((resolve, reject) => {
    writer.end();
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

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
    ], { stdio: ['ignore', 'pipe', 'pipe'] });

    proc.stdout.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      if (line) {
        console.log(`[Forge Installer] ${line}`);
        webContents.send('launch-status', `Forge: ${line.slice(0, 60)}`);
      }
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`[Forge Installer ERR] ${data.toString().trim()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Forge installer завершился с кодом ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

function findInstalledForgeId(gamePath: string, gameVersion: string): string | null {
  const versionsDir = path.join(gamePath, 'versions');
  if (!fs.existsSync(versionsDir)) return null;

  const dirs = fs.readdirSync(versionsDir);
  const forgeDir = dirs.find(d =>
    d.startsWith(gameVersion) && d.toLowerCase().includes('forge')
  );
  return forgeDir || null;
}
