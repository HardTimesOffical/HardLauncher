import { ThemeType } from "../../pages/settings";

interface AppearanceSettingsProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export const AppearanceSettings = ({ currentTheme, onThemeChange }: AppearanceSettingsProps) => {
  const themes = [
    { id: 'dark', label: 'Void', desc: 'Classic', preview: 'bg-[#0f0f0f]', accent: 'bg-[#5da9ff]' },
    { id: 'amoled', label: 'OLED', desc: 'Pure', preview: 'bg-[#000000]', accent: 'bg-[#1bd96a]' },
    { id: 'crimson', label: 'Crimson', desc: 'Abyss', preview: 'bg-[#0d0202]', accent: 'bg-gradient-to-br from-[#ff3c3c] to-[#700000]' },
    { id: 'cyber', label: 'Cyber', desc: 'Neon', preview: 'bg-[#0a0514]', accent: 'bg-gradient-to-br from-[#bc13fe] to-[#2575fc]' },
    { id: 'forest', label: 'Forest', desc: 'Silent', preview: 'bg-[#040806]', accent: 'bg-gradient-to-br from-[#1bd96a] to-[#0a4d29]' },
    { id: 'light', label: 'Light', desc: 'Soft', preview: 'bg-[#ffffff]', accent: 'bg-[#3b82f6]' }
  ];

  return (
    <div className="animate-fade-in space-y-4">
      <section>
        <p className="text-[7px] uppercase font-black text-[var(--color-text-dim)] tracking-[0.2em] mb-3 ml-1">
          Оформление
        </p>
        
        {/* Сетка в 3 колонки, блоки стали ниже */}
        <div className="grid grid-cols-3 gap-2">
          {themes.map((t) => (
            <div 
              key={t.id}
              onClick={() => onThemeChange(t.id as ThemeType)}
              className={`relative p-1.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                currentTheme === t.id 
                ? 'border-[var(--color-brand)] bg-[var(--color-brand-dim)] shadow-sm' 
                : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-dim)]/30'
              }`}
            >
              {/* Маленькое квадратное превью */}
              <div className={`w-8 h-8 shrink-0 rounded-lg ${t.preview} border border-[var(--color-border)] relative overflow-hidden flex items-center justify-center`}>
                 <div className={`w-4 h-1 rounded-full ${t.accent} opacity-60 rotate-45`} />
                 
                 {currentTheme === t.id && (
                   <div className={`absolute inset-0 bg-[var(--color-brand)]/20 flex items-center justify-center`}>
                      <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_8px_var(--color-brand)]" />
                   </div>
                 )}
              </div>

              {/* Текст справа от превью */}
              <div className="min-w-0 flex flex-col">
                <p className="text-[9px] font-black text-[var(--color-text)] truncate leading-none mb-0.5">
                  {t.label}
                </p>
                <p className="text-[7px] text-[var(--color-text-dim)] truncate uppercase tracking-tighter">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Компактный инфо-блок в одну строку */}
      <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] p-2 rounded-xl flex items-center gap-3">
        <div className="w-6 h-6 shrink-0 rounded-lg bg-[var(--color-brand-dim)] flex items-center justify-center text-[var(--color-brand)]">
           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
        <p className="text-[8px] text-[var(--color-text-dim)] font-medium leading-tight">
          Стиль применяется мгновенно ко всем элементам интерфейса.
        </p>
      </div>
    </div>
  );
};