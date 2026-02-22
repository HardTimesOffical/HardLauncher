import React from 'react';

interface ProgressData {
  percent: number;
  current: string;
  total: string;
  isChecking?: boolean;
}

interface LaunchButtonProps {
  progress: ProgressData | null;
  isDownloaded: boolean;
  isLaunching: boolean; // Добавляем новый проп
  onLaunch: () => void;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({ progress, isDownloaded, isLaunching, onLaunch }) => {
  
  // Определяем приоритетное состояние кнопки
  const getButtonState = () => {
    if (progress !== null) return 'downloading';
    if (isLaunching) return 'launching';
    if (isDownloaded) return 'play';
    return 'install';
  };

  const state = getButtonState();
  const isDisabled = state === 'downloading' || state === 'launching';
  const subText = progress !== null 
  ? (progress.current === "0.0" ? "Initializing Fabric..." : `${progress.current} MB / ${progress.total} MB`)
  : isLaunching ? "Starting engine..." : isDownloaded ? "Ready to play" : "Download required";

  return (
    <button
  disabled={isDisabled}
  onClick={onLaunch}
  className={`
    group relative overflow-hidden transform active:scale-[0.97] transition-all duration-100
    /* Внешняя тень и рамка как на скрине */
    border-b-[4px] border-black/40 active:border-b-0 active:translate-y-[2px]
  `}
>
  {/* Основной фон кнопки с градиентом */}
  <div className={`absolute inset-0 transition-all duration-300 ${
    state === 'downloading' ? 'bg-slate-700' : 
    state === 'launching' ? 'bg-[#2d631d]' : 
    state === 'play' ? 'bg-[#3c8527] hover:bg-[#479a2f]' : 
    'bg-[#1e448a] hover:bg-[#2552a5]'
  }`} />

  {/* Верхний светлый блик для объема (как на скрине) */}
  <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />

  {/* Прогресс заливка (более плотная, чтобы было видно на зеленом) */}
  {progress !== null && (
    <div 
      className="absolute inset-y-0 left-0 bg-white/30 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      style={{ width: `${progress.percent}%` }}
    />
  )}

  <div className="relative h-14 px-8 flex items-center gap-4 min-w-[280px] justify-between">
    <div className="flex flex-col items-start">
      <span className="text-[15px] font-bold uppercase tracking-tight leading-none text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        {state === 'downloading' ? 'Установка' : 
         state === 'launching' ? 'Запуск...' : 
         state === 'play' ? 'Играть' : 'Установить'}
      </span>
      
      <span className="text-[10px] font-bold mt-1 text-white/70 uppercase tracking-tighter">
        {state === 'downloading' 
          ? (progress?.isChecking || progress?.total === "0.0" 
              ? 'Проверка...' 
              : `${progress?.current}MB / ${progress?.total}MB`) :
         state === 'launching' ? 'Подготовка...' :
         state === 'play' ? 'Версия Forge 1.21.1' : 'Версия не найдена'}
      </span>
    </div>
    
    {/* Иконка "Стрелочка" как на скрине */}
    <div className="flex items-center justify-center">
      {isDisabled ? (
          <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      ) : (
        /* Символ > из шрифта или SVG */
        <span className="text-white text-2xl font-light opacity-80 group-hover:translate-x-1 transition-transform">
          ›
        </span>
      )}
    </div>
  </div>
</button>
  );
};

export default LaunchButton;