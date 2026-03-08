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
    if (isLaunching) return "Запуск...";
    if (isDownloaded) return "Готово";
    return "Скачать";
  }, [progress, isLaunching, isDownloaded]);

  // СТИЛЬ MODRINTH: Острые углы и имитация объема через границы
  const buttonStyle = {
    play: `
      bg-[#1BD96A] text-[#052e16] 
      border-t-2 border-l-2 border-[#58f097] 
      border-b-[3px] border-r-[3px] border-[#128a44]
      hover:brightness-105 active:border-t-[3px] active:border-l-[3px] active:border-b-0 active:border-r-0 active:translate-y-[2px]
    `,
    install: `
      bg-[var(--color-brand)] text-white
      border-t-2 border-l-2 border-white/30 
      border-b-[3px] border-r-[3px] border-black/30
      hover:brightness-105 active:border-t-[3px] active:border-l-[3px] active:border-b-0 active:border-r-0 active:translate-y-[2px]
    `,
    disabled: `
      bg-[var(--color-bg-subtle)] text-[var(--color-text-dim)]
      border border-[var(--color-border)] opacity-60
    `
  }[isDisabled ? 'disabled' : (state === 'play' ? 'play' : 'install')];

  return (
    <button
      disabled={isDisabled}
      onClick={onLaunch}
      // rounded-none делает кнопку абсолютно прямоугольной
      className={`
        group relative overflow-hidden rounded-none transition-all duration-75 flex-shrink-0
        ${buttonStyle}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Прогресс-бар заливкой */}
      {progress !== null && (
        <div
          className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-300 ease-out"
          style={{ width: `${progress.percent}%` }}
        />
      )}

      {/* Уменьшенные размеры: h-10 вместо h-12, px-4 вместо px-6, min-w-48 */}
      <div className="relative h-10 px-4 flex items-center gap-3 min-w-[190px]">
        
        {/* Иконка */}
        <div className="flex-shrink-0">
          {isDisabled ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill={state === 'play' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              {state === 'play' ? (
                <path d="M8 5v14l11-7z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15l-4-4h3V4h2v7h3l-4 4zM5 18v2h14v-2H5z" />
              )}
            </svg>
          )}
        </div>

        {/* Текст */}
        <div className="flex flex-col items-start text-left leading-none">
          <span className="text-[11px] font-[900] uppercase tracking-tighter">
            {state === 'downloading' ? 'Установка' :
             state === 'launching'   ? 'Запуск' :
             state === 'play'        ? 'ИГРАТЬ' : 'СКАЧАТЬ'}
          </span>
          <span className={`text-[8px] mt-0.5 uppercase font-bold tracking-widest opacity-80 ${state === 'play' ? 'text-[#052e16]/80' : ''}`}>
            {subText}
          </span>
        </div>

        {/* Индикатор в конце */}
        <div className="ml-auto text-[9px] font-mono font-bold opacity-40">
           {progress !== null ? `${Math.round(progress.percent)}%` : '>>'}
        </div>
      </div>
    </button>
  );
};

export default LaunchButton;