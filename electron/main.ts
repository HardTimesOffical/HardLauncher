import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { autoUpdater } from 'electron-updater'
import gracefulFs from 'graceful-fs'
import { IUser } from 'minecraft-launcher-core'

import { isVersionDownloaded } from './modules/path.manager'
import { getJavaVersionNeeded, ensureJava } from './modules/java.service'
import { createGameLauncher } from './modules/game.launcher'
import versionsData from '../public/versions-manifest.json'
import { ConfigManager } from './modules/config.manager'
import { syncServers } from './modules/server.manager';
import { ensureInjector } from './modules/server.manager'
import { AccountManager } from './modules/account.manager';

gracefulFs.gracefulify(fs)



//

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

let win: BrowserWindow | null = null

// ======================================================
// 1. АВТОРИЗАЦИЯ (Offline) - РЕШЕНИЕ ПРОБЛЕМ ТИПОВ
// ======================================================
// Изменяем аргументы: теперь принимаем данные из сохраненного аккаунта
function authMethod(nickname: string, uuid?: string, token?: string): IUser {
  return {
    access_token: token || "0",
    client_token: uuid || "0",
    uuid: uuid || "0",
    name: nickname,
    user_properties: {}, // Пустой объект вместо строки
    meta: {
      type: "mojang",
      demo: false
    }
  };
}

async function refreshElyToken(accessToken: string, clientToken: string): Promise<string | null> {
  try {
    const response = await fetch("https://authserver.ely.by/auth/refresh", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, clientToken, requestUser: false })
    });
    const data = await response.json();
    if (data?.accessToken) {
      console.log('[Ely] Токен успешно обновлён');
      return data.accessToken;
    }
    return null;
  } catch (err) {
    console.error('[Ely] Ошибка обновления токена:', err);
    return null;
  }
}

// IPC хендлер — вызывай при старте лаунчера
ipcMain.handle('refresh-accounts', async () => {
  const config = ConfigManager.load();
  const manager = new AccountManager(config.gamePath);
  const accounts = manager.getAll();

  for (const account of accounts) {
    if (account.provider === 'ely' && account.token && account.uuid) {
      const newToken = await refreshElyToken(account.token, account.uuid);
      if (newToken) {
        manager.save({ ...account, token: newToken });
      } else {
        // Токен невалиден — помечаем аккаунт как требующий повторного входа
        manager.save({ ...account, token: '' });
        console.log(`[Ely] Аккаунт ${account.nickname} требует повторного входа`);
      }
    }
  }

  return manager.getAll();
});
// ======================================================
// 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ======================================================
function extractMinecraftVersion(versionId: string): string {
  const match = versionId.match(/(\d+\.\d+\.?\d*)$/)
  return match ? match[0] : versionId
}

function formatUUID(uuid: string) {
  if (uuid.includes('-')) return uuid;
  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}


async function getFabricProfile(minecraftVersion: string, loaderVersion: string) {
    const url = `https://meta.fabricmc.net/v2/versions/loader/${minecraftVersion}/${loaderVersion}/profile/json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось получить профиль Fabric для ${minecraftVersion}`);
    return await response.json();
}

