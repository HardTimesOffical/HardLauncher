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
    // Получаем свежий список с сервера
    const response = await fetch(REMOTE_SERVERS_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const remoteServers: MinecraftServer[] = await response.json();

    if (!remoteServers || !Array.isArray(remoteServers)) {
      console.log('[ServerManager] Некорректный формат данных из облака');
      return;
    }
    const buf = writeServersDat(remoteServers);
    fs.writeFileSync(serversPath, buf);
    
    console.log('[ServerManager] Список серверов полностью синхронизирован (перезаписан)');

  } catch (err) {
    console.error('[ServerManager] Ошибка синхронизации серверов:', err);
  }
};

function writeServersDat(servers: Array<{name: string, ip: string}>): Buffer {
  // Ручная запись NBT: TAG_Compound("") { TAG_List("servers") [ TAG_Compound { name, ip } ] }
  const parts: Buffer[] = [];

  // Заголовок: TAG_Compound (10), name=""
  parts.push(tagCompoundHeader(''));

  // TAG_List (9), name="servers", type=TAG_Compound (10), length
  parts.push(tagListHeader('servers', 10, servers.length));

  for (const server of servers) {
    // Каждый элемент списка — TAG_Compound без имени
    parts.push(tagString('name', server.name));
    parts.push(tagString('ip', server.ip));
    parts.push(tagString('icon', ''));
    // hideAddress: TAG_Byte (1)
    parts.push(tagByte('hideAddress', 0));
    // TAG_End (0) — конец compound
    parts.push(Buffer.from([0]));
  }

  // TAG_End — конец корневого compound
  parts.push(Buffer.from([0]));

  // Сжимаем в gzip (Minecraft читает servers.dat как gzip)
  const raw = Buffer.concat(parts);
  
  // Заголовок NBT файла: TAG_Compound (10) + длина имени (0) + имя ""
  // На самом деле Minecraft пишет без сжатия для servers.dat
  return raw;
}

function tagCompoundHeader(name: string): Buffer {
  const nameBuf = Buffer.from(name, 'utf8');
  const buf = Buffer.alloc(3 + nameBuf.length);
  buf.writeUInt8(10, 0); // TAG_Compound
  buf.writeUInt16BE(nameBuf.length, 1);
  nameBuf.copy(buf, 3);
  return buf;
}

function tagListHeader(name: string, elementType: number, count: number): Buffer {
  const nameBuf = Buffer.from(name, 'utf8');
  const buf = Buffer.alloc(3 + nameBuf.length + 1 + 4);
  let offset = 0;
  buf.writeUInt8(9, offset++); // TAG_List
  buf.writeUInt16BE(nameBuf.length, offset); offset += 2;
  nameBuf.copy(buf, offset); offset += nameBuf.length;
  buf.writeUInt8(elementType, offset++); // element type
  buf.writeInt32BE(count, offset);
  return buf;
}

function tagString(name: string, value: string): Buffer {
  const nameBuf = Buffer.from(name, 'utf8');
  const valueBuf = Buffer.from(value, 'utf8');
  const buf = Buffer.alloc(3 + nameBuf.length + 2 + valueBuf.length);
  let offset = 0;
  buf.writeUInt8(8, offset++); // TAG_String
  buf.writeUInt16BE(nameBuf.length, offset); offset += 2;
  nameBuf.copy(buf, offset); offset += nameBuf.length;
  buf.writeUInt16BE(valueBuf.length, offset); offset += 2;
  valueBuf.copy(buf, offset);
  return buf;
}

function tagByte(name: string, value: number): Buffer {
  const nameBuf = Buffer.from(name, 'utf8');
  const buf = Buffer.alloc(3 + nameBuf.length + 1);
  let offset = 0;
  buf.writeUInt8(1, offset++); // TAG_Byte
  buf.writeUInt16BE(nameBuf.length, offset); offset += 2;
  nameBuf.copy(buf, offset); offset += nameBuf.length;
  buf.writeUInt8(value, offset);
  return buf;
}

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