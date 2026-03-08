import { useState } from 'react';

interface AuthPageProps {
  onLoginSuccess: (nickname: string, provider: 'internal' | 'ely' | 'microsoft', token?: string) => void;
}

type AuthProvider = 'internal' | 'ely' | 'microsoft';
type AuthMode = 'login' | 'register';

const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const [provider, setProvider] = useState<AuthProvider>('internal');
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMicrosoftLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await window.ipcRenderer.invoke('microsoft-auth');
      if (result.success) {
        onLoginSuccess(result.nickname, 'microsoft', result.accessToken);
      } else {
        setError(result.error || 'Ошибка входа через Microsoft');
      }
    } catch {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

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

  const inputClass = "w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-brand)] focus:bg-[var(--color-bg-elevated)] transition-all placeholder:text-[var(--color-text-dim)]";

  return (
  <div className="w-[360px] animate-scale-in">
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl">

      {/* Шапка */}
      <div className="px-6 pt-6 pb-4 border-b border-[var(--color-border)]">
        <h2 className="text-sm font-bold text-[var(--color-text)] mb-0.5 font-mc-title uppercase tracking-tight">
          {provider === 'ely' ? 'Войти через Ely.by' :
            mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>
        <p className="text-[10px] text-[var(--color-text-dim)] font-mc uppercase">
          {provider === 'ely' ? 'Используйте аккаунт Ely.by для входа' :
            mode === 'login' ? 'Войдите в свой Hard Times аккаунт' : 'Создайте новый аккаунт Hard Times'}
        </p>
      </div>

      {/* Переключатель провайдера */}
      <div className="flex p-2 gap-1 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
        <button
          onClick={() => { setProvider('internal'); setError(''); }}
          className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
            ${provider === 'internal'
              ? 'bg-[var(--color-brand-dim)] text-[var(--color-brand)] border border-[var(--color-brand)]/20'
              : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
            }`}
        >
          Hard Times
        </button>
        <button
          onClick={() => { setProvider('ely'); setMode('login'); setError(''); }}
          className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
            ${provider === 'ely'
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
              : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
            }`}
        >
          Ely.by
        </button>
        <button
          onClick={() => { setProvider('microsoft'); setError(''); }}
          className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
            ${provider === 'microsoft'
              ? 'bg-[#0078d4]/15 text-[#4db3ff] border border-[#0078d4]/20'
              : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
            }`}
        >
          Microsoft
        </button>
      </div>

      {/* Форма */}
      <div className="p-6 flex flex-col gap-3">

        {provider === 'microsoft' && (
  <div className="flex flex-col gap-3 py-2">
    <div className="px-3 py-3 bg-[#0078d4]/10 border border-[#0078d4]/20 rounded-xl">
      <p className="text-[10px] text-[#4db3ff] uppercase font-bold tracking-wider mb-1">
        Вход через Microsoft
      </p>
      <p className="text-[9px] text-white/40 leading-relaxed">
        Откроется браузер для входа в аккаунт Microsoft. Требуется лицензия Minecraft.
      </p>
    </div>
    <button
      onClick={handleMicrosoftLogin}
      disabled={loading}
      className="w-full py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all active:scale-[0.98] disabled:opacity-40 bg-[#0078d4]/20 text-[#4db3ff] border border-[#0078d4]/30 hover:bg-[#0078d4]/30"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          ОЖИДАНИЕ...
        </span>
      ) : 'Войти через Microsoft'}
    </button>
  </div>
)}

        {/* Переключатель логин/регистрация для HardTimes */}
        {provider === 'internal' && (
          <div className="flex gap-1 p-1 bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)]">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
                ${mode === 'login' ? 'bg-[var(--color-border)] text-[var(--color-text)] shadow-sm' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'}`}
            >
              Войти
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all
                ${mode === 'register' ? 'bg-[var(--color-border)] text-[var(--color-text)] shadow-sm' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'}`}
            >
              Регистрация
            </button>
          </div>
        )}

        {/* Поля */}
        <div className="space-y-2">
          {provider === 'internal' && mode === 'register' && (
            <input
              type="text"
              placeholder="НИКНЕЙМ"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={inputClass}
            />
          )}

          <input
            type="text"
            placeholder="E-MAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />

          <input
            type="password"
            placeholder="ПАРОЛЬ"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className={inputClass}
          />
        </div>

        {/* Ошибка */}
        {error && (
          <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
            <p className="text-red-400 text-[10px] font-bold uppercase tracking-tighter">{error}</p>
          </div>
        )}

        {/* Кнопка */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all active:scale-[0.98] disabled:opacity-40 shadow-lg
            ${provider === 'ely'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30'
              : 'bg-[var(--color-brand-dim)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 hover:bg-[var(--color-brand)]/20 hover:border-[var(--color-brand)]/50'
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              ЗАГРУЗКА...
            </span>
          ) : (
            provider === 'ely' ? 'Войти через Ely.by' :
            mode === 'login' ? 'Авторизоваться' : 'Создать аккаунт'
          )}
        </button>

        {/* Ссылка на регистрацию Ely */}
        {provider === 'ely' && (
          <p className="text-center text-[9px] font-bold uppercase tracking-widest mt-1">
            <span className="text-[var(--color-text-dim)]">Нет аккаунта?</span>{' '}
            <a
              href="https://account.ely.by/register"
              target="_blank"
              className="text-blue-400/60 hover:text-blue-400 transition-colors underline underline-offset-2"
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