// ======================================================
// 2. ФУНКЦИЯ А: ЗАПУСК ВАНИЛЛЫ (Через API Mojang
async function launchVanilla(
  versionId: string, 
  nickname: string, 
  webContents: Electron.WebContents, 
  authServerUrl: string, 
  serverIp?: string,
  auth?: IUser
) {
  try {
    const config = ConfigManager.load();
    const mcVersion = extractMinecraftVersion(versionId);

    const javaPath = await ensureJava(
      getJavaVersionNeeded(mcVersion).toString(), 
      webContents, 
      config.gamePath
    );

    // 1. ПОДГОТОВКА JVM АРГУМЕНТОВ
    const jvmArgs: string[] = [];

    // СНАЧАЛА инжектор (должен быть первым!)
    if (authServerUrl) {
      const injectorPath = await ensureInjector(config.gamePath, webContents);
      jvmArgs.push(`-javaagent:${injectorPath}=${authServerUrl}`);
      console.log(`[Inject] Инжектор добавлен: ${injectorPath}=${authServerUrl}`);
    }

    jvmArgs.push(
      `-Dauthlibinjector.side=client`,
      `-Dminecraft.launcher.brand=HardLauncher`,
      `-Dminecraft.launcher.version=1.0.0`
    );

    // 2. ОБРАБОТКА IP
    let cleanIp = serverIp;
    if (cleanIp?.startsWith('{')) {
      try { cleanIp = JSON.parse(cleanIp).java; } catch { }
    }
    const host = cleanIp ? cleanIp.split(':')[0] : '';
    const port = cleanIp && cleanIp.includes(':') ? cleanIp.split(':')[1] : '25565';

    // 3. ВЕРСИЯ ДЛЯ ЛОГИКИ QUICKPLAY
    const versionParts = mcVersion.split('.').map(Number);
    const majorMinor = versionParts[0] * 100 + (versionParts[1] || 0);

    // 4. ФОРМИРОВАНИЕ ОПЦИЙ
    const opts: any = {
      authorization: auth || authMethod(nickname),
      root: config.gamePath,
      javaPath,
      version: { 
        number: mcVersion, 
        type: 'release' 
      },
      memory: { 
        min: "1G", 
        max: `${config.ram}G` 
      },
      customArgs: jvmArgs, // <-- массив, не строка!
      overrides: {
        assetIndex: mcVersion,
        ...(cleanIp ? { 
          launchArgs: ['--server', host, '--port', port] 
        } : {})
      }
    };

    // QuickPlay только для 1.20+
    if (cleanIp && majorMinor >= 120) {
      opts.quickPlay = {
        type: "multiplayer",
        identifier: cleanIp.includes(':') ? cleanIp : `${cleanIp}:25565`
      };
    }

    console.log(`[Launch] Запуск версии ${mcVersion}. Режим: ${authServerUrl ? 'Online (Ely)' : 'Offline'}. Сервер: ${cleanIp || 'не задан'}`);
    console.log(`[Launch] customArgs: ${opts.customArgs.join(' ')}`);

    const launcher = createGameLauncher(
      webContents, 
      !fs.existsSync(path.join(config.gamePath, 'versions', mcVersion))
    );
    await launcher.launch(opts);

  } catch (err: any) {
    console.error('[LaunchVanilla Error]', err);
    throw err;
  }
}

// ======================================================
// 3. ФУНКЦИЯ Б: ЗАПУСК КАСТОМА (Только локально)
// ======================================================

