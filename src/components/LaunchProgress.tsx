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

  // Если есть хоть какой-то процент или текст статуса — показываем
  const showStats = progress.total !== "0" && progress.total !== "0.0";

  return (
    <div className="relative w-full animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative h-5 w-full bg-[#0a0a0a] border-t border-[#333] overflow-hidden">
        
        {/* Полоска */}
        <div 
          className="h-full bg-[#3c8527] transition-all duration-500 ease-out relative" 
          style={{ width: `${progress.percent}%` }} 
        />

        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-[#00ff95] shadow-[0_0_5px_#00ff95]" />
            <span className="text-[8px] text-white/90 uppercase tracking-widest"
                  style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
              {statusText} 
              {showStats && (
                <span className="ml-2 text-white/30">
                  [{progress.current} / {progress.total}]
                </span>
              )}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-[9px] text-white/90 tabular-nums"
                  style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
              {Math.round(progress.percent)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchProgress;