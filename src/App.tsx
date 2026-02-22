import { useState, useEffect } from 'react'
import VersionSelect from "./components/VersionSelect"
import LaunchProgress from './components/LaunchProgress';
import TitleBar from './components/TitleBar';
import LaunchButton from './components/LaunchButton';
import ServerList from './components/ServerList';
import BackgroundCarousel from './components/BackgroundCarousel';

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
  const [nickname, setNickname] = useState('HardPlayer_01')
 const [progress, setProgress] = useState<ProgressData | null>(null);
  const [statusText, setStatusText] = useState('Загрузка файлов...');
  const [versions, setVersions] = useState<GameVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string>(() => {
  return localStorage.getItem('selected-game-version') || '1.21.1'; 
});
  const currentVersionObj = versions.find(v => v.id === selectedVersion);
  const isDownloaded = currentVersionObj?.isDownloaded;
  const openFolder = () => {
  window.ipcRenderer.send('open-game-folder');
};

  const bgImages = [
  'https://cdna.artstation.com/p/assets/images/images/042/400/684/large/mariana-salimena-swamp-artstation.jpg?1634406914',
  'https://cdnb.artstation.com/p/assets/images/images/042/400/679/large/mariana-salimena-birch-forest-artstation.jpg?1634406904',
  'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack-1.jpg',
  'https://resourcepack.net/fl/images/2020/03/Bare-Bones-Resource-Pack.jpg',
  'https://cdna.artstation.com/p/assets/images/images/042/400/690/large/mariana-salimena-swamp-b-artstation.jpg?1634406924'
];


