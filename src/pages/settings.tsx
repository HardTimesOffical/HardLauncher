import { useState, useEffect } from 'react';
import PathInput from '../components/settings/PathInput';
import RamSlider from '../components/settings/RamSlider';

interface VersionFilters {
  showRelease: boolean;
  showFabric: boolean;
  showOld: boolean;
}

function Settings() {
  const [ram, setRam] = useState(4);
  const [gamePath, setGamePath] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [filters, setFilters] = useState<VersionFilters>({
    showRelease: true,
    showFabric: true,
    showOld: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const config = await window.ipcRenderer.invoke('get-settings');
        if (config) {
          setRam(config.ram || 4);
          setGamePath(config.gamePath || '');
          if (config.versionFilters) setFilters(config.versionFilters);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    loadData();
  }, []);

  const handleSelectPath = async () => {
    try {
      const newPath = await window.ipcRenderer.invoke('select-directory');
      if (newPath) setGamePath(newPath);
    } catch (err) {
      console.error('Directory selection error:', err);
    }
  };

  const handleSave = async () => {
    try {
      const result = await window.ipcRenderer.invoke('save-settings', {
        ram, 
        gamePath, 
        versionFilters: filters,
      });
      
      if (result.success) {
        setIsSaved(true);
        // Теперь бэкенд (ConfigManager) сам отправит 'filters-changed'
        // Главный экран его поймает и обновит список.
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch {
      alert('Ошибка при сохранении');
    }
  };

  

  const handleResetToDefault = async () => {
    if (confirm('Сбросить все настройки до стандартных?')) {
      try {
        const defaults = await window.ipcRenderer.invoke('get-default-settings');
        setRam(defaults.ram);
        setGamePath(defaults.gamePath);
        setFilters({ showRelease: true, showFabric: true, showOld: false });
        setIsSaved(true);
        await window.ipcRenderer.invoke('get-versions');
        setTimeout(() => setIsSaved(false), 2000);
      } catch (err) {
        console.error('Reset error:', err);
      }
    }
  };

  const toggleFilter = (key: keyof VersionFilters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filterOptions: { key: keyof VersionFilters; label: string; desc: string; labelClass: string }[] = [
    { key: 'showRelease', label: 'Релизы', desc: 'Vanilla (1.x.x)', labelClass: 'text-white/60' },
    { key: 'showFabric', label: 'Fabric', desc: 'Мод-загрузчик', labelClass: 'text-yellow-400/80' },
    { key: 'showOld', label: 'Старые', desc: 'Ниже 1.13', labelClass: 'text-white/35' },
  ];

  return (
    <div className="w-full max-w-2xl animate-scale-in">
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-bold text-white">Настройки</h2>
            <p className="text-[9px] text-white/25 mt-0.5">Конфигурация игрового окружения</p>
          </div>
        </div>

        {/* BODY — двухколоночный грид */}
        <div className="p-5 grid grid-cols-2 gap-5">

          {/* Левая колонка */}
          <div className="flex flex-col gap-4">

            {/* RAM */}
            <section>
              <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mb-2">Память (RAM)</p>
              <RamSlider value={ram} onChange={setRam} />
            </section>

            {/* PATH */}
            <section className="border-t border-white/[0.05] pt-4">
              <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mb-2">Директория игры</p>
              <PathInput label="Папка установки" value={gamePath} onSelect={handleSelectPath} />
              <p className="text-[8px] text-white/15 mt-1.5">
                Версии и ассеты сохраняются сюда
              </p>
            </section>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col gap-4">
            <section>
              <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mb-2">Отображение версий</p>
              <div className="flex flex-col gap-1.5">
                {filterOptions.map(opt => (
                  <div
                    key={opt.key}
                    onClick={() => toggleFilter(opt.key)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all
                      ${filters[opt.key]
                        ? 'bg-white/[0.04] border-white/[0.08]'
                        : 'bg-transparent border-white/[0.03] opacity-40'
                      }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-semibold ${opt.labelClass}`}>
                        {opt.label}
                      </span>
                      <span className="text-[8px] text-white/20">{opt.desc}</span>
                    </div>

                    {/* Toggle */}
                    <div className={`w-8 h-4 rounded-full border transition-all relative flex-shrink-0
                      ${filters[opt.key]
                        ? 'bg-[#1bd96a]/20 border-[#1bd96a]/30'
                        : 'bg-white/[0.03] border-white/[0.08]'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all
                        ${filters[opt.key]
                          ? 'left-[17px] bg-[#1bd96a]'
                          : 'left-0.5 bg-white/20'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-2">
          <div className="flex-1">
            {isSaved && (
              <span className="text-[9px] text-[#1bd96a] font-bold uppercase tracking-wider">
                ✓ Сохранено
              </span>
            )}
          </div>
          <button
            onClick={handleResetToDefault}
            className="px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-wider text-white/25 border border-white/[0.05] hover:text-white/50 hover:bg-white/[0.03] transition-all"
          >
            По умолчанию
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-wider bg-[#1bd96a]/15 text-[#1bd96a] border border-[#1bd96a]/25 hover:bg-[#1bd96a]/25 transition-all"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;