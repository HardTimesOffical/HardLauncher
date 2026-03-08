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
        className="text-[8px] text-[var(--color-brand)] uppercase tracking-wider ml-1 font-bold" 
        style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
      >
        {label}
      </span>
      <div className="flex gap-2 items-stretch h-8">
        <button 
          type="button" // Явно указываем тип, чтобы не срабатывал submit
          onClick={(e) => {
            e.preventDefault();
            onSelect();
          }} 
          className="px-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[7px] text-[var(--color-text)] uppercase font-bold hover:text-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] transition-all flex items-center gap-2 rounded-sm"
          style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
        >
          Обзор
        </button>
        <div className="flex-1 bg-[var(--color-bg-overlay)] border border-[var(--color-border)] px-2 flex items-center overflow-hidden rounded-sm">
          <span className="text-[9px] text-[var(--color-text-dim)] font-mono truncate opacity-60">
            {value || 'Путь не выбран...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PathInput;