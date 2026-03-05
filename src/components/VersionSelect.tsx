import { useState, useRef, useEffect } from 'react';

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
  name?: string;
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
    if (v.type === 'custom') {
      if (v.name?.toLowerCase().includes('fabric')) return 'Fabric';
      if (v.name?.toLowerCase().includes('forge')) return 'Forge';
      return 'Mod';
    }
    return 'Vanilla';
  };

  const getTypeBadgeClass = (v: GameVersion) => {
    if (v.name?.toLowerCase().includes('fabric')) return 'text-yellow-400/60 border-yellow-400/20';
    if (v.name?.toLowerCase().includes('forge')) return 'text-orange-400/60 border-orange-400/20';
    return 'text-white/20 border-white/[0.08]';
  };

  // Установленные сверху
  const sorted = [...versions].sort((a, b) => {
    if (a.isDownloaded && !b.isDownloaded) return -1;
    if (!a.isDownloaded && b.isDownloaded) return 1;
    return 0;
  });

  return (
    <div className="relative no-drag" ref={containerRef}>

      {/* Селектор */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 h-9 rounded-lg border transition-all cursor-pointer min-w-[150px]
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/[0.04]'}
          ${isOpen ? 'bg-white/[0.06] border-white/[0.12]' : 'bg-white/[0.02] border-white/[0.06]'}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            selectedVersion?.isDownloaded ? 'bg-[#1bd96a]' : 'bg-white/15'
          }`} />
          <span className={`text-[10px] truncate font-medium ${
            selectedVersion?.isDownloaded ? 'text-white/80' : 'text-white/35'
          }`}>
            {selectedVersion?.name || selected || 'Выбрать...'}
          </span>
        </div>
        <svg
          className={`w-2.5 h-2.5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white/50' : 'text-white/20'
          }`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Дропдаун */}
      {isOpen && (
        <div className="absolute bottom-[calc(100%+6px)] left-0 w-60 bg-[#111] border border-white/[0.08] rounded-xl shadow-2xl z-[200] overflow-hidden animate-fade-in">

          <div className="px-3 py-2 border-b border-white/[0.05]">
            <span className="text-[8px] uppercase text-white/20 tracking-widest">Версии игры</span>
          </div>

          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-0.5">
            {sorted.map((v) => {
              const isActive = v.id === selected;
              return (
                <div
                  key={v.id}
                  onClick={() => { onSelect(v.id); setIsOpen(false); }}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-all group
                    ${isActive ? 'bg-[#1bd96a]/10' : 'hover:bg-white/[0.04]'}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      v.isDownloaded
                        ? isActive ? 'bg-[#1bd96a]' : 'bg-[#1bd96a]/50'
                        : 'bg-white/10'
                    }`} />
                    <span className={`text-[10px] truncate ${
                      v.isDownloaded
                        ? isActive ? 'text-[#1bd96a] font-semibold' : 'text-white/80'
                        : 'text-white/30'
                    }`}>
                      {v.name || v.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-[7px] font-bold uppercase border px-1.5 py-0.5 rounded ${getTypeBadgeClass(v)}`}>
                      {getTypeLabel(v)}
                    </span>
                    {isActive && v.isDownloaded && (
                      <svg className="w-3 h-3 text-[#1bd96a]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    {!v.isDownloaded && (
                      <svg className="w-3 h-3 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
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