async function launchCustom(
  versionObj: any, 
  nickname: string, 
  webContents: Electron.WebContents,
  authServerUrl: string,
  auth?: IUser // Пятый аргумент: переданный объект авторизации
) {
  const { id, gameVersion, loaderVersion } = versionObj;
  const config = ConfigManager.load();
  
  // 1. Подготовка папок
  const versionDir = path.join(config.gamePath, 'versions', id);
  if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir, { recursive: true });

  // 2. Подготовка профиля (JSON)
  const jsonPath = path.join(versionDir, `${id}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`[Launcher] Профиль версии ${id} не найден, скачиваем...`);
    const fabricJson = await getFabricProfile(gameVersion, loaderVersion);
    fabricJson.id = id;
    fs.writeFileSync(jsonPath, JSON.stringify(fabricJson, null, 2));
  }

  // 3. Подготовка Java
  const javaPath = await ensureJava(
    getJavaVersionNeeded(gameVersion).toString(), 
    webContents, 
    config.gamePath
  );

  // 4. Формируем аргументы JVM
  const extraArgs = [
    `-Dauthlibinjector.side=client`,
    `-Dminecraft.launcher.brand=HardLauncher`,
    `--versionType`, `release` // Некоторые версии требуют это как аргумент JVM
  ];

  // Добавляем инжектор только если есть сервер скинов
  if (authServerUrl) {
    const injectorPath = await ensureInjector(config.gamePath, webContents);
    extraArgs.unshift(`-javaagent:${injectorPath}=${authServerUrl}`);
    console.log(`[Auth] Инжектор подключен: ${authServerUrl}`);
  }

  // 5. Опции запуска для MCLC
  const opts: any = {
    // Если auth не передан (оффлайн), используем стандартный authMethod
    authorization: auth || authMethod(nickname),
    root: config.gamePath,
    javaPath,
    version: {
      number: gameVersion,
      custom: id, // Важно для Fabric/Forge
      type: 'release' 
    },
    memory: { 
      min: "1G", 
      max: `${config.ram}G` 
    },
    overrides: {
      detached: true,
      extraArgs: extraArgs // Используем наш подготовленный массив
    },
    skipAsync: true // Для кастомных версий часто требуется
  };

  // 6. Синхронизация серверов перед запуском
  await syncServers(config.gamePath);

  // 7. Проверка основного JAR и запуск
  const jarPath = path.join(versionDir, `${id}.jar`);
  const isReady = fs.existsSync(jarPath);
  
  console.log(`[Launcher] Запуск кастомной версии: ${id} (${gameVersion})`);
  
  const launcher = createGameLauncher(webContents, !isReady);
  await launcher.launch(opts);
}

// ======================================================
// 4. ГЛАВНЫЙ IPC ВХОД
// ======================================================

// Добавь authProvider в деструктуризацию аргументов
ipcMain.on('launch-game', async (event, { version, nickname }) => {
  const webContents = event.sender;
  const config = ConfigManager.load();
  
  // 1. Инициализируем менеджер аккаунтов, чтобы найти UUID и токен
  const accountManager = new AccountManager(config.gamePath);
  const account = accountManager.getAll().find(a => a.nickname === nickname);

  let authServerUrl = '';
  let userAuth: IUser;

  // 2. ОПРЕДЕЛЯЕМ РЕЖИМ ВХОДА
  // Если аккаунт найден и это не "пустышка" без токена
  if (account && account.uuid && account.token && account.token !== "0") {
    
    // ПРОВЕРЯЕМ ПРОВАЙДЕРА ДЛЯ СИСТЕМЫ СКИНОВ
    if (account.provider === 'ely') {
       authServerUrl = 'ely.by';
    } else if (account.provider === 'internal') {
      // Твой будущий бэкенд (Hard Times)
      authServerUrl = 'http://localhost:5000/user'; 
    }

    const formattedUUID = formatUUID(account.uuid);

    // Формируем объект авторизации с реальными данными для скинов
    userAuth = {
        access_token: account.token,
        client_token: formattedUUID, // Используем с дефисами
        uuid: formattedUUID,        // Используем с дефисами
        name: nickname,
        user_properties: {},
       meta: { 
          type: "mojang", // Всегда "mojang" для Ely.by
          demo: false 
        }
      };
    console.log(`[Launch] Авторизованный вход (${account.provider}). Инжектор: ${authServerUrl}`);
    } else {
    // OFFLINE РЕЖИМ (Просто вход по нику)
    authServerUrl = ''; 
    userAuth = authMethod(nickname); // Твоя функция генерации UUID через MD5
    
    console.log(`[Launch] Offline вход для игрока ${nickname}. Система скинов отключена.`);
  }

  try {
    // 3. Ищем версию в манифесте
    const versionObj = (versionsData.versions as any[]).find(v => v.id === version);
    if (!versionObj) throw new Error(`Версия ${version} не найдена!`);

    const mcVersion = versionObj.gameVersion || versionObj.id;

    // 4. ЗАПУСК
    if (versionObj.type === 'custom') {
      // Передаем сформированный userAuth и URL инжектора
      await launchCustom(versionObj, nickname, webContents, authServerUrl, userAuth);
    } 
    else {
      // Для ваниллы передаем также IP сервера для быстрого захода
      await launchVanilla(mcVersion, nickname, webContents, authServerUrl, config.lastServerIp, userAuth);
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
  const config = ConfigManager.load();
  const filters = config.versionFilters || { showRelease: true, showFabric: true, showOld: false };

  return (versionsData.versions as any[])
    .filter(v => {
      const versionId = v.id.toLowerCase();
      const gameVersion = v.gameVersion || v.id;

      // 1. Проверка на старые версии (ниже 1.13)
      const majorVersion = parseInt(gameVersion.split('.')[1]); 
      const isOld = gameVersion.startsWith('1.') && majorVersion < 13;
      if (isOld && !filters.showOld) return false;

      // 2. Проверка на Fabric (по типу или ID)
      const isFabric = v.type === 'custom' || versionId.includes('fabric');
      if (isFabric && !filters.showFabric) return false;

      // 3. Проверка на чистые релизы (если это не старая версия)
      if (v.type === 'release' && !isOld && !filters.showRelease) return false;

      return true;
    })
    .map(v => ({
      ...v,
      displayName: v.name || v.id,
      isDownloaded: isVersionDownloaded(v.id, config.gamePath)
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

ipcMain.on('open-external-link', (_event, url: string) => {
  const allowed = ['https://ely.by', 'https://hardmonitoring.ru'];
  if (allowed.some(domain => url.startsWith(domain))) {
    shell.openExternal(url);
  }
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

ipcMain.handle('ely-auth', async ( email, password ) => {
  try {
    // Используем глобальный fetch (доступен в Node.js 18+)
    const response = await fetch("https://authserver.ely.by/auth/authenticate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
        requestUser: true,
        agent: {
            name: "Minecraft",
            version: 1
        }
      })
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Ely Auth Error:", error);
    return { error: true, errorMessage: error.message };
  }
});

ipcMain.handle('hardtimes-auth', async (_, { email, password, username, isRegister }) => {
  try {
    const url = isRegister 
      ? 'http://localhost:5000/auth/register'
      : 'http://localhost:5000/auth/login';

    const body = isRegister 
      ? { email, password, username } // При регистрации передаём username отдельно
      : { email, password };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('[HardTimes Auth Response]', JSON.stringify(data)); // ЛОГ
    return data;
  } catch (error: any) {
    console.error('[HardTimes Auth Error]', error.message);
    return { error: true, message: error.message };
  }
});


ipcMain.handle('get-accounts', async () => {
  const config = ConfigManager.load();
  const manager = new AccountManager(config.gamePath);
  return manager.getAll();
});
// В main.ts или там, где лежит ipcMain.handle('login-and-save')
ipcMain.handle('login-and-save', async (_, accountData) => {
  const config = ConfigManager.load();
  const manager = new AccountManager(config.gamePath);

  // Определяем сервер сразу, чтобы потом не гадать
  const authServer = accountData.provider === 'ely' 
    ? 'https://authserver.ely.by' 
    : 'http://localhost:5000/user';

  try {
    manager.save({
      nickname: accountData.nickname,
      token: accountData.token,
      uuid: accountData.uuid,
      provider: accountData.provider, // Передаем провайдера
      authServer: authServer          // И URL сервера
    });
    return { success: true };
  } catch (err) {
  const errorMessage = err instanceof Error ? err.message : String(err);
  return { success: false, error: errorMessage };
}
});

ipcMain.handle('remove-account', async (_event, nickname: string) => {
  const config = ConfigManager.load();
  const manager = new AccountManager(config.gamePath);
  const accounts = manager.getAll().filter(a => a.nickname !== nickname);
  
  fs.writeFileSync(
    path.join(config.gamePath, 'accounts.json'), 
    JSON.stringify(accounts, null, 2)
  );
  
  return accounts;
});

// Настройка поведения авто-апдейтера
autoUpdater.autoDownload = false; // Не качать без спроса
autoUpdater.autoInstallOnAppQuit = true;
event
// 1. Когда найдено обновление
autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Доступно обновление',
    message: `Найдена новая версия: ${info.version}. Хотите обновить лаунчер?`,
    buttons: ['Обновить', 'Позже'],
    defaultId: 0,
    cancelId: 1
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate(); // Начинаем загрузку
    }
  });
});

// 2. Когда обновление успешно скачано
autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'question',
    title: 'Обновление готово',
    message: 'Новая версия скачана. Перезапустить лаунчер для установки?',
    buttons: ['Перезапустить сейчас', 'Позже'],
    defaultId: 0,
    cancelId: 1
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall(); // Закрывает приложение и ставит обнову
    }
  });
});

// 3. Логирование ошибок (поможет при отладке)
autoUpdater.on('error', (err) => {
  console.error('Ошибка авто-обновления:', err);
});


app.whenReady().then(() => {
  setupSettingsHandlers(); 
  createWindow();
  if (!VITE_DEV_SERVER_URL) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
