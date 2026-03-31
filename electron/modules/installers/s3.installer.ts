import fs from 'fs';
import path from 'path';
import axios from 'axios';

const S3_BASE = 'https://s3.twcstorage.ru/25f7f6a6-e7bd-4e1a-b0ff-5abadb3c2fcc/hardlauncher/versions';

// Структура манифеста версии на S3:
// /versions/{versionId}/manifest.json — список файлов
// /versions/{versionId}/files/... — сами файлы

interface S3FileEntry {
  path: string;   // относительный путь куда класть файл в gamePath
  url: string;    // полный URL или относительный от S3_BASE
  size?: number;
}

export async function installFromS3(
  versionObj: any,
  gamePath: string,
  webContents: any
): Promise<void> {
  const { id } = versionObj;
  const manifestUrl = `${S3_BASE}/${id}/manifest.json`;

  webContents.send('launch-status', `Загрузка ${id} с сервера...`);
  console.log(`[S3] Загружаем манифест: ${manifestUrl}`);

  const manifestRes = await fetch(manifestUrl);
  if (!manifestRes.ok) throw new Error(`Манифест не найден: ${manifestUrl}`);

  const files: S3FileEntry[] = await manifestRes.json();

  let done = 0;
  for (const file of files) {
    const dest = path.join(gamePath, file.path);
    const destDir = path.dirname(dest);

    // Пропускаем если файл уже есть и размер совпадает
    if (fs.existsSync(dest)) {
      const stat = fs.statSync(dest);
      if (!file.size || stat.size === file.size) {
        done++;
        continue;
      }
    }

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const fileUrl = file.url.startsWith('http') ? file.url : `${S3_BASE}/${id}/${file.url}`;

    try {
      await downloadFile(fileUrl, dest, webContents);
    } catch (err) {
      console.warn(`[S3] Не удалось скачать ${file.path}, пропускаем:`, err);
      // Не бросаем — MCLC докачает
    }

    done++;
    const percent = Math.round((done / files.length) * 100);
    webContents.send('launch-progress', percent);
    webContents.send('launch-status', `Установка ${id}: ${percent}%`);
  }

  console.log(`[S3] Установка завершена: ${id}`);
}

async function downloadFile(url: string, dest: string, webContents: any): Promise<void> {
  const response = await axios({ method: 'GET', url, responseType: 'stream', maxRedirects: 5 });
  
  // Получаем общий размер файла из заголовков
  const totalBytes = parseInt(response.headers['content-length'] || '0');
  let downloadedBytes = 0;

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(dest);

    response.data.on('data', (chunk: any) => {
      downloadedBytes += chunk.length;
      if (totalBytes > 0) {
        const progress = (downloadedBytes / totalBytes) * 100;
        // ТЕПЕРЬ webContents ИСПОЛЬЗУЕТСЯ, ОШИБКА ИСЧЕЗНЕТ
        webContents.send('download-progress', { progress, url });
      }
    });

    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
    response.data.on('error', reject);
  });
}