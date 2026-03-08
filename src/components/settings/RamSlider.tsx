import React from 'react';

interface RamSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const RamSlider: React.FC<RamSliderProps> = ({ value, onChange }) => {
  const isHigh = value > 8;

  return (
    <div className="flex flex-col gap-4 w-full scale-95 origin-left">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span 
            className="text-[9px] text-[var(--color-brand)] uppercase tracking-wider font-bold" 
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
          >
            Выделение памяти (RAM)
          </span>
          <span className="text-[7px] text-[var(--color-text-dim)] uppercase tracking-widest">
            Рекомендуется: 4GB - 8GB
          </span>
        </div>
        
        {/* Адаптивный блок с цифрой */}
        <div className="flex items-baseline gap-1 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-3 py-1 rounded-sm">
          <span className="text-2xl font-black text-[var(--color-text)] tabular-nums leading-none">
            {value}
          </span>
          <span className="text-[9px] text-[var(--color-brand)] font-bold uppercase">GB</span>
        </div>
      </div>

      <div className="relative group">
        <input
          type="range"
          min="2"
          max="16"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          // Используем accent-color на базе переменной бренда
          className="w-full h-1.5 bg-[var(--color-bg-overlay)] rounded-none appearance-none cursor-pointer accent-[var(--color-brand)] transition-all"
        />
        
        {/* Разметка под слайдером */}
        <div className="flex justify-between mt-2 px-1">
          {[2, 4, 8, 12, 16].map((mark) => (
            <div key={mark} className="flex flex-col items-center gap-1">
              <div className={`w-[1px] h-1 transition-colors ${
                value >= mark 
                  ? 'bg-[var(--color-brand)] opacity-50' 
                  : 'bg-[var(--color-text-dim)] opacity-20'
              }`} />
              <span className={`text-[7px] font-bold transition-colors ${
                value >= mark ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dim)] opacity-40'
              }`}>
                {mark}G
              </span>
            </div>
          ))}
        </div>
      </div>

      {isHigh && (
        <div className="text-[7px] text-amber-500/70 uppercase italic animate-pulse font-medium">
          * Выделение более 8GB может замедлить систему
        </div>
      )}
    </div>
  );
};

export default RamSlider;