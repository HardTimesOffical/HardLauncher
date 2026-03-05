import React from 'react';

// Добавляем 'profile' в список вкладок
type TabType = 'play' | 'profile' | 'settings' | 'auth';

interface TitleBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ activeTab, onTabChange }) => {
  const controlWindow = (action: 'minimize' | 'close') => {
    // @ts-ignore
    window.ipcRenderer?.send('window-control', action);
  };

  // Вспомогательная функция для стилей кнопок, чтобы не дублировать код
  const getBtnClass = (tab: TabType) => `
    px-5 h-full text-[10px] uppercase tracking-[0.2em] transition-all font-bold border-r border-[#333]
    ${activeTab === tab 
      ? 'text-[#00ff95] bg-[#1e1e1e] shadow-[inset_0_-2px_0_#00ff95]' 
      : 'text-[#666] hover:text-[#bbb] hover:bg-[#1a1a1a] no-drag'
    }
  `;

  return (
    <header className="relative z-[100] flex items-center justify-between h-9 bg-[#121212] border-b border-[#333] select-none">
      
      {/* DRAG REGION */}
      <div 
        className="absolute inset-0 z-0 drag-region" 
        style={{ WebkitAppRegion: 'drag' } as any} 
      />

      {/* ЛЕВАЯ ЧАСТЬ: Вкладки */}
      <nav className="relative z-10 flex h-full no-drag">
        <button
          onClick={() => onTabChange('play')}
          className={getBtnClass('play')}
        >
          Играть
        </button>

        {/* НОВАЯ ВКЛАДКА ПРОФИЛЬ */}
        <button
          onClick={() => onTabChange('profile')}
          className={getBtnClass('profile')}
        >
          Профиль
        </button>

        <button
          onClick={() => onTabChange('settings')}
          className={getBtnClass('settings')}
        >
          Настройки
        </button>

        {activeTab === 'auth' && (
          <button className={getBtnClass('auth')}>
            Авторизация
          </button>
        )}
      </nav>

      {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-[9px] text-white/10 uppercase tracking-[0.5em] font-black">
          Hard Times Launcher
        </span>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="relative z-10 flex h-full no-drag border-l border-[#333]">
        <button onClick={() => controlWindow('minimize')} className="w-10 h-full flex items-center justify-center text-[#666] hover:bg-[#1e1e1e] hover:text-white transition-colors border-r border-[#333]/30">
          <svg width="12" height="1" viewBox="0 0 12 1" fill="none"><rect width="12" height="1" fill="currentColor"/></svg>
        </button>
        <button onClick={() => controlWindow('close')} className="w-12 h-full flex items-center justify-center text-[#666] hover:bg-[#c42b1c] hover:text-white transition-colors">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
    </header>
  );
};

export default TitleBar;