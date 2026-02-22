import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';

export class FabricService {
  /**
   * Проверяет наличие Fabric и скачивает его манифест, если нужно.
   * @returns ID версии для запуска
   */
  static async setup(gameVersion: string, loaderVersion: string, rootPath: string, webContents: Electron.WebContents): Promise<string> {
    const versionId = `fabric-loader-${loaderVersion}-${gameVersion}`;
    const versionDir = path.join(rootPath, 'versions', versionId);
    const jsonPath = path.join(versionDir, `${versionId}.json`);

    // Если файл уже есть, просто возвращаем ID
    if (fs.existsSync(jsonPath)) {
      return versionId;
    }

    webContents.send('launch-status', `Fetching Fabric Meta for ${gameVersion}...`);

    try {
      // API Fabric для получения готового профиля запуска
      const url = `https://meta.fabricmc.net/v2/versions/loader/${gameVersion}/${loaderVersion}/profile/json`;
      const response = await axios.get(url);
      const profileData = response.data;

      // Создаем папку, если её нет
      if (!fs.existsSync(versionDir)) {
        fs.mkdirSync(versionDir, { recursive: true });
      }

      // Сохраняем манифест
      fs.writeFileSync(jsonPath, JSON.stringify(profileData, null, 2));
      
      webContents.send('launch-status', 'Fabric manifest installed!');
      return versionId;
    } catch (error) {
      console.error('Fabric Setup Error:', error);
      throw new Error(`Failed to setup Fabric: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}