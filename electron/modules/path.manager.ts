import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

// Это остается как дефолтное значение для инициализации
export const DEFAULT_ROOT_DIR = path.join(app.getPath('appData'), '.hlauncher');
export const isVersionDownloaded = (versionId: string, gamePath: string): boolean => {
  if (versionId.startsWith('forge-')) {
    const versionsDir = path.join(gamePath, 'versions');
    if (!fs.existsSync(versionsDir)) return false;

    const gameVersion = versionId.replace('forge-', '');
    const dirs = fs.readdirSync(versionsDir);

    return dirs.some(d => {
      if (!d.toLowerCase().includes('forge')) return false;
      // Точное совпадение: "1.21.1-forge-..." но НЕ "1.21.11-forge-..."
      const parts = d.split('-forge-');
      return parts[0] === gameVersion;
    });
  }

  const versionsPath = path.join(gamePath, 'versions', versionId);
  const jsonFile = path.join(versionsPath, `${versionId}.json`);
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