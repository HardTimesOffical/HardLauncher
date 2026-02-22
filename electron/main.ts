import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import https from 'node:https' // Используем встроенный модуль для скачивания
import decompress from 'decompress'
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { FabricService } from './modules/fabric.sevices';
import { autoUpdater } from 'electron-updater';

const execAsync = promisify(exec); // Теперь это сработает
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 1. Инициализация MCLC
const MCLC = require('minecraft-launcher-core');
const LauncherClient = MCLC.Client; 
const ROOT_DIR = path.join(app.getPath('appData'), '.hard-monitoring');


const FORGE_MAP: Record<string, string> = {
  // --- СОВРЕМЕННЫЕ ВЕРСИИ (Java 17/21) ---
  "1.21.4": "54.0.1",
  "1.21.3": "53.0.1",
  "1.21.1": "52.0.0",
  "1.21":   "51.0.8",
  "1.20.6": "50.1.0",
  "1.20.4": "49.0.31",
  "1.20.2": "48.1.0",
  "1.20.1": "47.3.0",
  "1.19.4": "45.3.0",
  "1.19.3": "44.1.0",
  "1.19.2": "43.4.0",
  "1.19.1": "42.0.1",
  "1.19":   "41.1.0",
  "1.18.2": "40.2.21",
  "1.18.1": "39.1.2",
  "1.17.1": "37.1.1",

  // --- КЛАССИЧЕСКИЕ ВЕРСИИ (Java 8/16) ---
  "1.16.5": "36.2.39",
  "1.16.4": "35.1.37",
  "1.16.3": "34.1.42",
  "1.16.1": "32.0.108",
  "1.15.2": "31.2.57",
  "1.14.4": "28.2.26",
  "1.13.2": "25.0.223",

  // --- СТАРЫЕ ВЕРСИИ (Другой формат ссылок) ---
  "1.12.2": "14.23.5.2860",
  "1.12.1": "14.22.1.2478",
  "1.12":   "14.21.1.2387",
  "1.11.2": "13.20.1.2386",
  "1.10.2": "12.18.3.2511",
  "1.9.4":  "12.17.0.1976",
  "1.8.9":  "11.15.1.2318",
  "1.7.10": "10.13.4.1614"
};

// 2. Метод авторизации
function authMethod(nickname: string) {
  // Генерируем стабильный UUID на основе ника, чтобы сохранялся инвентарь в синглплеере
  const crypto = require('crypto');
  
  // Создаем хэш ника и формируем из него подобие UUID (формат 8-4-4-4-12)
  const hash = crypto.createHash('md5').update(nickname).digest("hex");
  const uuid = [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32)
  ].join('-');

  return {
    access_token: "null", // Для оффлайн режима можно любое значение
    client_token: uuid,
    uuid: uuid,
    name: nickname,
    user_properties: "{}"
  };
}

// --- Вспомогательная функция скачивания Java ---
function downloadFile(url: string, dest: string, webContents: Electron.WebContents): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    const request = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      // Обработка редиректов (важно для Forge Maven)
      if ([301, 302, 307, 308].includes(response.statusCode || 0)) {
        file.close();
        return downloadFile(response.headers.location!, dest, webContents).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        return reject(new Error(`Server responded with ${response.statusCode}`));
      }

      const total = parseInt(response.headers['content-length'] || '0', 10);
      let downloaded = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total > 0) {
          const percent = Math.round((downloaded / total) * 100);
          webContents.send('download-progress', {
            percent,
            current: (downloaded / (1024 * 1024)).toFixed(1),
            total: (total / (1024 * 1024)).toFixed(1)
          });
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          // Проверка: не пустой ли файл мы скачали?
          const stats = fs.statSync(dest);
          if (stats.size === 0) {
            reject(new Error("Downloaded file is empty"));
          } else {
            resolve();
          }
        });
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function ensureJava(version: string, webContents: Electron.WebContents) {
  const javaFolder = path.join(ROOT_DIR, 'runtime', `java-${version}`);
  const javaExeName = process.platform === 'win32' ? 'java.exe' : 'java';

  // 1. Поиск существующей Java
  const findJavaDeep = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    const getAllFiles = (currentPath: string, fileList: string[] = []): string[] => {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const name = path.join(currentPath, file);
        if (fs.statSync(name).isDirectory()) {
          getAllFiles(name, fileList);
        } else {
          fileList.push(name);
        }
      });
      return fileList;
    };
    const allFiles = getAllFiles(dir);
    return allFiles.find(f => f.toLowerCase().endsWith(path.join('bin', javaExeName).toLowerCase())) || null;
  };

  let existingPath = findJavaDeep(javaFolder);
  if (existingPath) return existingPath;

  // 2. Ссылки на скачивание (Добавлена Java 8)
  let downloadUrl = "";
  if (version === '21') {
    downloadUrl = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.zip";
  } else if (version === '17') {
    downloadUrl = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.zip";
  } else {
    // Для 1.12.2 и ниже
    downloadUrl = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u402-b06/OpenJDK8U-jdk_x64_windows_hotspot_8u402b06.zip";
  }

  const zipPath = path.join(ROOT_DIR, `temp_java_${version}.zip`);
  if (!fs.existsSync(ROOT_DIR)) fs.mkdirSync(ROOT_DIR, { recursive: true });

  webContents.send('launch-status', `Downloading Java ${version}...`);
  await downloadFile(downloadUrl, zipPath, webContents);
  
  webContents.send('launch-status', `Extracting Java...`);
  if (fs.existsSync(javaFolder)) fs.rmSync(javaFolder, { recursive: true, force: true });
  fs.mkdirSync(javaFolder, { recursive: true });

  try {
    await execAsync(`tar -xf "${zipPath}" -C "${javaFolder}"`);
  } catch (err) {
    await decompress(zipPath, javaFolder);
  }

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  return findJavaDeep(javaFolder) || "";
}
// 3. Настройки Vite
process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1000, height: 650, frame: false, transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true, nodeIntegration: false,
    },
  })
  VITE_DEV_SERVER_URL ? win.loadURL(VITE_DEV_SERVER_URL) : win.loadFile(path.join(RENDERER_DIST, 'index.html'))
}

