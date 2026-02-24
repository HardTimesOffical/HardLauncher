import { useState, useEffect } from 'react';
import PathInput from '../components/settings/PathInput';
import RamSlider from '../components/settings/RamSlider';

function Settings() {
  const [ram, setRam] = useState(4);
  const [gamePath, setGamePath] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // ЗАГРУЗКА: Получаем данные при открытии окна
  useEffect(() => {
    const loadData = async () => {
      try {
        const config = await window.ipcRenderer.invoke('get-settings');
        if (config) {
          setRam(config.ram || 4);
          setGamePath(config.gamePath || '');
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    loadData();
  }, []);

  // ВЫБОР ПАПКИ
  const handleSelectPath = async () => {
    try {
      const newPath = await window.ipcRenderer.invoke('select-directory');
      if (newPath) setGamePath(newPath);
    } catch (err) {
      console.error('Directory selection error:', err);
    }
  };

  // СОХРАНЕНИЕ
  const handleSave = async () => {
    try {
      const result = await window.ipcRenderer.invoke('save-settings', { ram, gamePath });
      if (result.success) {
        setIsSaved(true);
        // ВАЖНО: Заставляем бэкенд пересчитать статусы установленных версий
        await window.ipcRenderer.invoke('get-versions'); 
        
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  // СБРОС К ДЕФОЛТАМ
  const handleResetToDefault = async () => {
    if (confirm('Сбросить все настройки до стандартных?')) {
      try {
        // Бэкенд возвращает дефолты и САМ сохраняет их в конфиг
        const defaults = await window.ipcRenderer.invoke('get-default-settings');
        
        setRam(defaults.ram);
        setGamePath(defaults.gamePath);
        
        // Показываем успех, так как бэкенд уже их записал
        setIsSaved(true);
        
        // Сразу просим бэкенд обновить список версий для нового пути
        await window.ipcRenderer.invoke('get-versions');
        
        setTimeout(() => setIsSaved(false), 3000);
      } catch (err) {
        console.error('Reset error:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Контейнер окна */}
      <div className="w-[600px] max-h-[85vh] flex flex-col bg-[#0c0c0c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#00ff95] tracking-[0.3em]" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
              System Settings
            </span>
            <span className="text-[7px] text-white/20 uppercase tracking-widest mt-1">Configure your game environment</span>
          </div>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 bg-[#00ff95] shadow-[0_0_5px_#00ff95] rounded-full animate-pulse" />
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-10 overflow-y-auto custom-scrollbar">
          
          {/* Настройка RAM */}
          <section className="space-y-4">
            <RamSlider value={ram} onChange={setRam} />
          </section>

          {/* Настройка Пути */}
          <section className="space-y-4 pt-4 border-t border-white/5">
            <PathInput 
              label="Game Directory" 
              value={gamePath} 
              onSelect={handleSelectPath} 
            />
            <p className="text-[7px] text-white/20 uppercase px-1">
              * Все версии игры и ассеты будут скачиваться в эту папку
            </p>
          </section>
          
        </div>

        {/* FOOTER */}
        <div className="p-5 bg-black/40 border-t border-white/5 flex items-center gap-4">
          <div className="flex-1 flex items-center">
            {isSaved && (
              <span className="text-[8px] text-[#00ff95] font-bold uppercase tracking-widest animate-in slide-in-from-left-2">
                ✓ Настройки применены
              </span>
            )}
          </div>

          <button 
            onClick={handleResetToDefault}
            className="px-6 h-9 border border-white/10 text-[8px] uppercase font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all"
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
          >
            По умолчанию
          </button>

          <button 
            onClick={handleSave}
            className="px-10 h-9 bg-[#00ff95] text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#00ff95]/80 active:scale-95 transition-all"
            style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;