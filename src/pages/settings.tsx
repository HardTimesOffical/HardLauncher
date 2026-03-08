import { useState, useEffect } from 'react';
import PathInput from '../components/settings/PathInput';
import RamSlider from '../components/settings/RamSlider';
import { TabButton } from '../components/settings/TabButton';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';

export type ThemeType = 'dark' | 'light' | 'emerald' | 'ruby' | 'ocean';

interface VersionFilters {
  showRelease: boolean;
  showFabric: boolean;
  showOld: boolean;
}

function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance'>('general');
  const [ram, setRam] = useState(4);
  const [gamePath, setGamePath] = useState('');
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [isSaved, setIsSaved] = useState(false);
  const [filters, setFilters] = useState<VersionFilters>({
    showRelease: true, showFabric: true, showOld: false
  });

  useEffect(() => {
    window.ipcRenderer.invoke('get-settings').then(config => {
      if (config) {
        setRam(config.ram || 4);
        setGamePath(config.gamePath || '');
        setTheme(config.theme || 'dark');
        if (config.versionFilters) setFilters(config.versionFilters);
      }
    });
  }, []);

  const handleSave = async () => {
    const result = await window.ipcRenderer.invoke('save-settings', {
      ram, gamePath, theme, versionFilters: filters
    });
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Цвета для индикаторов типов версий
  const getFilterColor = (key: string) => {
    switch(key) {
      case 'showRelease': return 'var(--color-brand)'; // Голубой/Зеленый
      case 'showFabric':  return '#ffd700';           // Золотой (Fabric)
      case 'showOld':     return '#ff4757';           // Красный (Old)
      default:            return 'var(--color-brand)';
    }
  };

  return (
    <div className="w-full max-w-2xl animate-scale-in">
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* TABS HEADER */}
        <div className="px-6 pt-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex gap-6">
            <TabButton 
              label="Настройки" 
              active={activeTab === 'general'} 
              onClick={() => setActiveTab('general')} 
            />
            <TabButton 
              label="Оформление" 
              active={activeTab === 'appearance'} 
              onClick={() => setActiveTab('appearance')} 
            />
          </div>
          <p className="text-[9px] text-[var(--color-text-dim)] mb-2 uppercase tracking-tighter">Launcher v1.0</p>
        </div>

        {/* CONTENT */}
        <div className="p-6 min-h-[340px]">
          {activeTab === 'general' ? (
            <div className="grid grid-cols-2 gap-8 animate-fade-in"> {/* Добавлена анимация */}
              <div className="space-y-6">
                <section>
                  <p className="text-[8px] uppercase font-bold text-[var(--color-text-dim)] tracking-widest mb-3">Ресурсы</p>
                  <RamSlider value={ram} onChange={setRam} />
                </section>
                <section>
                  <p className="text-[8px] uppercase font-bold text-[var(--color-text-dim)] tracking-widest mb-3">Пути</p>
                  <PathInput label="Путь к .minecraft" value={gamePath} onSelect={() => {}} />
                </section>
              </div>
              
              <div className="space-y-3">
                <p className="text-[8px] uppercase font-bold text-[var(--color-text-dim)] tracking-widest mb-1">Фильтры версий</p>
                {Object.keys(filters).map((key) => {
                  const isActive = filters[key as keyof VersionFilters];
                  const accentColor = getFilterColor(key);
                  
                  return (
                    <div 
                      key={key}
                      onClick={() => setFilters({...filters, [key as keyof VersionFilters]: !isActive})}
                      className="group p-3 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl flex justify-between items-center cursor-pointer hover:border-[var(--color-text-dim)]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {/* Иконка-индикатор типа */}
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: isActive ? accentColor : 'var(--color-text-dim)', opacity: isActive ? 1 : 0.3 }}
                        />
                        <span className={`text-[10px] uppercase font-bold tracking-tight transition-colors ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dim)]'}`}>
                          {key.replace('show', '')}
                        </span>
                      </div>
                      
                      {/* Кастомный переключатель (Toggle) */}
                      <div className={`w-7 h-4 rounded-full p-1 transition-all duration-300 ${isActive ? '' : 'bg-black/20'}`}
                           style={{ backgroundColor: isActive ? accentColor : '' }}>
                        <div className={`w-2 h-2 bg-white rounded-full transition-transform duration-300 ${isActive ? 'translate-x-3' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <AppearanceSettings currentTheme={theme} onThemeChange={handleThemeChange} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-overlay)]/50">
          <div className="h-4">
            {isSaved && (
              <span className="text-[9px] text-[var(--color-brand)] font-bold uppercase tracking-widest animate-fade-in">
                ✓ Сохранено
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="px-8 py-2 rounded-lg text-[9px] font-black uppercase tracking-tighter bg-[var(--color-brand)] text-[var(--color-bg)] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--color-brand)]/10"
          >
            Применить изменения
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;