ipcMain.on('window-control', (_, action) => {
  const focusedWin = BrowserWindow.getFocusedWindow()
  if (action === 'minimize') focusedWin?.minimize()
  if (action === 'close') app.quit()
})

ipcMain.on('launch-game', async (event, { version, nickname }) => {
  const webContents = event.sender;
  const launcher = new LauncherClient();
  
  webContents.send('download-progress', { percent: 0, current: "0", total: "0", isChecking: true });
  webContents.send('launch-status', 'Preparing launch...');

  try {
    if (!fs.existsSync(ROOT_DIR)) fs.mkdirSync(ROOT_DIR, { recursive: true });

    // --- 1. ОПРЕДЕЛЕНИЕ ВЕРСИИ И ВЫБОР JAVA ---
    // Это должно быть ПЕРВЫМ, чтобы javaPath была доступна везде
    const gameVersionMatch = version.match(/(\d+\.\d+)/);
    const baseGameVersion = gameVersionMatch ? gameVersionMatch[0] : "1.21";
    
    let neededJava = '8';
    const vNum = parseFloat(baseGameVersion);
    
    if (vNum >= 1.21) {
      neededJava = '21';
    } else if (vNum >= 1.17) {
      neededJava = '17';
    } else {
      neededJava = '8';
    }
    
    console.log(`[DEBUG] Game: ${baseGameVersion}, Java: ${neededJava}`);
    const javaPath = await ensureJava(neededJava, webContents);

    // --- 2. ПОДГОТОВКА МОДИФИЦИРОВАННЫХ ВЕРСИЙ ---
    let launchVersion = version;
    const isFabric = version.toLowerCase().includes('fabric');
    const isForge = version.toLowerCase().includes('forge');

    // Настройка Fabric
    if (isFabric) {
      const fullGameVersion = version.match(/(\d+\.\d+\.?\d*)/)?.[0] || "1.21.1";
      webContents.send('launch-status', `Setting up Fabric for ${fullGameVersion}...`);
      launchVersion = await FabricService.setup(fullGameVersion, "0.16.10", ROOT_DIR, webContents);
    }

    // Настройка Forge
    // Настройка Forge
    if (isForge) {
      // 1. Извлекаем полную версию (например, "1.21.4")
      const fullGameVersion = version.match(/(\d+\.\d+\.?\d*)/)?.[0] || "1.21.1";
      
      // 2. Ищем версию в маппинге
      let forgeVersion = FORGE_MAP[fullGameVersion];

      // 3. Если точного совпадения нет (например, зашли на 1.21.2), 
      // пробуем найти хотя бы для мажорной ветки (1.21)
      if (!forgeVersion) {
        const majorVersion = fullGameVersion.split('.').slice(0, 2).join('.');
        forgeVersion = FORGE_MAP[majorVersion] || "52.0.0";
      }

      const forgeId = `${fullGameVersion}-forge-${forgeVersion}`;
      const forgePath = path.join(ROOT_DIR, 'versions', version);

      console.log(`[DEBUG] Target: ${fullGameVersion}, Forge: ${forgeVersion}`);

      if (!fs.existsSync(forgePath) || fs.readdirSync(forgePath).length === 0) {
        webContents.send('launch-status', `Installing Forge ${forgeVersion}...`);
        
        // Формируем URL (у Forge Maven есть специфика для старых версий, но для новых формат такой)
        const forgeUrl = `https://maven.minecraftforge.net/net/minecraftforge/forge/${fullGameVersion}-${forgeVersion}/forge-${fullGameVersion}-${forgeVersion}-installer.jar`;

        console.log(`[DEBUG] Trying to download: ${forgeUrl}`);
        const installerPath = path.join(ROOT_DIR, 'forge-installer.jar');

        try {
          await downloadFile(forgeUrl, installerPath, webContents);
          
          const { spawn } = require('node:child_process');
          const forgeProc = spawn(javaPath, [
            '-Djava.net.preferIPv4Stack=true', // Помогает при загрузке библиотек
            '-jar', 
            installerPath, 
            '--installClient', 
            ROOT_DIR
          ], { cwd: ROOT_DIR });

          await new Promise((resolve, reject) => {
            forgeProc.stdout.on('data', (data: any) => console.log(`[Forge] ${data}`));
            forgeProc.stderr.on('data', (data: any) => console.error(`[Forge Error] ${data}`));
            forgeProc.on('close', (code: number) => code === 0 ? resolve(true) : reject(new Error(`Exit code ${code}`)));
          });

          // Исправленная логика переименования
          const defaultForgeFolder = path.join(ROOT_DIR, 'versions', forgeId);
          if (fs.existsSync(defaultForgeFolder)) {
            if (fs.existsSync(forgePath)) fs.rmSync(forgePath, { recursive: true, force: true });
            fs.renameSync(defaultForgeFolder, forgePath);

            const oldJson = path.join(forgePath, `${forgeId}.json`);
            const newJson = path.join(forgePath, `${version}.json`);
            if (fs.existsSync(oldJson)) {
              let jsonContent = JSON.parse(fs.readFileSync(oldJson, 'utf-8'));
              jsonContent.id = version;
              fs.writeFileSync(newJson, JSON.stringify(jsonContent));
              fs.unlinkSync(oldJson);
            }
          }
        } catch (err: any) {
          if (fs.existsSync(installerPath)) fs.unlinkSync(installerPath);
          throw new Error(`Forge fail: ${err.message}`);
        } finally {
          if (fs.existsSync(installerPath)) fs.unlinkSync(installerPath);
        }
      }
      launchVersion = version;
    }
    // --- 3. ОБРАБОТКА СОБЫТИЙ ЛОГА ---
    launcher.on('progress', (e: any) => {
      webContents.send('download-progress', {
        percent: e.percentage || 0,
        current: (e.task / 1024 / 1024).toFixed(1),
        total: (e.total / 1024 / 1024).toFixed(1),
        isChecking: false
      });
    });

    launcher.on('data', (e: string) => {
      if (e.includes('Setting user:') || e.includes('Sound engine started')) {
        webContents.send('version-downloaded', version); 
        webContents.send('download-progress', null);
        webContents.send('launch-status', 'Game Running');
      }
      console.log(`[GAME] ${e}`);
    });

    // --- 4. ПАРАМЕТРЫ ЗАПУСКА ---
    const opts = {
      authorization: authMethod(nickname),
      root: ROOT_DIR,
      javaPath,
      version: {
        number: (isFabric || isForge) ? (version.match(/(\d+\.\d+\.?\d*)/)?.[0] || "1.21.1") : version,
        custom: (isFabric || isForge) ? version : undefined,
        type: "release"
      },
      customArgs: ["-Dforge.earlydisplay=false"],
      overrides: {
        versionType: "release",
        gameDirectory: path.join(ROOT_DIR, 'instances', version)
      },
      memory: { max: "4G", min: "1G" }
    };

    launcher.launch(opts);

  } catch (err: any) {
    console.error('Launch Error:', err);
    webContents.send('launch-error', err.message);
  } 
});

