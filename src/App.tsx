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

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
}

interface ProgressData {
  percent: number;
  current: string;
  total: string;
  isChecking?: boolean;
}

interface ActiveAccount {
  nickname: string;
  provider: 'internal' | 'ely' | 'offline';
  token?: string;
}

type AuthProvider = 'internal' | 'ely';
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
    'https://cdna.artstation.com/p/assets/images/images/042/400/684/large/mariana-salimena-swamp-artstation.jpg?1634406914',
    'https://cdnb.artstation.com/p/assets/images/images/042/400/679/large/mariana-salimena-birch-forest-artstation.jpg?1634406904',
    'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack-1.jpg',
    'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack.jpg',
    'https://cdna.artstation.com/p/assets/images/images/042/400/690/large/mariana-salimena-swamp-b-artstation.jpg?1634406924'
  ];


  const stopLaunching = useCallback(() => {
    setIsLaunching(false);
    setProgress(null);
  }, []);

 const fetchVersions = useCallback(async () => {
  try {
    const data = await window.ipcRenderer.invoke('get-versions');
    setVersions(data || []);
    } catch (err) {
      console.error("Failed to fetch versions:", err);
    }
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
      console.log("Обновление списка версий...");
      const data = await window.ipcRenderer.invoke('get-versions');
      setVersions(data || []);
    };

  // Подписываемся
  window.ipcRenderer.on('filters-changed', handleRefresh);

  // Очистка при размонтировании
  return () => {
      if (window.ipcRenderer.removeListener) {
        window.ipcRenderer.removeListener('filters-changed', handleRefresh);
      }
    };
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

  const handleLoginSuccess = (name: string, provider: AuthProvider, token?: string) => {
    setActiveAccount({ nickname: name, provider, token });
    setNickname(name);
    setAuthProvider(provider);
    if (token) setAuthToken(token);
    localStorage.setItem('auth-provider', provider);
    setActiveTab('play');
  };

  const handleSelectAccount = (name: string, hasToken: boolean, provider?: string) => {
    setActiveAccount({
      nickname: name,
      provider: hasToken ? (provider as 'internal' | 'ely') : 'offline',
      token: hasToken ? authToken || undefined : undefined
    });
    setNickname(name);
    if (provider && hasToken) {
      setAuthProvider(provider as AuthProvider);
      localStorage.setItem('auth-provider', provider);
    }
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    setStatusText(isDownloaded ? 'Starting game...' : 'Downloading files...');
    window.ipcRenderer.send('launch-game', {
      nickname,
      version: selectedVersion,
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
    <div className="h-screen w-full bg-[#0f0f0f] text-white flex flex-col overflow-hidden border border-white/5 shadow-2xl">
      
      {/* TITLEBAR — drag region */}
      <div 
        className="h-9 bg-[#0a0a0a] flex items-center justify-between px-4 border-b border-white/5 flex-shrink-0"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff95] shadow-[0_0_6px_#00ff95]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Hard Times</span>
        </div>
        <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button
            onClick={() => window.ipcRenderer.send('window-control', 'minimize')}
            className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded transition-all"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={() => window.ipcRenderer.send('window-control', 'close')}
            className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ОСНОВНОЙ LAYOUT */}
      <div className="flex-1 flex overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-[60px] bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-4 gap-1 flex-shrink-0 z-50">
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
                  ? 'bg-[#00ff95]/15 text-[#00ff95]'
                  : 'text-white/25 hover:text-white/70 hover:bg-white/5'
                }`}
            >
              {tab.showDot && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 flex">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                </span>
              )}
              {tab.icon}
              {/* Tooltip */}
              <span className="absolute left-14 bg-[#1a1a1a] border border-white/10 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[999]">
                {tab.label}
              </span>
            </button>
          ))}

          {/* Разделитель */}
          <div className="flex-1" />

         {/* Аватар текущего игрока */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 hover:border-[#1bd96a]/50 transition-all mb-1"
          title={nickname || 'Профиль'}
        >
          {nickname && nickname.trim() !== '' ? (
            <SkinHead
              nickname={nickname}
              provider={activeAccount.provider !== 'offline' ? activeAccount.provider : undefined}
              size={32}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-white/[0.05] flex items-center justify-center">
              <svg className="w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
            </div>
          )}

          {/* Контент вкладок */}
          <div className="flex-1 relative z-10 overflow-hidden">

            {activeTab === 'play' && (
              <div className="h-full flex">
                <div className="flex-1" />
                <div className="w-[520px] h-full flex flex-col items-center justify-start p-5 animate-in fade-in slide-in-from-right-5 duration-300">
                  <div className="w-full backdrop-blur-md bg-black/20 border border-white/10 shadow-2xl overflow-hidden">
                    <ServerList />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="h-full flex justify-center items-center p-8 animate-in zoom-in-95 duration-300 bg-[#0f0f0f]">
                <ProfilePage account={activeAccount} />
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="h-full flex flex-col bg-[#0f0f0f] animate-in fade-in duration-200">
                <div className="px-6 py-4 border-b border-white/5">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">Глобальный чат</h2>
                </div>
                <div className="flex-1 overflow-hidden">
                  <GlobalChat currentUser={nickname} isChatOpen={true} onMention={() => {}} />
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="h-full flex justify-center items-center p-8 animate-in zoom-in-95 duration-300 bg-[#0f0f0f]">
                <SettingsPage />
              </div>
            )}

            {activeTab === 'auth' && (
              <div className="h-full flex justify-center items-center p-8 animate-in zoom-in-95 duration-300 bg-[#0f0f0f]">
                <AuthPage onLoginSuccess={handleLoginSuccess} />
              </div>
            )}

            {activeTab === 'content' && (
              <div className="h-full bg-[#0f0f0f]">
                <ContentPage />
              </div>
            )}
          </div>

          {/* FOOTER */}
          {/* FOOTER */}
          <LaunchProgress progress={progress} statusText={statusText} />
            <Footer
              nickname={nickname}
              setNickname={setNickname}
              onSelectAccount={handleSelectAccount}
              onTabChange={(tab) => setActiveTab(tab as Tab)}
              progress={progress}
              versions={versions} // ПЕРЕДАЕМ НАПРЯМУЮ versions
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