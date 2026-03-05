import axios from 'axios';

// Твой URL API (например, где запущен твой Express сервер)
const AUTH_API_URL = "http://твой-сервер.ru/api/auth";

export const authWithServer = async (login: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      login, // или email
      password
    });

    // Ожидаем от сервера { success: true, nickname: "Alex", token: "..." }
    if (response.data && response.data.success) {
      return {
        nickname: response.data.nickname,
        token: response.data.token
      };
    }
    throw new Error(response.data.message || "Ошибка авторизации");
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message;
    throw new Error(msg);
  }
};