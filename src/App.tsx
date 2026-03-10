import { useState, useEffect, useCallback } from 'react'
import LaunchProgress from './components/LaunchProgress';
import ServerList from './components/ServerList';
import BackgroundCarousel from './components/BackgroundCarousel';
import SettingsPage from './pages/settings';
import GlobalChat from './components/GlobalChat';
import Footer from './components/Footer';
import AuthPage from './pages/auth.page';
import ProfilePage from './pages/profile.page';
import ContentPage from './pages/content.page';
import SkinHead from './components/SkinHead';
import TitleBar from './components/TitleBar';

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
  name?: string;
  instanceId?: string; // ← добавь
}

interface ProgressData {
  percent: number;
  current: string;
  total: string;
  isChecking?: boolean;
}

interface ActiveAccount {
  nickname: string;
  provider: 'internal' | 'ely' | 'offline' | 'microsoft';
  token?: string;
}

type AuthProvider = 'internal' | 'ely' | 'microsoft'; // ← добавь microsoft
type Tab = 'play' | 'profile' | 'settings' | 'auth' | 'chat' | 'content';

// Иконки для sidebar
const Icons = {
  play: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  profile: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  chat: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  auth: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  content: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('play');
  const [activeAccount, setActiveAccount] = useState<ActiveAccount>({
    nickname: '',
    provider: 'offline'
  });
  const [nickname, setNickname] = useState('HardPlayer_01');
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [statusText, setStatusText] = useState('Загрузка файлов...');
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [authProvider, setAuthProvider] = useState<AuthProvider>(() => {
    return (localStorage.getItem('auth-provider') as AuthProvider) || 'internal';
  });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string>(() => {
    return localStorage.getItem('selected-game-version') || '1.21.1';
  });
  const [hasMention, setHasMention] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const currentVersionObj = versions.find(v => v.id === selectedVersion);
  const isDownloaded = currentVersionObj?.isDownloaded;

  const bgImages = [
    '/banners/bg1.jpg',
    '/banners/bg2.jpg',
    '/banners/bg3.jpg',
    '/banners/bg5.jpg'
  ];


  const stopLaunching = useCallback(() => {
    setIsLaunching(false);
    setProgress(null);
  }, []);

const fetchVersions = useCallback(async () => {
  const [data, instances] = await Promise.all([
    window.ipcRenderer.invoke('get-versions'),
    window.ipcRenderer.invoke('get-instances').catch(() => []),
  ]);

  const instanceVersions: GameVersion[] = (instances || []).map((inst: any) => ({
    id: inst.id,
    name: inst.name,
    type: 'modpack',
    isDownloaded: true,
    instanceId: inst.id,
  }));

  setVersions([...instanceVersions, ...(data || [])]);
}, []);

    useEffect(() => { fetchVersions(); }, [fetchVersions]);

    useEffect(() => {
    window.ipcRenderer.invoke('refresh-accounts').then((accounts) => {
      // Если текущий аккаунт потерял токен — сбросить в офлайн
      if (activeAccount.provider !== 'offline') {
        const current = accounts.find(
          (a: any) => a.nickname === activeAccount.nickname && a.provider === activeAccount.provider
        );
        if (current && !current.token) {
          setActiveAccount({ nickname: current.nickname, provider: 'offline' });
          setNickname(current.nickname);
        }
      }
      });
    }, []);

  useEffect(() => {
    const handleRefresh = async () => {
      await fetchVersions(); // ← используй fetchVersions вместо прямого setVersions
    };

    window.ipcRenderer.on('filters-changed', handleRefresh);
    return () => {
      window.ipcRenderer.removeListener('filters-changed', handleRefresh);
    };
  }, [fetchVersions]);

  useEffect(() => {
    const handler = () => {
      window.ipcRenderer.invoke('get-instances').then((instances: any[]) => {
        if (!instances?.length) return;
                  const instanceVersions = instances.map((inst: any) => ({
            id: inst.id,
            name: inst.name,
            type: 'modpack',
            isDownloaded: inst.gameReady, // ← теперь зависит от реальной готовности
            instanceId: inst.id,
          }));
        setVersions(prev => {
          const withoutInstances = prev.filter((v: any) => !v.instanceId);
          return [...instanceVersions, ...withoutInstances];
        });
      });
    };
    window.ipcRenderer.on('instances-updated', handler);
    return () => { window.ipcRenderer.removeListener('instances-updated', handler); };
  }, []);

 // Один useEffect для загрузки настроек — только ОДИН РАЗ
useEffect(() => {
  const loadSavedData = async () => {
    const config = await window.ipcRenderer.invoke('get-settings');
    if (config.lastNickname) setNickname(config.lastNickname);
    if (config.lastVersion) {
      setSelectedVersion(config.lastVersion);
      localStorage.setItem('selected-game-version', config.lastVersion);
    }
    setSettingsLoaded(true);
  };
  loadSavedData();
}, []);
  

  useEffect(() => {
    if (!settingsLoaded) return; // не сохраняем до загрузки
    
    const saveData = async () => {
      const currentConfig = await window.ipcRenderer.invoke('get-settings');
      await window.ipcRenderer.invoke('save-settings', {
        ...currentConfig,
        lastNickname: nickname,
        lastVersion: selectedVersion
      });
      localStorage.setItem('selected-game-version', selectedVersion);
    };
    const timer = setTimeout(saveData, 500);
    return () => clearTimeout(timer);
  }, [nickname, selectedVersion, settingsLoaded]);

  useEffect(() => {
    const applyTheme = async () => {
      const config = await window.ipcRenderer.invoke('get-settings');
      if (config?.theme) {
        document.body.setAttribute('data-theme', config.theme);
      }
    };
    applyTheme();
  }, []);

  useEffect(() => {
    const handleProgress = (_: any, value: any) => {
      if (!value) setProgress(null);
      else setProgress({
        percent: value.percent || 0,
        current: String(value.current || "0"),
        total: String(value.total || "0"),
        isChecking: value.isChecking || false
      });
    };
    const handleStatus = (_: any, text: string) => setStatusText(text);
    const handleError = (_: any, error: any) => {
      stopLaunching();
      setStatusText('Ошибка запуска');
      alert(`Ошибка: ${error}`);
    };
    const handleVersionDownloaded = (_: any, downloadedId: string) => {
      setVersions(prev => prev.map(v => v.id === downloadedId ? { ...v, isDownloaded: true } : v));
      stopLaunching();
    };

    window.ipcRenderer.on('download-progress', handleProgress);
    window.ipcRenderer.on('launch-status', handleStatus);
    window.ipcRenderer.on('launch-error', handleError);
    window.ipcRenderer.on('version-downloaded', handleVersionDownloaded);
    window.ipcRenderer.on('game-closed', stopLaunching);

    return () => {
      window.ipcRenderer.removeListener('download-progress', handleProgress);
      window.ipcRenderer.removeListener('launch-status', handleStatus);
      window.ipcRenderer.removeListener('launch-error', handleError);
      window.ipcRenderer.removeListener('version-downloaded', handleVersionDownloaded);
      window.ipcRenderer.removeListener('game-closed', stopLaunching);
    };
  }, [stopLaunching]);

    const handleLoginSuccess = (name: string, provider: 'internal' | 'ely' | 'microsoft', token?: string) => {
    setActiveAccount({ nickname: name, provider, token });
    setNickname(name);
    if (provider !== 'microsoft') {
      setAuthProvider(provider as 'internal' | 'ely');
      localStorage.setItem('auth-provider', provider);
    }
    if (token) setAuthToken(token);
    setActiveTab('play');
  };

    const handleSelectAccount = (name: string, hasToken: boolean, provider?: string) => {
      setActiveAccount({
        nickname: name,
        provider: hasToken ? (provider as 'internal' | 'ely' | 'microsoft') : 'offline',
        token: hasToken ? authToken || undefined : undefined
      });
      setNickname(name);
      if (provider && hasToken && provider !== 'microsoft') {
        setAuthProvider(provider as 'internal' | 'ely');
        localStorage.setItem('auth-provider', provider);
      }
    };

  const handleLaunch = () => {
    setIsLaunching(true);
    
    const currentVersion = versions.find((v: any) => v.id === selectedVersion);
    const isInstance = (currentVersion as any)?.instanceId;

    setStatusText(isDownloaded ? 'Starting game...' : 'Downloading files...');
    
    window.ipcRenderer.send('launch-game', {
      nickname,
      version: selectedVersion,
      instanceId: isInstance ? selectedVersion : undefined, // id инстанса = id версии
      authProvider,
      token: authToken
    });
  };

  

  const openFolder = () => window.ipcRenderer.send('open-game-folder');

  const handleResetVersion: () => Promise<void> = async () => {
    if (!selectedVersion) return;
    if (window.confirm(`Вы уверены, что хотите переустановить ${selectedVersion}?`)) {
      const result = await window.ipcRenderer.invoke('reset-version', selectedVersion);
      if (result.success) {
        fetchVersions();
        alert('Версия успешно удалена.');
      }
    }
  };

  // Навигационные табы
  const navTabs: { id: Tab; label: string; icon: React.ReactNode; showDot?: boolean }[] = [
    { id: 'play',     label: 'Играть',    icon: Icons.play },
    { id: 'content',  label: 'Контент',   icon: Icons.content }, // НОВАЯ КНОПКА
    { id: 'profile',  label: 'Профиль',   icon: Icons.profile },
    { id: 'chat',     label: 'Чат',       icon: Icons.chat, showDot: hasMention },
    { id: 'settings', label: 'Настройки', icon: Icons.settings },
    { id: 'auth',     label: 'Аккаунты',  icon: Icons.auth },
  ];

  return (
   <div className="h-screen w-full flex flex-col overflow-hidden border shadow-2xl" 
     style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
      
  {/* TITLEBAR — drag region */}
  <TitleBar />

  {/* ОСНОВНОЙ LAYOUT */}
  <div className="flex-1 flex overflow-hidden">

    {/* SIDEBAR */}
    <aside className="w-[60px] border-r flex flex-col items-center py-4 gap-1 flex-shrink-0 z-50"
           style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
      {navTabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            if (tab.id === 'chat') setHasMention(false);
          }}
          title={tab.label}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all group
            ${activeTab === tab.id
              ? 'bg-[var(--color-brand-dim)] text-[var(--color-brand)]'
              : 'opacity-30 hover:opacity-100 hover:bg-[var(--color-bg-elevated)]'
            }`}
        >
          {tab.showDot && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            </span>
          )}
          {tab.icon}
          {/* Tooltip */}
          <span className="absolute left-14 border text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[999] shadow-xl"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
            {tab.label}
          </span>
        </button>
      ))}

      <div className="flex-1" />

      {/* Аватар текущего игрока */}
      <button
        onClick={() => setActiveTab('profile')}
        className="w-8 h-8 rounded-lg overflow-hidden border transition-all mb-1 active:scale-90"
        style={{ borderColor: activeTab === 'profile' ? 'var(--color-brand)' : 'var(--color-border)' }}
        title={nickname || 'Профиль'}
      >
        {nickname && nickname.trim() !== '' ? (
          <SkinHead
            nickname={nickname}
            provider={activeAccount.provider !== 'offline' ? activeAccount.provider : undefined}
            size={32}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20" style={{ backgroundColor: 'var(--color-text)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </button>
    </aside>

    {/* КОНТЕНТ */}
    <div className="flex-1 flex flex-col overflow-hidden relative">

      {/* Фон только для play */}
      {activeTab === 'play' && (
        <div className="absolute inset-0 z-0">
          <BackgroundCarousel images={bgImages} interval={10000} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>
      )}

      {/* Контент вкладок */}
      <div className="flex-1 relative z-10 overflow-hidden">

        {activeTab === 'play' && (
  <div className="h-full flex">
    {/* Пустое пространство слева, чтобы арт было видно */}
    <div className="flex-1" />

    {/* Контейнер списка серверов */}
    <div className="w-[440px] h-full flex flex-col items-center justify-start p-5 pt-10 animate-in fade-in slide-in-from-right-5 duration-500">
      
      {/* Удаляем overflow-hidden, чтобы кнопка "Играть" могла вылетать влево.
          Удаляем жесткий фон, так как он теперь внутри ServerList и его айтемов.
      */}
      <div className="w-full relative">
        <ServerList />
      </div>

    </div>
  </div>
)}

        {/* Универсальная обертка для страниц (Profile, Settings, Auth, Content) */}
        {['profile', 'settings', 'auth', 'content'].includes(activeTab) && (
          <div className="h-full flex justify-center items-center animate-in zoom-in-95 duration-300"
               style={{ backgroundColor: 'var(--color-bg)' }}>
            {activeTab === 'profile' && <ProfilePage account={activeAccount} onGoToAuth={() => setActiveTab('auth')} />}
            {activeTab === 'settings' && <SettingsPage />}
            {activeTab === 'auth' && <AuthPage onLoginSuccess={handleLoginSuccess} />}
            {activeTab === 'content' && <ContentPage nickname={nickname} />}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-full flex flex-col animate-in fade-in duration-200" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Глобальный чат</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <GlobalChat currentUser={nickname} isChatOpen={true} onMention={() => {}} />
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <LaunchProgress progress={progress} statusText={statusText} />
      <Footer
        nickname={nickname}
        setNickname={setNickname}
        onSelectAccount={handleSelectAccount}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
        progress={progress}
        versions={versions}
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
        isDownloaded={isDownloaded ?? false}
        isLaunching={isLaunching ?? false}
        handleLaunch={handleLaunch}
        handleResetVersion={handleResetVersion}
        openFolder={openFolder}
      />
    </div>
  </div>
</div>
  );
}

export default App;