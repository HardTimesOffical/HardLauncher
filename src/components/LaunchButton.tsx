import React from 'react';

interface ProgressData {
  percent: number;
  current: string | number;
  total: string | number;
  isChecking?: boolean;
  unit?: string;
}

interface LaunchButtonProps {
  progress: ProgressData | null;
  isDownloaded: boolean;
  isLaunching: boolean;
  onLaunch: () => void;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({ progress, isDownloaded, isLaunching, onLaunch }) => {
  
  const getButtonState = () => {
    if (progress !== null) return 'downloading';
    if (isLaunching) return 'launching';
    if (isDownloaded) return 'play';
    return 'install';
  };

  const state = getButtonState();
  const isDisabled = state === 'downloading' || state === 'launching';

  const subText = React.useMemo(() => {
    if (progress !== null) {
      if (progress.isChecking || !progress.total || progress.total === "0.0") return "Проверка...";
      return `${progress.current}/${progress.total}`;
    }
    if (isLaunching) return "Синхронизация...";
    if (isDownloaded) return "Готов к работе";
    return "Доступно обновление";
  }, [progress, isLaunching, isDownloaded]);

  // СТИЛЬ СИНЕГОРСК: Оливковый, "Милитари", объемные пиксельные границы
  const buttonStyle = {
    play: `
      bg-[var(--color-brand)] text-black 
      border-t-2 border-l-2 border-white/40 
      border-b-[3px] border-r-[3px] border-black/40
      shadow-[0_0_15px_var(--color-brand-glow)]
      hover:brightness-110 active:border-t-[3px] active:border-l-[3px] active:border-b-0 active:border-r-0 active:translate-y-[1px]
    `,
    install: `
      bg-[var(--color-bg-subtle)] text-[var(--color-text)]
      border-t-2 border-l-2 border-white/10 
      border-b-[3px] border-r-[3px] border-black/60
      hover:bg-[#252826] active:border-t-[3px] active:border-l-[3px] active:border-b-0 active:border-r-0 active:translate-y-[1px]
    `,
    disabled: `
      bg-[#121413] text-[var(--color-text-dim)]
      border border-white/5 opacity-80
    `
  }[isDisabled ? 'disabled' : (state === 'play' ? 'play' : 'install')];

  return (
    <button
      disabled={isDisabled}
      onClick={onLaunch}
      className={`
        group relative overflow-hidden rounded-none transition-all duration-75 flex-shrink-0
        ${buttonStyle}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Прогресс-бар: теперь более контрастный на темном фоне */}
      {progress !== null && (
        <div
          className="absolute inset-y-0 left-0 bg-white/15 transition-all duration-300 ease-out z-0 backdrop-blur-[2px]"
          style={{ width: `${progress.percent}%` }}
        />
      )}

      {/* Контент кнопки */}
      <div className="relative z-10 h-10 px-4 flex items-center gap-3 min-w-[200px]">
        
        {/* Иконка */}
        <div className="flex-shrink-0">
          {isDisabled ? (
            <svg className="w-4 h-4 animate-spin text-[var(--color-brand)]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill={state === 'play' ? "black" : "none"} viewBox="0 0 24 24" stroke={state === 'play' ? "black" : "var(--color-brand)"}>
              {state === 'play' ? (
                <path d="M8 5v14l11-7z" />
              ) : (
                <path strokeLinecap="square"  strokeWidth={2.5} d="M12 15l-4-4h3V4h2v7h3l-4 4zM5 18v2h14v-2H5z" />
              )}
            </svg>
          )}
        </div>

        {/* Текст */}
        <div className="flex flex-col items-start text-left leading-none uppercase">
          <span className={`text-[11px] font-[900] tracking-widest ${state === 'play' ? 'text-black' : 'text-[var(--color-text)]'}`}>
            {state === 'downloading' ? 'Загрузка' :
             state === 'launching'   ? 'Запуск' :
             state === 'play'        ? 'В ИГРУ' : 'ОБНОВИТЬ'}
          </span>
          <span className={`text-[8px] mt-0.5 font-bold tracking-[0.1em] ${state === 'play' ? 'text-black/50' : 'text-[var(--color-brand)] opacity-80'}`}>
            {subText}
          </span>
        </div>

        {/* Процент */}
        <div className={`ml-auto text-[10px] font-mono font-black ${state === 'play' ? 'text-black/30' : 'text-[var(--color-brand)] opacity-40'}`}>
           {progress !== null ? `${Math.round(progress.percent)}%` : '>>'}
        </div>
      </div>
    </button>
  );
};

export default LaunchButton;