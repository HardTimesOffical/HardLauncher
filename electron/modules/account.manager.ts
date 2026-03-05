import fs from 'fs';
import path from 'path';

export interface Account {
  nickname: string;
  token: string;
  uuid?: string;
  provider?: string;
  authServer?: string;
}

export class AccountManager {
  private filePath: string;

  constructor(gamePath: string) {
    // Убеждаемся, что папка существует перед созданием файла
    if (!fs.existsSync(gamePath)) {
      fs.mkdirSync(gamePath, { recursive: true });
    }
    
    this.filePath = path.join(gamePath, 'accounts.json');
    
    // Создаем пустой массив в файле, если его нет
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  // Вспомогательный метод для записи всего массива
  private saveAll(accounts: Account[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2));
  }

  // Получить все аккаунты
  getAll(): Account[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Ошибка чтения accounts.json:', err);
      return [];
    }
  }

  // Сохранить или обновить конкретный аккаунт
  save(data: Account) {
  const accounts = this.getAll();

  // Ищем по нику И провайдеру одновременно
  const index = accounts.findIndex(
    (a) => a.nickname === data.nickname && a.provider === data.provider
  );
  
  const accountEntry: Account = {
    nickname: data.nickname,
    token: data.token,
    uuid: data.uuid || "",
    provider: data.provider || "internal",
    authServer: data.authServer || "http://localhost:5000/user"
  };

  if (index !== -1) {
    accounts[index] = accountEntry; // Обновляем если тот же ник + тот же провайдер
  } else {
    accounts.push(accountEntry);    // Добавляем новый
  }

  this.saveAll(accounts);
}
}