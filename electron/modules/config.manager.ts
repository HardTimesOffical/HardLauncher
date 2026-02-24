import { app } from 'electron';
import fs from 'fs';
import path from 'path';

// Динамический путь к конфигу в AppData пользователя
const CONFIG_PATH = path.join(app.getPath('userData'), 'launcher-config.json');
// Динамический путь к игре по умолчанию в Home пользователя
const DEFAULT_GAME_PATH = path.join(app.getPath('appData'), '.hard-monitoring');

const defaultConfig = {
  ram: 4,
  gamePath: DEFAULT_GAME_PATH,
  lastNickname: '',   
  lastVersion: ''      
};



export const ConfigManager = {
  load() {
    // Если файла нет — создаем его сразу
    if (!fs.existsSync(CONFIG_PATH)) {
      this.save(defaultConfig);
      return defaultConfig;
    }
    try {
      const data = fs.readFileSync(CONFIG_PATH, 'utf-8');
      return { ...defaultConfig, ...JSON.parse(data) };
    } catch {
      return defaultConfig;
    }
  },

  save(config: any) {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  }
};