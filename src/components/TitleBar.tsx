import React from 'react';

const TitleBar: React.FC = () => {
  
  const controlWindow = (action: 'minimize' | 'maximize' | 'close') => {
    // @ts-ignore
    window.ipcRenderer?.send('window-control', action);
  };

  return (
    <header 
      className="h-8 bg-[var(--color-bg-base,#0a0a0a)] flex items-center justify-between border-b border-white/5 flex-shrink-0 select-none relative z-[100]"
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      {/* ЛЕВАЯ ЧАСТЬ: Лого и Статус */}
      <div className="flex items-center px-4 h-full gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-text,#ffffff)] opacity-90">
          HardLauncher
        </span>
        
        {/* Статус: Используем янтарный, который хорошо сочетается с темными темами */}
        <span className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-amber-500/90 italic select-none bg-amber-950/40 px-1.5 py-0.5 rounded-sm border border-amber-900/50">
          В разработке v1.0.6
        </span>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Кнопки управления */}
      <div className="flex items-center h-full no-drag" style={{ WebkitAppRegion: 'no-drag' } as any}>
        {/* Свернуть */}
        <button
          onClick={() => controlWindow('minimize')}
          className="w-10 h-full flex items-center justify-center text-[var(--color-text-dim,rgba(255,255,255,0.2))] hover:text-[var(--color-text,#fff)] hover:bg-white/5 transition-colors"
        >
          <svg width="10" height="1" viewBox="0 0 10 1">
            <path d="M0 0h10v1H0z" fill="currentColor"/>
          </svg>
        </button>

        {/* Развернуть / Во весь экран (ТЕПЕРЬ РАБОЧАЯ) */}
        <button
          onClick={() => controlWindow('maximize')}
          className="w-10 h-full flex items-center justify-center text-[var(--color-text-dim,rgba(255,255,255,0.2))] hover:text-[var(--color-text,#fff)] hover:bg-white/5 transition-colors"
        >
          <svg width="9" height="9" viewBox="0 0 10 10">
            <path d="M0 0v10h10V0H0zm9 9H1V1h8v8z" fill="currentColor"/>
          </svg>
        </button>

        {/* Закрыть */}
        <button
          onClick={() => controlWindow('close')}
          className="w-11 h-full flex items-center justify-center text-[var(--color-text-dim,rgba(255,255,255,0.2))] hover:text-white hover:bg-[#e81123] transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M10 1L9 0 5 4 1 0 0 1l4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TitleBar;