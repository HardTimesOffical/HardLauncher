import path from 'node:path';
import fs from 'node:fs';
import https from 'node:https';
import decompress from 'decompress';

export function getJavaVersionNeeded(version: string): number {
  const v = version.match(/(\d+\.\d+)/)?.[0];
  const vFloat = parseFloat(v || "1.21");
  if (vFloat >= 1.20) return 21;
  if (vFloat >= 1.17) return 17;
  return 8;
}

// 1. Добавляем gamePath в аргументы
export const findJavaExecutable = (version: string, gamePath: string): string | null => {
  // Теперь используем переданный gamePath вместо ROOT_DIR
  const javaFolder = path.join(gamePath, 'runtime', `java-${version}`);
  const exeName = process.platform === 'win32' ? 'java.exe' : 'java';

  const recursiveSearch = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        const found = recursiveSearch(fullPath);
        if (found) return found;
      } else if (file.toLowerCase() === exeName && dir.toLowerCase().endsWith('bin')) {
        return fullPath;
      }
    }
    return null;
  };

  return recursiveSearch(javaFolder);
};

// 2. Добавляем gamePath в ensureJava
export const ensureJava = async (version: string, webContents: any, gamePath: string): Promise<string> => {
  // Передаем путь дальше
  let existingPath = findJavaExecutable(version, gamePath);
  if (existingPath) return existingPath;

  let downloadUrl = "";
  if (version === '21') {
    downloadUrl = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.zip";
  } else if (version === '17') {
    downloadUrl = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.zip";
  } else {
    downloadUrl = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u402-b06/OpenJDK8U-jdk_x64_windows_hotspot_8u402b06.zip";
  }

  // Заменяем ROOT_DIR на gamePath
  const javaFolder = path.join(gamePath, 'runtime', `java-${version}`);
  const zipPath = path.join(gamePath, `temp_java_${version}.zip`);

  if (!fs.existsSync(path.join(gamePath, 'runtime'))) {
    fs.mkdirSync(path.join(gamePath, 'runtime'), { recursive: true });
  }

  webContents.send('launch-status', `Загрузка Java ${version}...`);
  // Предполагается, что downloadFile у тебя определена ниже
  await downloadFile(downloadUrl, zipPath, webContents, `Java ${version}`);
  
  webContents.send('launch-status', `Распаковка Java...`);
  if (fs.existsSync(javaFolder)) fs.rmSync(javaFolder, { recursive: true, force: true });
  fs.mkdirSync(javaFolder, { recursive: true });

  await decompress(zipPath, javaFolder);
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  const newPath = findJavaExecutable(version, gamePath);
  if (!newPath) throw new Error(`Не удалось найти java.exe после распаковки Java ${version}`);
  
  return newPath;
};

export function downloadFile(url: string, dest: string, webContents: any, taskName: string = "Загрузка..."): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    const request = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      if ([301, 302, 307, 308].includes(response.statusCode || 0)) {
        file.close();
        return downloadFile(response.headers.location!, dest, webContents, taskName).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        return reject(new Error(`Ошибка сервера: ${response.statusCode}`));
      }

      const total = parseInt(response.headers['content-length'] || '0', 10);
      let downloaded = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total > 0) {
          const percent = Math.round((downloaded / total) * 100);
          webContents.send('download-progress', {
            type: 'installer',
            task: taskName,
            percent,
            current: (downloaded / (1024 * 1024)).toFixed(1),
            total: (total / (1024 * 1024)).toFixed(1)
          });
        }
      });

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}