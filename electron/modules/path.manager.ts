import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

// Это остается как дефолтное значение для инициализации
export const DEFAULT_ROOT_DIR = path.join(app.getPath('appData'), '.hard-monitoring');
export const isVersionDownloaded = (versionId: string, gamePath: string): boolean => {
  // Проверяем именно в той папке, которая сейчас выбрана в настройках
  const versionsPath = path.join(gamePath, 'versions', versionId);
  const jsonFile = path.join(versionsPath, `${versionId}.json`);
  
  // Самая надежная проверка — наличие JSON-файла версии
  return fs.existsSync(jsonFile);
};

/**
 * Создает папку по переданному пути
 */
export const ensureRootDir = (gamePath: string) => {
  if (!fs.existsSync(gamePath)) {
    fs.mkdirSync(gamePath, { recursive: true });
  }
};