ipcMain.on('open-game-folder', () => {
  const root = path.join(app.getPath('appData'), '.hard-monitoring');
  if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true });
  shell.openPath(root);
});


ipcMain.handle('get-versions', async () => {
  try {
    const jsonPath = path.join(app.getAppPath(), 'public/versions-manifest.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const { versions } = JSON.parse(rawData);
    const versionsPath = path.join(ROOT_DIR, 'versions');

    return versions.map((v: any) => {
      const versionDir = path.join(versionsPath, v.id);
      // Проверка: скачана ли версия (наличие папки и JSON/JAR файла)
      const isDownloaded = fs.existsSync(versionDir) && fs.readdirSync(versionDir).length > 0;
      return { ...v, isDownloaded };
    });
  } catch (e) { return []; }
});

ipcMain.handle('reset-version', async (_, versionId) => {
  try {
    const versionDir = path.join(ROOT_DIR, 'versions', versionId);
    if (fs.existsSync(versionDir)) {
      fs.rmSync(versionDir, { recursive: true, force: true });
    }
    
    // Также удалим установщик, если он остался
    const installerPath = path.join(ROOT_DIR, 'forge-installer.jar');
    if (fs.existsSync(installerPath)) fs.unlinkSync(installerPath);

    return { success: true };
  } catch (err: any) {
    console.error('Reset error:', err);
    return { success: false, error: err.message };
  }
});

ipcMain.on('open-external-link', (_event, url) => {
  if (url && url.startsWith('http')) {
    shell.openExternal(url)
  }
})

app.on('ready', () => {
  // Проверять обновления сразу после запуска
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
  if (win) {
    win.webContents.send('update_available');
  }
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

// Добавим обработку ошибок для авто-апдейтера, чтобы приложение не падало
autoUpdater.on('error', (error: any) => {
  console.error('Ошибка авто-обновления:', error);
});

app.whenReady().then(createWindow);