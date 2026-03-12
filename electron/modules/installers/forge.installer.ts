import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const FORGE_MAVEN = 'https://maven.minecraftforge.net/net/minecraftforge/forge';
const NEOFORGE_MAVEN = 'https://maven.neoforged.net/releases/net/neoforged/neoforge';

function getForgeInstallerInfo(gameVersion: string, loaderVersion: string): { url: string; name: string } {
  const parts = gameVersion.split('.');
  const minor = parseInt(parts[1]);
  const patch = parseInt(parts[2] || '0');

  const isLegacy = minor < 12 || (minor === 12 && patch < 2);

  if (isLegacy) {
    const name = `forge-${gameVersion}-${loaderVersion}-${gameVersion}-installer.jar`;
    const url = `${FORGE_MAVEN}/${gameVersion}-${loaderVersion}-${gameVersion}/${name}`;
    return { url, name };
  }

  const name = `forge-${gameVersion}-${loaderVersion}-installer.jar`;
  const url = `${FORGE_MAVEN}/${gameVersion}-${loaderVersion}/${name}`;
  return { url, name };
}

function getInstallerInfo(gameVersion: string, loaderVersion: string, isNeo: boolean): { url: string; name: string } {
  if (isNeo) {
    // loaderVersion может быть "1.21.1-21.1.215" или просто "21.1.215"
    let neoVer = loaderVersion;
    if (loaderVersion.includes(`${gameVersion}-`)) {
      neoVer = loaderVersion.split(`${gameVersion}-`)[1];
    } else if (loaderVersion.includes('-')) {
      neoVer = loaderVersion.split('-').slice(1).join('-');
    }
    const name = `neoforge-${neoVer}-installer.jar`;
    const url = `${NEOFORGE_MAVEN}/${neoVer}/${name}`;
    return { url, name };
  }
  return getForgeInstallerInfo(gameVersion, loaderVersion);
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

export async function installForge(
  gameVersion: string,
  loaderVersion: string,
  gamePath: string,
  javaPath: string,
  webContents: Electron.WebContents,
  isNeoForge = false
): Promise<string> {
  const prefix = isNeoForge ? 'neoforge' : 'forge';

  // NeoForge installer создаёт папку "neoforge-21.1.215"
  // Forge installer создаёт папку "1.21.1-forge-52.0.47"
  const expectedId = isNeoForge
    ? `neoforge-${extractNeoVer(gameVersion, loaderVersion)}`
    : `${gameVersion}-forge-${loaderVersion}`;

  const versionDir = path.join(gamePath, 'versions', expectedId);
  const jsonPath = path.join(versionDir, `${expectedId}.json`);

  if (fs.existsSync(jsonPath)) {
    console.log(`[${prefix}] Уже установлен: ${expectedId}`);
    return expectedId;
  }

  fs.mkdirSync(versionDir, { recursive: true });

  const { url: installerUrl, name: installerName } = getInstallerInfo(gameVersion, loaderVersion, isNeoForge);
  const installerPath = path.join(gamePath, 'forge-installers', installerName);

  fs.mkdirSync(path.join(gamePath, 'forge-installers'), { recursive: true });

  if (!fs.existsSync(installerPath)) {
    webContents.send('launch-status', `Скачивание ${prefix} ${gameVersion}...`);
    console.log(`[${prefix}] Скачиваем installer: ${installerUrl}`);
    await downloadFile(installerUrl, installerPath, webContents);
  }

  webContents.send('launch-status', `Установка ${prefix} ${gameVersion}...`);
  await runForgeInstaller(installerPath, javaPath, gamePath, webContents);

  const installedId = findInstalledId(gamePath, gameVersion, isNeoForge);
  if (!installedId) {
    throw new Error(`${prefix} установлен но папка версии не найдена для ${gameVersion}`);
  }

  console.log(`[${prefix}] Успешно установлен: ${installedId}`);
  return installedId;
}

async function downloadFile(
  url: string,
  dest: string,
  webContents: Electron.WebContents
): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status} ${url}`);
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
        webContents.send('launch-status', `Установка: ${line.slice(0, 60)}`);
      }
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`[Forge Installer ERR] ${data.toString().trim()}`);
    });

    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Installer завершился с кодом ${code}`));
    });

    proc.on('error', reject);
  });
}

function findInstalledId(gamePath: string, gameVersion: string, isNeo: boolean): string | null {
  const versionsDir = path.join(gamePath, 'versions');
  if (!fs.existsSync(versionsDir)) return null;

  const dirs = fs.readdirSync(versionsDir);

  if (isNeo) {
    // NeoForge создаёт "neoforge-21.1.215"
    return dirs.find(d => d.toLowerCase().startsWith('neoforge-')) || null;
  }

  // Forge создаёт "1.21.1-forge-52.0.47"
  const parts = gameVersion.split('.');
  return dirs.find(d => d.startsWith(gameVersion) && d.toLowerCase().includes('forge')) || null;
}