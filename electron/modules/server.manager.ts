import fs from 'fs';
import path from 'path';
import * as nbt from 'nbt-ts';
import axios from 'axios'; // Рекомендую использовать axios для скачивания файлов

interface MinecraftServer {
  name: string;
  ip: string;
}

// Вспомогательная функция скачивания (если у тебя её еще нет в этом файле)
async function downloadFile(url: string, dest: string, webContents: any, label: string) {
  // 1. Используем label для вывода в консоль (убираем ошибку ts6133)
  console.log(`[Download] Начало загрузки ${label}: ${url}`);

  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
    maxRedirects: 5 // Убеждаемся, что следуем за редиректами GitHub
 })

  // Указываем тип Promise<void>, чтобы resolve() можно было вызывать без аргументов
  return new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(dest);
    
    response.data.pipe(writer);

    // 2. Используем webContents для отправки статуса (убираем ошибку ts6133)
    if (webContents) {
      webContents.send('launch-status', `Загрузка ${label}...`);
    }

    writer.on('finish', () => {
      resolve(); // Теперь ошибок типизации нет
    });

    writer.on('error', (err) => {
      console.error(`Ошибка при записи файла ${label}:`, err);
      reject(err);
    });

    // Обработка ошибок самого стрима ответа
    response.data.on('error', (err: Error) => {
      reject(err);
    });
  });
}

/**
 * Синхронизирует список серверов из S3 с локальным файлом servers.dat
 */
export const syncServers = async (gamePath: string) => {
  const serversPath = path.join(gamePath, 'servers.dat');
  const REMOTE_SERVERS_URL = "https://s3.twcstorage.ru/25f7f6a6-e7bd-4e1a-b0ff-5abadb3c2fcc/hardlauncher/servers.json";
  
  try {
    const response = await fetch(REMOTE_SERVERS_URL, { cache: 'no-store' });
    const remoteServers: MinecraftServer[] = await response.json();

    let currentData: any = { servers: [] };

    if (fs.existsSync(serversPath)) {
      try {
        const fileBuffer = fs.readFileSync(serversPath);
        const decoded = nbt.decode(fileBuffer);
        currentData = decoded.value;
      } catch (e) {
        console.warn('[ServerManager] servers.dat поврежден, создаем новый');
      }
    }

    let modified = false;
    remoteServers.forEach(remote => {
      // Проверка: есть ли сервер уже в списке (по IP)
      const exists = currentData.servers.some((s: any) => s.ip === remote.ip);
      if (!exists) {
        currentData.servers.push({
          name: remote.name,
          ip: remote.ip,
          hideAddress: new nbt.Byte(0), 
        });
        modified = true;
      }
    });

    if (modified) {
      const encoded = nbt.encode('root', currentData);
      fs.writeFileSync(serversPath, Buffer.from(encoded));
      console.log('[ServerManager] Список серверов обновлен');
    }
  } catch (err) {
    console.error('[ServerManager] Ошибка синхронизации серверов:', err);
  }
};

/**
 * Проверяет наличие инъектора для скинов и скачивает его при необходимости
 */
export async function ensureInjector(gamePath: string, webContents: any) {
  const injectorPath = path.join(gamePath, 'authlib-injector.jar');
  const downloadUrl = "https://github.com/yushijinhun/authlib-injector/releases/download/v1.2.7/authlib-injector-1.2.7.jar";

  // Проверяем существование И что файл не пустой/повреждённый
  if (fs.existsSync(injectorPath)) {
    const stat = fs.statSync(injectorPath);
    if (stat.size > 100000) { // нормальный jar весит ~800KB
      console.log(`[Injector] Уже установлен (${Math.round(stat.size / 1024)}KB): ${injectorPath}`);
      return injectorPath;
    } else {
      console.warn(`[Injector] Файл повреждён (${stat.size} байт), перекачиваем...`);
      fs.unlinkSync(injectorPath); // Удаляем битый файл
    }
  }

  console.log('[Injector] Скачивание authlib-injector...');
  if (webContents) webContents.send('launch-status', 'Подготовка системы скинов...');
  
  if (!fs.existsSync(gamePath)) fs.mkdirSync(gamePath, { recursive: true });
  
  await downloadFile(downloadUrl, injectorPath, webContents, 'Skin Injector');

  // Финальная проверка после скачивания
  const stat = fs.statSync(injectorPath);
  if (stat.size < 100000) {
    fs.unlinkSync(injectorPath);
    throw new Error(`authlib-injector скачался повреждённым (${stat.size} байт). Проверьте интернет-соединение.`);
  }

  console.log(`[Injector] Успешно скачан (${Math.round(stat.size / 1024)}KB): ${injectorPath}`);
  return injectorPath;
}