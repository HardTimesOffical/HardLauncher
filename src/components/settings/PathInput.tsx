import React from 'react';

interface PathInputProps {
  label: string;
  value: string;
  onSelect: () => void;
}


const PathInput: React.FC<PathInputProps> = ({ label, value, onSelect }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full scale-95 origin-left">
      <span 
        className="text-[8px] text-[#00ff95] uppercase tracking-wider ml-1" 
        style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
      >
        {label}
      </span>
      <div className="flex gap-2 items-stretch h-8">
        <button 
          onClick={(e) => {
            e.preventDefault(); // На всякий случай предотвращаем дефолт
            onSelect();
          }} 
          className="px-3 bg-white/5 border border-white/10 text-[7px] uppercase font-bold hover:text-[#00ff95] hover:bg-[#00ff95]/5 transition-all flex items-center gap-2"
          style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
        >
          Обзор
        </button>
        <div className="flex-1 bg-black/20 border border-white/5 px-2 flex items-center overflow-hidden">
          <span className="text-[9px] text-white/20 font-mono truncate">
            {value || 'Путь не выбран...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PathInput;