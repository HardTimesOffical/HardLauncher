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
    <div
      className="w-full flex-shrink-0 border-t animate-in slide-in-from-bottom-1 duration-200"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-overlay)' }}
    >
      {/* Прогресс-бар с текстом поверх */}
      <div className="relative h-8 overflow-hidden" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>

        {/* Заполненная часть */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: 'var(--color-brand)',
            opacity: 0.35,
          }}
        />

        {/* Shimmer-анимация поверх заполненной части */}
        {percent > 0 && percent < 100 && (
          <div
            className="absolute inset-y-0 left-0 transition-all duration-500 ease-out overflow-hidden"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 shimmer-bar" />
          </div>
        )}

        {/* Светящаяся правая граница заполнения */}
        {percent > 0 && percent < 100 && (
          <div
            className="absolute inset-y-0 w-px transition-all duration-500 ease-out"
            style={{
              left: `${percent}%`,
              backgroundColor: 'var(--color-brand)',
              boxShadow: '0 0 6px 2px var(--color-brand)',
              opacity: 0.8,
            }}
          />
        )}

        {/* Текст поверх полоски */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-2">
            {/* Пульсирующая точка */}
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: 'var(--color-brand)' }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: 'var(--color-brand)' }}
              />
            </span>
            <span
              className="text-[9px] uppercase tracking-widest font-medium"
              style={{ color: 'var(--color-text-dim)' }}
            >
              {statusText}
            </span>
            {showStats && (
              <span className="text-[9px]" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
                {progress.current} / {progress.total}
              </span>
            )}
          </div>

          <span
            className="text-[10px] font-mono font-bold tabular-nums"
            style={{ color: 'var(--color-brand)' }}
          >
            {percent}%
          </span>
        </div>
      </div>

      {/* Тонкая светящаяся линия снизу */}
      <div className="h-[2px] relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: 'var(--color-brand)',
            boxShadow: '0 0 8px var(--color-brand)',
          }}
        />
      </div>
    </div>
  );
};

export default LaunchProgress;
