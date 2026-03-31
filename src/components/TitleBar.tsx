import React from 'react';

const TitleBar: React.FC = () => {
  
  const controlWindow = (action: 'minimize' | 'maximize' | 'close') => {
    // @ts-ignore
    window.ipcRenderer?.send('window-control', action);
  };

  return (
    <header 
      className="h-8 bg-[var(--color-bg)] flex items-center justify-between border-b border-[var(--color-border-accent)] flex-shrink-0 select-none relative z-[100]"
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      {/* ЛЕВАЯ ЧАСТЬ: Лого и Статус в стиле Синегорск */}
      <div className="flex items-center px-4 h-full gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-text)] opacity-90 font-mono">
          HARDLAUNCHER
        </span>
        
        {/* Статус: Используем warn цвет (песочный/оранжевый), без скруглений */}
        <div className="flex items-center self-center bg-[var(--color-bg-subtle)] border border-[var(--color-warn)]/30 px-2 py-0.5 h-[18px]">
          <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--color-warn)] select-none">
            В стадии разработки v1.0.12
          </span>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Кнопки управления (квадратные и строгие) */}
      <div className="flex items-center h-full no-drag" style={{ WebkitAppRegion: 'no-drag' } as any}>
        {/* Свернуть */}
        <button
          onClick={() => controlWindow('minimize')}
          className="w-10 h-full flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)] transition-colors"
        >
          <svg width="10" height="1" viewBox="0 0 10 1">
            <path d="M0 0h10v1H0z" fill="currentColor"/>
          </svg>
        </button>

        {/* Развернуть */}
        <button
          onClick={() => controlWindow('maximize')}
          className="w-10 h-full flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)] transition-colors"
        >
          <svg width="9" height="9" viewBox="0 0 10 10">
            <path d="M0 0v10h10V0H0zm9 9H1V1h8v8z" fill="currentColor"/>
          </svg>
        </button>

        {/* Закрыть — Красный приглушенный, в стиле темы */}
        <button
          onClick={() => controlWindow('close')}
          className="w-12 h-full flex items-center justify-center text-[var(--color-text-dim)] hover:text-white hover:bg-[var(--color-danger)] transition-colors"
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