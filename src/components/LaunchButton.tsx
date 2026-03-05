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
      if (progress.isChecking || !progress.total || progress.total === "0.0") {
        return "Проверка файлов...";
      }
      const unit = progress.unit || (parseInt(progress.total.toString()) > 1000 ? "файлов" : "MB");
      return `${progress.current} / ${progress.total} ${unit}`;
    }
    if (isLaunching) return "Запуск...";
    if (isDownloaded) return "Готово к игре";
    return "Нужна загрузка";
  }, [progress, isLaunching, isDownloaded]);

  const bgColor = {
    downloading: 'bg-[#1a1a1a] border-white/10',
    launching:   'bg-[#1a2e1a] border-[#2d5a1e]/50',
    play:        'bg-[#1bd96a]/10 border-[#1bd96a]/30 hover:bg-[#1bd96a]/15 hover:border-[#1bd96a]/50',
    install:     'bg-[#1a2440] border-[#2d4a8a]/50 hover:bg-[#1e2d50] hover:border-[#3a5aa0]/60',
  }[state];

  const textColor = {
    downloading: 'text-white/50',
    launching:   'text-[#4a9e3a]',
    play:        'text-[#1bd96a]',
    install:     'text-[#6b9fe4]',
  }[state];

  const iconColor = {
    downloading: 'text-white/20',
    launching:   'text-[#4a9e3a]',
    play:        'text-[#1bd96a]',
    install:     'text-[#6b9fe4]',
  }[state];

  return (
    <button
      disabled={isDisabled}
      onClick={onLaunch}
      className={`
        group relative overflow-hidden rounded-xl border transition-all duration-200
        ${bgColor}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}
      `}
    >
      {/* Прогресс-бар подложка */}
      {progress !== null && (
        <div
          className="absolute inset-y-0 left-0 bg-[#1bd96a]/5 transition-all duration-500 ease-out"
          style={{ width: `${progress.percent}%` }}
        />
      )}

      <div className="relative h-12 px-5 flex items-center gap-4 min-w-[220px]">
        
        {/* Иконка слева */}
        <div className={`flex-shrink-0 ${iconColor} transition-colors`}>
          {isDisabled ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : state === 'play' ? (
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-4-4h3V4h2v7h3l-4 4zM5 18v2h14v-2H5z" />
            </svg>
          )}
        </div>

        {/* Текст */}
        <div className="flex flex-col items-start flex-1">
          <span className={`text-[13px] font-bold leading-none ${textColor} transition-colors`}>
            {state === 'downloading' ? 'Установка' :
             state === 'launching'   ? 'Запуск' :
             state === 'play'        ? 'Играть' : 'Установить'}
          </span>
          <span className="text-[9px] text-white/25 mt-0.5 uppercase tracking-wider">
            {subText}
          </span>
        </div>

        {/* Прогресс % или стрелка */}
        <div className={`flex-shrink-0 text-[11px] font-mono ${iconColor} transition-colors`}>
          {progress !== null ? (
            <span>{Math.round(progress.percent)}%</span>
          ) : (
            <svg
              className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default LaunchButton;