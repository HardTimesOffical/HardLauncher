import { useState, useEffect, useCallback } from 'react'
import LaunchProgress from './components/LaunchProgress';
import TitleBar from './components/TitleBar';
import ServerList from './components/ServerList';
import BackgroundCarousel from './components/BackgroundCarousel';
import SettingsPage from './pages/settings';
import GlobalChat from './components/GlobalChat';
import Footer from './components/Footer';

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
}

interface ProgressData {
  percent: number;
  current: string;
  total: string;
  isChecking?: boolean; // Добавили это поле
}

function App() {
  const [activeTab, setActiveTab] = useState<'play' | 'settings'>('play');
  const [nickname, setNickname] = useState('HardPlayer_01');
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [statusText, setStatusText] = useState('Загрузка файлов...');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>(() => {
    return localStorage.getItem('selected-game-version') || '1.21.1';
  });
  const [hasMention, setHasMention] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const currentVersionObj = versions.find(v => v.id === selectedVersion);
  const isDownloaded = currentVersionObj?.isDownloaded;

  const bgImages = [
    'https://cdna.artstation.com/p/assets/images/images/042/400/684/large/mariana-salimena-swamp-artstation.jpg?1634406914',
    'https://cdnb.artstation.com/p/assets/images/images/042/400/679/large/mariana-salimena-birch-forest-artstation.jpg?1634406904',
    'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack-1.jpg',
    'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack.jpg',
    'https://cdna.artstation.com/p/assets/images/images/042/400/690/large/mariana-salimena-swamp-b-artstation.jpg?1634406924'
  ];

  // --- ЛОГИКА УВЕДОМЛЕНИЙ ---
  const handleMention = useCallback(() => {
    if (!isChatOpen) setHasMention(true);
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen) setHasMention(false);
  }, [isChatOpen]);

  // --- ЛОГИКА ЗАПУСКА И ВЕРСИЙ ---
  const stopLaunching = useCallback(() => {
    setIsLaunching(false);
    setProgress(null);
  }, []);

  const fetchVersions = useCallback(async () => {
    try {
      const data = await window.ipcRenderer.invoke('get-versions');
      setVersions(data || []);
      const savedVersion = localStorage.getItem('selected-game-version');
      const exists = data.find((v: GameVersion) => v.id === savedVersion);
      if (savedVersion && exists) setSelectedVersion(savedVersion);
      else if (data.length > 0) setSelectedVersion(data[0].id);
    } catch (err) {
      console.error("Failed to fetch versions:", err);
    }
  }, []);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  useEffect(() => {
  const loadSavedData = async () => {
    const config = await window.ipcRenderer.invoke('get-settings');
    if (config.lastNickname) setNickname(config.lastNickname);
    if (config.lastVersion) setSelectedVersion(config.lastVersion);
  };
  loadSavedData();
}, []);

// 2. Авто-сохранение при изменении
useEffect(() => {
  const saveData = async () => {
    const currentConfig = await window.ipcRenderer.invoke('get-settings');
    await window.ipcRenderer.invoke('save-settings', {
      ...currentConfig,
      lastNickname: nickname,
      lastVersion: selectedVersion
    });
  };
  
  // Сохраняем с небольшой задержкой (debounce), чтобы не мучить диск при каждом символе
  const timer = setTimeout(saveData, 500);
  return () => clearTimeout(timer);
}, [nickname, selectedVersion]);

  // --- ПОДПИСКИ НА IPC (Вынесено в отдельный эффект) ---
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

  // --- ОБРАБОТЧИКИ КНОПОК ---
  const handleLaunch = () => {
    setIsLaunching(true);
    setStatusText(isDownloaded ? 'Starting game...' : 'Downloading files...');
    window.ipcRenderer.send('launch-game', { nickname, version: selectedVersion });
  };

  const openFolder = () => window.ipcRenderer.send('open-game-folder');

  const handleResetVersion = async () => {
    if (!selectedVersion) return;
    if (window.confirm(`Вы уверены, что хотите переустановить ${selectedVersion}?`)) {
      const result = await window.ipcRenderer.invoke('reset-version', selectedVersion);
      if (result.success) {
        fetchVersions();
        alert('Версия успешно удалена.');
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-slate-200 flex flex-col overflow-hidden font-sans border border-white/5 shadow-2xl relative">
      
      {/* 1. TITLEBAR */}
      <TitleBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 relative flex overflow-hidden">
        
        {/* 2. ОБЩИЙ ФОН */}
        <BackgroundCarousel images={bgImages} interval={10000} />

        {/* --- НОВАЯ СЕКЦИЯ ЧАТА --- */}
        {/* Кнопка открытия чата (слева посередине) */}
     <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`absolute top-1/2 -translate-y-1/2 z-[60] 
            bg-[#0b0f1a]/60 backdrop-blur-md border border-white/10 p-2.5
            hover:bg-[#00ff95]/10 hover:border-[#00ff95]/30 
            transition-all duration-500 ease-in-out group
            ${isChatOpen ? 'left-[300px]' : 'left-0'}`}
          style={{ borderRadius: '0 12px 12px 0' }}
        >
          {/* КРАСНАЯ ТОЧКА */}
          {!isChatOpen && hasMention && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className={`absolute w-5 h-5 transition-all duration-500 ${isChatOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 text-white/60 group-hover:text-[#00ff95]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <svg className={`absolute w-5 h-5 transition-all duration-500 ${isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 text-[#00ff95]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        {/* Выезжающая панель чата */}
        <aside 
          className={`absolute left-0 top-0 bottom-0 z-[55] w-[300px] 
            bg-[#0b0f1a]/40 backdrop-blur-md border-r border-white/10 
            transition-transform duration-500 ease-in-out shadow-2xl ${
            isChatOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <GlobalChat 
            currentUser={nickname} 
            isChatOpen={isChatOpen} 
            onMention={handleMention} 
          />
        </aside>
        {/* ------------------------- */}

        {/* 3. КОНТЕНТ В ЗАВИСИМОСТИ ОТ ВКЛАДКИ */}
        <main className={`flex-1 flex transition-all duration-500 ${isChatOpen ? 'ml-[300px]' : 'ml-0'}`}>
          {activeTab === 'play' ? (
            <>
              {/* ЛЕВАЯ ЧАСТЬ: Пустое пространство (теперь оно уменьшается при чате) */}
              <div className="flex-1 relative z-20 pointer-events-none" />

              {/* ПРАВАЯ ЧАСТЬ: Список серверов */}
              <div className="w-[550px] flex flex-col items-center justify-start p-4 z-30 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="w-full backdrop-blur-md border border-[#333333] shadow-2xl overflow-hidden h-fit flex flex-col">
                  <ServerList />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 z-30 flex justify-center items-center p-8">
               <SettingsPage />
            </div>
          )}
        </main>
      </div>

      {/* 4. ПРОГРЕСС ЗАГРУЗКИ */}
      <LaunchProgress progress={progress} statusText={statusText} />

      {/* 5. FOOTER */}
     <Footer 
  nickname={nickname}
  setNickname={setNickname}
  progress={progress}
  versions={versions}
  selectedVersion={selectedVersion}
  setSelectedVersion={setSelectedVersion}
  isDownloaded={!!isDownloaded}
  isLaunching={isLaunching}
  handleLaunch={handleLaunch}
  handleResetVersion={handleResetVersion}
  openFolder={openFolder}
/>
    </div>
  );
}

export default App