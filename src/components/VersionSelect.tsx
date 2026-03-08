import { useState, useRef, useEffect } from 'react';

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
  name?: string;
  instanceId?: string;
}

export default function VersionSelect({
  versions,
  selected,
  onSelect,
  disabled
}: {
  versions: GameVersion[],
  selected: string,
  onSelect: (id: string) => void,
  disabled: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedVersion = versions.find(v => v.id === selected);

  const getTypeLabel = (v: GameVersion) => {
    if (v.type === 'fabric') return 'Fabric';
    if (v.type === 'forge') return 'Forge';
    if (v.type === 'modpack' || v.type === 'custom') return 'Modpack';
    return 'Vanilla';
  };

  const getTypeBadgeClass = (v: GameVersion) => {
    // Используем opacity для совместимости с темами
    if (v.type === 'fabric') return 'text-yellow-400/60 border-yellow-400/20';
    if (v.type === 'forge') return 'text-orange-400/60 border-orange-400/20';
    if (v.type === 'modpack' || v.type === 'custom') return 'text-purple-400/60 border-purple-400/20';
    return 'text-[var(--color-text-dim)] border-[var(--color-border)]';
  };

  const sorted = [...versions].sort((a, b) => {
    if (a.isDownloaded && !b.isDownloaded) return -1;
    if (!a.isDownloaded && b.isDownloaded) return 1;
    return 0;
  });

  return (
    <div className="relative no-drag" ref={containerRef}>

      {/* Селектор (Главная кнопка) */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 h-9 rounded-lg border transition-all cursor-pointer min-w-[150px]
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[var(--color-bg-subtle,rgba(255,255,255,0.04))]'}
          ${isOpen 
            ? 'bg-[var(--color-bg-overlay,rgba(255,255,255,0.06))] border-[var(--color-brand)]' 
            : 'bg-[var(--color-bg-base,rgba(255,255,255,0.02))] border-[var(--color-border,rgba(255,255,255,0.06))]'}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            selectedVersion?.isDownloaded ? 'bg-[var(--color-brand,#1bd96a)] shadow-[0_0_8px_var(--color-brand)]' : 'bg-[var(--color-text-dim)] opacity-20'
          }`} />
          <span className={`text-[10px] truncate font-medium ${
            selectedVersion?.isDownloaded ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dim)]'
          }`}>
            {selectedVersion?.name || selected || 'Выбрать...'}
          </span>
        </div>
        <svg
          className={`w-2.5 h-2.5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[var(--color-brand)]' : 'text-[var(--color-text-dim)]'
          }`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Дропдаун (Выпадающий список) */}
{/* Дропдаун */}
{isOpen && (
  <div 
    className="absolute bottom-[calc(100%+6px)] left-0 w-64 rounded-xl shadow-2xl z-[200] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 border transition-colors"
    style={{ 
      /* Используем переменные из твоего CSS */
      backgroundColor: 'var(--color-bg-elevated)', 
      borderColor: 'var(--color-border)' 
    }}
  >
    {/* Заголовок */}
    <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
      <span className="text-[8px] uppercase tracking-widest opacity-60" style={{ color: 'var(--color-text-dim)' }}>
        Доступные версии
      </span>
    </div>

    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-0.5">
      {sorted.map((v) => {
        const isActive = v.id === selected;
        return (
          <div
            key={v.id}
            onClick={() => { onSelect(v.id); setIsOpen(false); }}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-all group"
            style={{ 
              /* Динамический фон ховера и активного элемента */
              backgroundColor: isActive ? 'var(--color-brand-dim)' : 'transparent'
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div 
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-shadow ${
                  v.isDownloaded ? 'opacity-100' : 'opacity-20'
                }`}
                style={{ 
                  backgroundColor: v.isDownloaded ? 'var(--color-brand)' : 'var(--color-text-dim)',
                  boxShadow: (v.isDownloaded && isActive) ? '0 0 8px var(--color-brand)' : 'none'
                }}
              />
              <span 
                className={`text-[10px] truncate ${isActive ? 'font-bold' : ''}`}
                style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-text)' }}
              >
                {v.name || v.id}
              </span>
            </div>

            {/* Тип версии (Forge/Fabric) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span 
                className={`text-[7px] font-bold uppercase border px-1.5 py-0.5 rounded ${getTypeBadgeClass(v)}`}
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                {getTypeLabel(v)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
    </div>
  );
}