useEffect(() => {
  const fetchVersions = async () => {
    try {
      const data = await window.ipcRenderer.invoke('get-versions');
      setVersions(data);
      
      // Находим сохраненную версию
      const savedVersion = localStorage.getItem('selected-game-version');
      
      // ПРОВЕРКА: Если есть сохраненная И она существует в пришедшем списке данных
      const exists = data.find((v: GameVersion) => v.id === savedVersion);

      if (savedVersion && exists) {
        setSelectedVersion(savedVersion);
      } else if (data.length > 0) {
        // Если сохранения нет или версия больше недоступна, берем первую
        setSelectedVersion(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch versions:", err);
    }
  };

  fetchVersions();

const handleProgress = (_event: any, value: any) => {
  if (value === null || value === undefined) {
    setProgress(null);
    return;
  }

  if (typeof value === 'object') {
    setProgress({
      percent: value.percent || 0,
      current: value.current || "0.0", // Если undefined, ставим 0.0
      total: value.total || "0.0"
    });
  }
};


  const handleDownloaded = (_event: any, downloadedId: string) => {
    setVersions(prev => prev.map(v => 
      v.id === downloadedId ? { ...v, isDownloaded: true } : v
    ));
  };

  const handleVersionDownloaded = (_event: any, downloadedId: string) => {
    setVersions(prev => prev.map(v => 
      v.id === downloadedId ? { ...v, isDownloaded: true } : v
    ));
    setProgress(null);
    setIsLaunching(false); // <--- ДОБАВИТЬ ЭТО
  };

    window.ipcRenderer.on('version-downloaded', handleDownloaded);


 const handleStatus = (_event: any, text: string) => {
    setStatusText(text);
    // Убрали строку setProgress(0), чтобы она не затирала прогресс
  }
  const handleError = (_event: any, error: any) => {
    setProgress(null);
    setStatusText('Launch Error');
    if (!error.toString().includes('Debug:')) {
      alert(`Ошибка: ${error}`);
      setIsLaunching(false)
    }
  };


  window.ipcRenderer.on('download-progress', handleProgress)
  window.ipcRenderer.on('launch-status', handleStatus) // Слушаем статусы (текст)
  window.ipcRenderer.on('launch-error', handleError)
  window.ipcRenderer.on('version-downloaded', handleVersionDownloaded);

  return () => {
    window.ipcRenderer.removeListener('download-progress', handleProgress)
    window.ipcRenderer.removeListener('launch-status', handleStatus)
    window.ipcRenderer.removeListener('launch-error', handleError)
    window.ipcRenderer.removeListener('version-downloaded', handleDownloaded)
    window.ipcRenderer.removeListener('version-downloaded', handleVersionDownloaded)
  }
}, []);

 const [isLaunching, setIsLaunching] = useState(false);

const handleLaunch = () => {
    setIsLaunching(true);
    setStatusText(isDownloaded ? 'Starting game...' : 'Downloading files...');
    window.ipcRenderer.send('launch-game', { nickname, version: selectedVersion });
};

const handleResetVersion = async () => {
  if (!selectedVersion) return;
  
  const confirm = window.confirm(`Вы уверены, что хотите полностью переустановить ${selectedVersion}? Все файлы версии будут удалены.`);
  
  if (confirm) {
    const result = await window.electron.ipcRenderer.invoke('reset-version', selectedVersion);
    if (result.success) {
      // Обновляем список версий, чтобы кнопка Launch снова стала "Download"
      const updatedVersions = await window.electron.ipcRenderer.invoke('get-versions');
      setVersions(updatedVersions);
      alert('Версия успешно удалена. Теперь вы можете скачать её заново.');
    } else {
      alert('Ошибка при удалении: ' + result.error);
    }
  }
};

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-slate-200 flex flex-col overflow-hidden font-sans border border-white/5  shadow-2xl relative">
      
      {/* DRAG REGION */}
      <TitleBar />

     <div className="flex-1 relative flex overflow-hidden">
  
  {/* 1. ОБЩИЙ ФОН: Теперь он под всем контентом */}
  <BackgroundCarousel images={bgImages} interval={12000} />

  {/* 2. ЛЕВАЯ ЧАСТЬ: Заголовок (по центру оставшегося места) */}
  <div className="flex-1 relative z-20 flex items-center justify-center pointer-events-none">
  </div>

  {/* 3. ПРАВАЯ ЧАСТЬ: Модальный блок рейтинга */}
  <div className="w-[550px] flex flex-col items-center justify-start p-4 z-30">

    {/* Квадратный умеренный блок как на скриншоте */}
    <div className="w-full  backdrop-blur-md border border-[#333333] shadow-2xl overflow-hidden h-fit flex flex-col">
      <ServerList />
      
    </div>
  </div>
</div>
    <LaunchProgress progress={progress} statusText={statusText} />
   <footer className="relative z-50 h-20 bg-[#060606]/95 backdrop-blur-xl border-t border-white/10 flex items-center px-8 justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
  
  <div className="flex gap-10 items-center">
    
    {/* ACCOUNT BLOCK */}
    <div className="flex flex-col gap-1">
      <span className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em]" 
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
        Login
      </span>
      <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-sm px-3 h-10 group hover:border-[#00ff95]/40 transition-all">
        <div className={`w-1.5 h-1.5 rounded-full ${nickname ? 'bg-[#00ff95] shadow-[0_0_8px_#00ff95]' : 'bg-red-500 animate-pulse'}`} />
        <input 
          type="text" 
          disabled={progress !== null}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="bg-transparent text-[11px] text-white/80 focus:outline-none w-28 placeholder:text-white/10 uppercase tracking-wider"
          style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
          placeholder="Имя"
        />
      </div>
    </div>

    {/* VERSION SELECT BLOCK */}
   {/* VERSION SELECT BLOCK */}
<div className="flex flex-col gap-1">
  <div className="flex items-center justify-between w-full">
    <span className="text-[8px] uppercase font-bold text-white/30 mr-5 tracking-[0.2em]"
          style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
      Версия игры
    </span>
    
    {/* КНОПКА ПЕРЕЗАГРУЗКИ (теперь доступна всегда при выборе версии) */}
    {selectedVersion && !progress && (
      <button 
        onClick={handleResetVersion}
        className="flex items-center gap-1 group transition-all"
        title="Force Clear Version Data"
      >
        <span className="text-[7px] text-white/20 group-hover:text-orange-500 uppercase tracking-tighter transition-colors"
              style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
          Переустановить
        </span>
        <svg 
          className="w-2 h-2 text-white/20 group-hover:text-orange-500 group-hover:rotate-180 transition-all duration-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    )}
  </div>
  
  <div className="h-10">
    <VersionSelect 
      versions={versions}
      selected={selectedVersion}
      onSelect={setSelectedVersion}
      disabled={progress !== null}
    />
  </div>
</div>

    {/* SEPARATOR */}
    <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

    {/* DIRECTORY & STATUS */}
    <div className="flex flex-col gap-1">
      <span className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em]"
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
        System
      </span>
      <div className="flex items-center h-10 gap-3">
        {/* КНОПКА ПАПКИ - ПИКСЕЛЬНАЯ */}
        <button 
          onClick={openFolder}
          title="Open game directory"
          className="h-10 w-10 flex items-center justify-center rounded-sm bg-white/[0.03] border border-white/10 text-white/40 hover:text-[#00ff95] hover:bg-[#00ff95]/5 hover:border-[#00ff95]/30 transition-all group"
        >
          <svg className="w-4 h-4 group-active:scale-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 7v10h18V9h-8l-2-2H3z" />
          </svg>
        </button>

        <div className="flex flex-col">
           <span className="text-[9px] text-[#00ff95]/80 uppercase leading-none"
                 style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            {selectedVersion ? `${selectedVersion}` : 'No version'}
          </span>
          <span className="text-[7px] text-white/20 uppercase tracking-tighter">
            Directory Linked
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Кнопка запуска */}
  <div className="scale-90 transform origin-right">
    <LaunchButton 
      progress={progress} 
      isDownloaded={!!isDownloaded} 
      isLaunching={isLaunching} 
      onLaunch={handleLaunch} 
    />
  </div>
</footer>
    </div>
  )
}

export default App