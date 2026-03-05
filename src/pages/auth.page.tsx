import { useState } from 'react';

interface AuthPageProps {
  onLoginSuccess: (nickname: string, provider: 'internal' | 'ely', token?: string) => void;
}

type AuthProvider = 'internal' | 'ely';
type AuthMode = 'login' | 'register';

const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const [provider, setProvider] = useState<AuthProvider>('internal');
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (provider === 'ely') {
        const data = await window.ipcRenderer.invoke('ely-auth', { email, password });
        if (data?.accessToken && data?.selectedProfile) {
          await window.ipcRenderer.invoke('login-and-save', {
            nickname: data.selectedProfile.name,
            token: data.accessToken,
            uuid: data.selectedProfile.id,
            provider: 'ely'
          });
          onLoginSuccess(data.selectedProfile.name, 'ely', data.accessToken);
        } else {
          setError(data?.errorMessage || 'Неверный логин или пароль');
        }
      } else {
        if (mode === 'register' && !username.trim()) {
          setError('Введите никнейм');
          setLoading(false);
          return;
        }

        const data = await window.ipcRenderer.invoke('hardtimes-auth', {
          email, password,
          username: username || email.split('@')[0],
          isRegister: mode === 'register'
        });

        if (data?.accessToken && data?.user) {
          await window.ipcRenderer.invoke('login-and-save', {
            nickname: data.user.username,
            token: data.accessToken,
            uuid: data.user.id,
            provider: 'internal'
          });
          onLoginSuccess(data.user.username, 'internal', data.accessToken);
        } else if (mode === 'register' && data?.id) {
          const loginData = await window.ipcRenderer.invoke('hardtimes-auth', {
            email, password, isRegister: false
          });
          if (loginData?.accessToken && loginData?.user) {
            await window.ipcRenderer.invoke('login-and-save', {
              nickname: loginData.user.username,
              token: loginData.accessToken,
              uuid: loginData.user.id,
              provider: 'internal'
            });
            onLoginSuccess(loginData.user.username, 'internal', loginData.accessToken);
          } else {
            setError(loginData?.message || 'Ошибка входа после регистрации');
          }
        } else {
          setError(data?.message || 'Ошибка авторизации');
        }
      }
    } catch (e) {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-white/20";

  return (
    <div className="w-[360px]">
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">

        {/* Шапка */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-bold text-white mb-0.5">
            {provider === 'ely' ? 'Войти через Ely.by' :
             mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
          </h2>
          <p className="text-[10px] text-white/30">
            {provider === 'ely' ? 'Используйте аккаунт Ely.by для входа' :
             mode === 'login' ? 'Войдите в свой Hard Times аккаунт' : 'Создайте новый аккаунт Hard Times'}
          </p>
        </div>

        {/* Переключатель провайдера */}
        <div className="flex p-2 gap-1 border-b border-white/[0.06]">
          <button
            onClick={() => { setProvider('internal'); setError(''); }}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
              ${provider === 'internal'
                ? 'bg-[#1bd96a]/15 text-[#1bd96a] border border-[#1bd96a]/20'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
              }`}
          >
            Hard Times
          </button>
          <button
            onClick={() => { setProvider('ely'); setMode('login'); setError(''); }}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
              ${provider === 'ely'
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
              }`}
          >
            Ely.by
          </button>
        </div>

        {/* Форма */}
        <div className="p-6 flex flex-col gap-3">

          {/* Переключатель логин/регистрация для HardTimes */}
          {provider === 'internal' && (
            <div className="flex gap-1 p-1 bg-white/[0.02] rounded-xl border border-white/[0.05]">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
                  ${mode === 'login' ? 'bg-white/[0.08] text-white' : 'text-white/30 hover:text-white/50'}`}
              >
                Войти
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
                  ${mode === 'register' ? 'bg-white/[0.08] text-white' : 'text-white/30 hover:text-white/50'}`}
              >
                Регистрация
              </button>
            </div>
          )}

          {/* Поля */}
          {provider === 'internal' && mode === 'register' && (
            <input
              type="text"
              placeholder="Никнейм"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={inputClass}
            />
          )}

          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className={inputClass}
          />

          {/* Ошибка */}
          {error && (
            <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-[10px]">{error}</p>
            </div>
          )}

          {/* Кнопка */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all disabled:opacity-40
              ${provider === 'ely'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50'
                : 'bg-[#1bd96a]/20 text-[#1bd96a] border border-[#1bd96a]/30 hover:bg-[#1bd96a]/30 hover:border-[#1bd96a]/50'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Загрузка...
              </span>
            ) : (
              provider === 'ely' ? 'Войти через Ely.by' :
              mode === 'login' ? 'Войти' : 'Зарегистрироваться'
            )}
          </button>

          {/* Ссылка на регистрацию Ely */}
          {provider === 'ely' && (
            <p className="text-center text-[9px] text-white/20">
              Нет аккаунта?{' '}
              <a
                href="https://account.ely.by/register"
                target="_blank"
                className="text-blue-400/60 hover:text-blue-400 transition-colors"
              >
                Регистрация на Ely.by
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;