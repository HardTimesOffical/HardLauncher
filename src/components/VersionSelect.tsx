import { useState, useRef, useEffect } from 'react';

interface GameVersion {
  id: string;
  type: string;
  isDownloaded: boolean;
  name?: string; // Добавляем опциональное имя для отображения
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
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedVersionData = versions.find(v => v.id === selected);

  return (
    <div className="flex flex-col relative" ref={containerRef}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 149, 0.2);
        }
      `}</style>

      {/* Main Selector */}
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          no-drag flex items-center justify-between gap-3 px-3 h-10 rounded-sm border transition-all duration-150 cursor-pointer
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/[0.04] active:bg-white/[0.06]'}
          ${isOpen ? 'bg-white/[0.08] border-[#00ff95]/50' : 'bg-white/[0.02] border-white/10'}
        `}
      >
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 ${selectedVersionData?.isDownloaded ? 'bg-[#00ff95] shadow-[0_0_8px_#00ff95]' : 'bg-white/20'}`} />
          <span className="text-[10px] text-white/90 uppercase tracking-wider"
                style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            {selected || 'Select...'}
          </span>
        </div>
        <svg 
          className={`w-2 h-2 text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00ff95]' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeWidth="4" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-[calc(100%+12px)] left-0 w-52 bg-[#0c0c0c] border border-white/10 rounded-sm shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
            <div className="px-2 py-1.5 mb-1 border-b border-white/5">
               <span className="text-[7px] text-white/20 uppercase tracking-[0.2em]" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>Available Versions</span>
            </div>
            {versions.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  onSelect(v.id);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center justify-between px-2 py-2 rounded-sm cursor-pointer transition-all mb-0.5 group
                  ${v.id === selected ? 'bg-[#00ff95]/10 text-[#00ff95]' : 'text-white/40 hover:bg-white/[0.03] hover:text-white'}
                `}
              >
                <span className="text-[9px] uppercase">
                  {v.name || v.id} {/* Показываем имя, если оно есть */}
                </span>
                
                {v.isDownloaded ? (
                   <span className="text-[6px] font-bold uppercase opacity-40">Ready</span>
                ) : (
                   <div className="p-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                     <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 15l-4-4h3V4h2v7h3l-4 4zM5 18v2h14v-2H5z"/>
                     </svg>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}