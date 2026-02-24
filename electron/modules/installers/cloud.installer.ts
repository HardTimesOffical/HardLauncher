import axios from 'axios';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

export const CloudInstaller = {
  async install(versionId: string, url: string, rootDir: string, webContents: any) {
    const tempDir = path.join(rootDir, 'temp');
    const zipPath = path.join(tempDir, `${versionId}.zip`);
    const versionDir = path.join(rootDir, 'versions', versionId); // Папка версии

    // Создаём временную папку и папку версии
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    if (!fs.existsSync(versionDir)) fs.mkdirSync(versionDir, { recursive: true });

    // ------------------------
    // 1. Скачивание
    // ------------------------
    webContents.send('launch-status', 'Загрузка компонентов сборки...');
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const totalLength = parseInt(response.headers['content-length'], 10);
    let downloadedLength = 0;

    const writer = fs.createWriteStream(zipPath);
    response.data.on('data', (chunk: Buffer) => {
      downloadedLength += chunk.length;
      const percent = Math.round((downloadedLength / totalLength) * 100);
      webContents.send('download-progress', {
        percent,
        current: (downloadedLength / 1024 / 1024).toFixed(2),
        total: (totalLength / 1024 / 1024).toFixed(2)
      });
    });

    await new Promise<void>((resolve, reject) => {
      response.data.pipe(writer);
      writer.on('finish', () => resolve());
      writer.on('error', reject);
    });

    // ------------------------
    // 2. Распаковка
    // ------------------------
    webContents.send('launch-status', 'Распаковка файлов...');
    try {
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(versionDir, true); // Распаковываем прямо в папку версии
    } catch (e) {
      throw new Error('Ошибка при распаковке архива');
    }

    // ------------------------
    // 3. Удаляем временный ZIP
    // ------------------------
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    return versionId;
  }
};