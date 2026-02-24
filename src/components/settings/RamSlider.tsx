import React from 'react';

interface RamSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const RamSlider: React.FC<RamSliderProps> = ({ value, onChange }) => {
  // Можно добавить логику: если RAM > 8, подсвечивать желтым (предупреждение)
  const isHigh = value > 8;

  return (
    <div className="flex flex-col gap-4 w-full scale-95 origin-left">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span 
            className="text-[9px] text-[#00ff95] uppercase tracking-wider font-bold" 
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
          >
            Выделение памяти (RAM)
          </span>
          <span className="text-[7px] text-white/30 uppercase tracking-widest">
            Рекомендуется: 4GB - 8GB
          </span>
        </div>
        
        <div className="flex items-baseline gap-1 bg-white/[0.03] border border-white/10 px-3 py-1">
          <span className="text-2xl font-black text-white tabular-nums leading-none">
            {value}
          </span>
          <span className="text-[9px] text-[#00ff95] font-bold uppercase">GB</span>
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
          className="w-full h-1.5 bg-white/5 rounded-none appearance-none cursor-pointer accent-[#00ff95] hover:accent-[#00ff95]/80 transition-all"
        />
        
        {/* Разметка под слайдером */}
        <div className="flex justify-between mt-2 px-1">
          {[2, 4, 8, 12, 16].map((mark) => (
            <div key={mark} className="flex flex-col items-center gap-1">
              <div className={`w-[1px] h-1 ${value >= mark ? 'bg-[#00ff95]/40' : 'bg-white/10'}`} />
              <span className="text-[7px] text-white/20 font-bold">{mark}G</span>
            </div>
          ))}
        </div>
      </div>

      {isHigh && (
        <div className="text-[7px] text-yellow-500/50 uppercase italic animate-pulse">
          * Выделение более 8GB может замедлить систему
        </div>
      )}
    </div>
  );
};

export default RamSlider;