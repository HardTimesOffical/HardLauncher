import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const MCLC = require('minecraft-launcher-core');
const LauncherClient = MCLC.Client;

export const createGameLauncher = (webContents: any, isVanilla: boolean) => {
  const launcher = new LauncherClient();

  // 1. Используем в логах (теперь TS доволен)
  console.log(`[Launcher] Инициализация запуска. Режим: ${isVanilla ? 'Vanilla' : 'Custom Build'}`);

  launcher.on('debug', (data: string) => {
    console.log(`[MCLC Debug]: ${data}`);
  });

  launcher.on('progress', (data: any) => {
    const current = data.task;
    const total = data.total;
    const percent = Math.round((current / total) * 100);

    webContents.send('download-progress', {
      percent: isNaN(percent) ? 0 : percent,
      current: current.toString(),
      total: total.toString(),
      type: data.type,
      // Можно прокинуть флаг на фронт, если там нужна разная анимация
      isVanilla 
    });
  });

  launcher.on('download-status', (data: any) => {
    console.log(`[Download]: ${data.type} -> ${data.name}`);
    
    // 2. Используем isVanilla для уточнения статусов
    const statusMap: Record<string, string> = {
      'assets': 'Загрузка ресурсов',
      'libraries': isVanilla ? 'Загрузка библиотек' : 'Загрузка зависимостей сборки',
      'jar': 'Загрузка ядра игры',
      'natives': 'Настройка системы'
    };
    
    const text = statusMap[data.type] || `Загрузка ${data.type}...`;
    webContents.send('launch-status', text);
  });

  launcher.on('data', (data: any) => {
    const message = data.toString('utf-8');
    console.log(`[MC LOGS]: ${message.trim()}`);

    if (message.includes('Setting user:') || message.includes('Sound engine started')) {
      webContents.send('launch-status', 'Игра запущена');
      webContents.send('download-progress', null);
    }
  });

  launcher.on('close', (code: number) => {
    console.log(`[GAME] Выход с кодом: ${code}`);
    // Если код не 0, значит игра крашнулась
    const finalStatus = code === 0 ? 'Готов к игре' : 'Игра завершилась с ошибкой';
    webContents.send('launch-status', finalStatus);
    webContents.send('download-progress', null);
    webContents.send('game-closed', code); 
  });

  return launcher;
};