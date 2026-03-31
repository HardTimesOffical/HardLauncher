import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hardtimes-server-1.onrender.com',
  timeout: 10000,
});

const ServerList = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await api.get('/servers', { params: { limit: 12 } });
        setServers(response.data.items || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchServers();
  }, []);

  const handleCopyIp = (ip: string, id: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  const openLink = (url: string) => {
    (window as any).ipcRenderer.send('open-external-link', url);
  };

  return (
   <div className="flex flex-col w-[380px] select-none animate-in fade-in duration-500 font-sans">
  
  {/* ШАПКА: Минималистичная, чтобы не съедать место */}
  <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-[var(--color-border-accent)] flex justify-between items-center shadow-lg">
    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
      Мониторинг
    </span>
    <div className="w-1.5 h-1.5 bg-[var(--color-brand)] shadow-[0_0_5px_var(--color-brand)]" />
  </div>

  {/* СПИСОК: gap-[1px] и уменьшенные отступы для 10 серверов */}
  <div className="flex flex-col gap-[1px] mt-1">
    {loading ? (
      Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="border border-white/[0.02] bg-black/30 h-[30px] animate-pulse" />
      ))
    ) : (
      servers.slice(0, 10).map((server, index) => (
        <div
          key={server._id}
          onMouseEnter={() => setHoveredId(server._id)}
          onMouseLeave={() => setHoveredId(null)}
          className="relative transition-all duration-150 border-x border-transparent"
          style={{ 
            backgroundColor: hoveredId === server._id ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.45)',
            borderColor: hoveredId === server._id ? 'var(--color-border-accent)' : 'transparent'
          }}
        >
          {/* Основная строка сервера (высота ~30px) */}
          <div className="flex items-center gap-2 px-2 py-1.5">
            <span className="text-[8px] font-mono text-[var(--color-text-dim)] opacity-40 w-4">
              {String(index + 1).padStart(2, '0')}
            </span>
            
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold truncate block transition-colors ${
                hoveredId === server._id ? 'text-[var(--color-brand)]' : 'text-[#ffffff]' 
              }`}>
                {server.serverName}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-[7.5px] font-bold text-[var(--color-text-dim)] bg-white/5 px-1 py-0.5 border border-white/10 uppercase">
                {server.gameVersion}
              </span>
            </div>
          </div>

          {/* ВЫПАДАЮЩИЕ КНОПКИ: Сделаны компактнее (py-1) */}
          <div className={`flex border-t border-[var(--color-border-accent)] bg-black/80 backdrop-blur-md transition-all duration-150 overflow-hidden ${
            hoveredId === server._id ? 'max-h-[26px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <button
              onClick={() => (window as any).ipcRenderer.send('launch-game', { serverIp: server.ipAddress })}
              className="flex-1 py-1 text-[8px] font-black uppercase tracking-wider text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-black transition-all"
            >
              Играть
            </button>
            <button
              onClick={() => handleCopyIp(server.ipAddress, server._id)}
              className="px-3 py-1 text-[7px] font-bold border-l border-white/5 text-[var(--color-text-dim)] hover:text-white hover:bg-white/10 transition-all"
            >
              {copiedId === server._id ? 'OK' : 'IP'}
            </button>
            <button
              onClick={() => openLink(`https://hardmonitoring.ru/monitoring/${server.slug}`)}
              className="px-3 py-1 text-[7px] font-bold border-l border-white/5 text-[var(--color-text-dim)] hover:text-white hover:bg-white/10 transition-all"
            >
              ИНФО
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* ФУТЕР: Высота py-2 для компактности */}
  <div className="grid grid-cols-3 gap-[2px] mt-1.5">
    <button 
      className="py-2 bg-[var(--color-bg-subtle)] border border-[var(--color-border-accent)] text-[8px] font-bold uppercase tracking-widest text-[var(--color-text-dim)] hover:text-white hover:bg-[#252826] transition-all active:scale-[0.98]"
      onClick={() => openLink('https://monitoring.ru/add')}
    >
      Добавить
    </button>
    <button 
      className="py-2 bg-[var(--color-bg-subtle)] border border-[var(--color-border-accent)] text-[8px] font-bold uppercase tracking-widest text-[var(--color-text-dim)] hover:text-white transition-all active:scale-[0.98]"
      onClick={() => openLink('https://monitoring.ru')}
    >
      Список
    </button>
    <button 
      className="py-2 bg-[var(--color-brand)] border border-[var(--color-brand)] text-[8px] font-black uppercase tracking-widest text-black hover:brightness-110 transition-all shadow-[0_2px_10px_rgba(132,169,140,0.15)] active:scale-[0.98]"
      onClick={() => {/* Автодобавление */}}
    >
      Автодобавление
    </button>
  </div>
</div>
  );
};

export default ServerList;