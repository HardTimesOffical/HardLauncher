import React from 'react';

interface ProgressData {
  percent: number;
  current: string;
  total: string;
  isChecking?: boolean;
}

interface Props {
  progress: ProgressData | null; 
  statusText: string;
}

const LaunchProgress: React.FC<Props> = ({ progress, statusText }) => {
  if (progress === null) return null;

  // Проверяем, идет ли установка загрузчиков
  const isInstallingLoader = statusText.toLowerCase().includes('forge') || 
                             statusText.toLowerCase().includes('fabric');

  return (
    <div className="relative w-full animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative h-5 w-full bg-[#0a0a0a] border-t border-[#333] overflow-hidden select-none">
        
        {/* Полоска прогресса (скрываем, если ставим загрузчик, или оставляем для красоты) */}
        <div 
          className={`h-full bg-[#3c8527] transition-all duration-700 ease-out relative ${isInstallingLoader ? 'opacity-30' : 'opacity-100'}`} 
          style={{ width: `${isInstallingLoader ? 100 : progress.percent}%` }} 
        >
          <div className="absolute inset-0 bg-white/5" />
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                 backgroundSize: '15px 15px' 
               }} 
          />
        </div>

        {/* Контент поверх полоски */}
        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          
          {/* Левая часть: Статус */}
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 ${progress.isChecking || isInstallingLoader ? 'bg-orange-500 animate-pulse' : 'bg-[#00ff95]'}`} />
            
            <span className="text-[8px] text-white/90 uppercase tracking-widest leading-none"
                  style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
              {statusText} 
              {!isInstallingLoader && progress.total !== "0.0" && (
                <span className="ml-2 text-white/30 font-mono text-[7px]">
                  {progress.current}/{progress.total}MB
                </span>
              )}
            </span>
          </div>
          
          {/* Правая часть: Проценты (скрываем при установке лоадеров) */}
          {!isInstallingLoader && (
            <div className="flex items-center">
              <span className="text-[9px] text-white/90 tabular-nums leading-none"
                    style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
                {Math.round(progress.percent)}%
              </span>
            </div>
          )}

          {/* Центральный текст для лоадеров (появляется только при установке) */}
          {isInstallingLoader && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[7px] text-orange-400/80 animate-pulse uppercase tracking-[0.3em]"
                    style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
                Please wait...
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Линия-акцент */}
      <div className="absolute top-0 left-0 h-[1px] bg-white/5 w-full z-10" />
    </div>
  );
};

export default LaunchProgress;