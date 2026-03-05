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

  const showStats = progress.total !== "0" && progress.total !== "0.0";
  const percent = Math.round(progress.percent);

  return (
    <div className="w-full flex-shrink-0 border-t border-white/[0.06] bg-[#0a0a0a] animate-in slide-in-from-bottom-1 duration-200">
      
      {/* Прогресс линия сверху */}
      <div className="h-[2px] w-full bg-white/[0.04] relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#1bd96a] transition-all duration-500 ease-out"
          style={{ width: `${progress.percent}%` }}
        />
        {/* Бегущий блик */}
        {percent < 100 && (
          <div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#1bd96a]/40 to-transparent animate-pulse"
            style={{ left: `${Math.max(0, progress.percent - 10)}%` }}
          />
        )}
      </div>

      {/* Текст статуса */}
      <div className="h-7 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Пульсирующая точка */}
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1bd96a] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1bd96a]" />
          </span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest">
            {statusText}
          </span>
          {showStats && (
            <span className="text-[9px] text-white/20">
              {progress.current} / {progress.total}
            </span>
          )}
        </div>

        <span className="text-[9px] font-mono text-[#1bd96a]/60 tabular-nums">
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default LaunchProgress;