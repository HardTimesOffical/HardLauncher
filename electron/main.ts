import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { autoUpdater } from 'electron-updater'
import gracefulFs from 'graceful-fs'
import { IUser } from 'minecraft-launcher-core'

// --- НАШИ МОДУЛИ ---
import { isVersionDownloaded, ensureRootDir } from './modules/path.manager'
import { getJavaVersionNeeded, ensureJava } from './modules/java.service'
import { createGameLauncher } from './modules/game.launcher'
import versionsData from '../public/versions-manifest.json'
import { ConfigManager } from './modules/config.manager'

gracefulFs.gracefulify(fs)



// --- ИНТЕРФЕЙСЫ ---
interface GameVersion {
  id: string
  name?: string
  type: 'release' | 'snapshot' | 'custom'
  url?: string
}

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

let win: BrowserWindow | null = null

// ======================================================
// 1. АВТОРИЗАЦИЯ (Offline) - РЕШЕНИЕ ПРОБЛЕМ ТИПОВ
// ======================================================
function authMethod(nickname: string): IUser {
  const crypto = require('crypto')
  const hash = crypto.createHash('md5').update(nickname).digest("hex")
  const uuid = [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32)
  ].join('-')

  // Возвращаем объект, который ТОЧНО соответствует интерфейсу IUser из MCLC
  return {
    access_token: "0",
    client_token: uuid,
    uuid: uuid,
    name: nickname,
    user_properties: {}, // Пустой Partial<any> объект вместо строки
    meta: {
      type: "mojang", // Обязательное литеральное поле
      demo: false
    }
  }
}

// ======================================================
// 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ======================================================
function extractMinecraftVersion(versionId: string): string {
  const match = versionId.match(/(\d+\.\d+\.?\d*)$/)
  return match ? match[0] : versionId
}


async function getFabricProfile(minecraftVersion: string, loaderVersion: string) {
    const url = `https://meta.fabricmc.net/v2/versions/loader/${minecraftVersion}/${loaderVersion}/profile/json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось получить профиль Fabric для ${minecraftVersion}`);
    return await response.json();
}

// ======================================================
// 2. ФУНКЦИЯ А: ЗАПУСК ВАНИЛЛЫ (Через API Mojang)
// ======================================================

async function launchVanilla(
  versionId: string, 
  nickname: string, 
  webContents: Electron.WebContents, 
  serverIp?: string
) {
  // 1. Сначала загружаем конфиг, чтобы знать актуальные пути и RAM
  const config = ConfigManager.load();
  const mcVersion = extractMinecraftVersion(versionId);

  // 2. Передаем config.gamePath третьим аргументом (исправляет ошибку TS)
  const javaPath = await ensureJava(
    getJavaVersionNeeded(mcVersion).toString(), 
    webContents, 
    config.gamePath
  );

  // Чистим IP (на случай если прилетел JSON)
  let cleanIp = serverIp;
  if (cleanIp?.startsWith('{')) {
      try { cleanIp = JSON.parse(cleanIp).java; } catch { }
  }

  const host = cleanIp ? cleanIp.split(':')[0] : '';
  const port = cleanIp && cleanIp.includes(':') ? cleanIp.split(':')[1] : '25565';

  const opts: any = {
    authorization: authMethod(nickname),
    root: config.gamePath, // Используем динамический путь
    javaPath,
    version: { number: mcVersion, type: 'release' },
    memory: { min: "1G", max: `${config.ram}G` },
    
    // МЕТОД 1: Стандартный
    quickPlay: cleanIp ? {
      type: "multiplayer",
      identifier: cleanIp.includes(':') ? cleanIp : `${cleanIp}:25565`
    } : undefined,

    // МЕТОД 2: Прямая вставка в аргументы
    args: cleanIp ? [
      '--server', host,
      '--port', port
    ] : []
  };

  // На всякий случай дублируем в overrides
  opts.overrides = {
      assetIndex: mcVersion,
      customArgs: opts.args 
  };

  // Проверяем наличие JAR в правильной папке
  const versionDir = path.join(config.gamePath, 'versions', mcVersion);
  const jarPath = path.join(versionDir, `${mcVersion}.jar`);
  const isReady = fs.existsSync(jarPath);

  const launcher = createGameLauncher(webContents, !isReady);
  await launcher.launch(opts);
}
// ======================================================
// 3. ФУНКЦИЯ Б: ЗАПУСК КАСТОМА (Только локально)
// ======================================================
async function launchCustom(versionObj: any, nickname: string, webContents: Electron.WebContents) {
  const { id, gameVersion, loaderVersion } = versionObj;
  
  // 1. Сначала загружаем конфиг, чтобы знать актуальный путь
  const config = ConfigManager.load();
  
  // 2. Используем config.gamePath вместо ROOT_DIR
  const versionDir = path.join(config.gamePath, 'versions', id);
  const jsonPath = path.join(versionDir, `${id}.json`);

  // Проверяем/скачиваем профиль Fabric
  if (!fs.existsSync(jsonPath)) {
    console.log(`[Launcher] Профиль не найден, скачиваем...`);
    const fabricJson = await getFabricProfile(gameVersion, loaderVersion);
    fabricJson.id = id;
    
    if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir, { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(fabricJson, null, 2));
  }

  // 3. Передаем config.gamePath третьим аргументом в ensureJava
  const javaPath = await ensureJava(
    getJavaVersionNeeded(gameVersion).toString(), 
    webContents, 
    config.gamePath
  );

  // 4. Формируем опции запуска
  const opts: any = {
    authorization: authMethod(nickname),
    root: config.gamePath, // Путь установки игры
    javaPath,
    version: {
      number: gameVersion,
      custom: id,
      type: 'release' 
    },
    overrides: {
      detached: true,
      extraArgs: ['--versionType', 'release']
    },
    skipAsync: true,
    memory: { 
      min: "1G", 
      max: `${config.ram}G` 
    }
  };

  // Проверка JAR и запуск
  const jarPath = path.join(versionDir, `${id}.jar`);
  const isReady = fs.existsSync(jarPath);
  
  console.log(`[Launcher] ${isReady ? 'Быстрый запуск' : 'Первый запуск с проверкой'}`);
  
  const launcher = createGameLauncher(webContents, !isReady);
  await launcher.launch(opts);
}

// ======================================================
// 4. ГЛАВНЫЙ IPC ВХОД
// ======================================================

ipcMain.on('launch-game', async (event, { version, nickname }) => {
  const webContents = event.sender;

  // 1. Сначала загружаем актуальный конфиг
  const config = ConfigManager.load();
  
  // 2. Передаем путь к игре в ensureRootDir (исправляет ошибку TS)
  ensureRootDir(config.gamePath);

  try {
    // Ищем объект версии
    const versionObj = (versionsData.versions as any[]).find(v => v.id === version);

    if (!versionObj) {
      throw new Error(`Версия ${version} не найдена в манифесте!`);
    }

    // Если тип custom — запускаем новую логику
    if (versionObj.type === 'custom') {
      await launchCustom(versionObj, nickname, webContents);
    } 
    // Если тип release или другой — запускаем ванилу
    else {
      const mcVersion = versionObj.gameVersion || versionObj.id;
      await launchVanilla(mcVersion, nickname, webContents);
    }

  } catch (err: any) {
    console.error('[Launch Error]', err);
    webContents.send('launch-error', err.message);
    webContents.send('game-closed');
  }
});
// ======================================================
// 5. WINDOW & APP
// ======================================================
function createWindow() {
  win = new BrowserWindow({
    width: 1000, 
    height: 650, 
    frame: false, 
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true, 
      nodeIntegration: false
    }
  });

  if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
  else win.loadFile(path.join(RENDERER_DIST, 'index.html'));
}

// Стандартные IPC
ipcMain.handle('get-versions', async () => {
  // 1. Получаем АКТУАЛЬНЫЙ путь из конфига прямо сейчас
  const config = ConfigManager.load();
  const currentGamePath = config.gamePath;

  // 2. Проверяем наличие версий именно по этому пути
  return (versionsData.versions as GameVersion[]).map(v => ({
    ...v,
    displayName: v.name || v.id,
    isDownloaded: isVersionDownloaded(v.id, currentGamePath)
  }));
});


ipcMain.on('window-control', (_, action: 'minimize' | 'close') => {
  if (action === 'minimize') win?.minimize()
  if (action === 'close') app.quit()
})

ipcMain.on('open-game-folder', () => {
  // Всегда берем путь из конфига, который актуален в этот момент
  const currentConfig = ConfigManager.load();
  
  if (!fs.existsSync(currentConfig.gamePath)) {
    fs.mkdirSync(currentConfig.gamePath, { recursive: true });
  }
  
  shell.openPath(currentConfig.gamePath);
});

// ======================================================
// 6. НАСТРОЙКИ (Сохранение в JSON и выбор папки через диалог Windows)
// ======================================================


export function setupSettingsHandlers() {
  // 1. Получение текущих настроек
  ipcMain.handle('get-settings', async () => {
    return ConfigManager.load();
  });

  // 2. Сохранение настроек
  ipcMain.handle('save-settings', async (_, newConfig) => {
    try {
      ConfigManager.save(newConfig);
      return { success: true };
    } catch (err) {
      console.error('Save error:', err);
      return { success: false };
    }
  });

  // 3. Выбор папки (улучшенная версия)
  ipcMain.handle('select-directory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      title: 'Выберите папку для установки игры',
      buttonLabel: 'Выбрать папку',
    });
    return canceled ? null : filePaths[0];
  });

  // 4. Получение ДЕФОЛТНЫХ настроек (динамически для каждого юзера)
ipcMain.handle('get-default-settings', async () => {
    const defaults = {
        ram: 4,
        gamePath: path.join(app.getPath('appData'), '.hard-monitoring')
    };
    ConfigManager.save(defaults);
    return defaults;
  });
} // <---

app.whenReady().then(() => {
  // 1. Сначала регистрируем обработчики настроек
  setupSettingsHandlers(); 
  
  // 2. Только потом создаем окно
  createWindow();
  autoUpdater.checkForUpdatesAndNotify()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
