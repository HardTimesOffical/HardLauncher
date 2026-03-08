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
    <div className="flex flex-col w-[380px] select-none animate-in fade-in duration-500">
      
      {/* ШАПКА — ультракомпактная */}
      <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-t-lg border-t border-x border-white/10 flex justify-between items-center">
        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/20">Мониторинг</span>
        <div className="w-1 h-1 rounded-full bg-[var(--color-brand)] opacity-40" />
      </div>

      {/* СПИСОК */}
      <div className="flex flex-col gap-1 mt-1">
        {loading ? (
          <div className="py-4 text-center text-[7px] text-white/10 uppercase tracking-widest">Загрузка...</div>
        ) : (
          servers.map((server, index) => (
            <div
              key={server._id}
              onMouseEnter={() => setHoveredId(server._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative overflow-hidden rounded border transition-all duration-200"
              style={{ 
                backgroundColor: hoveredId === server._id ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.4)',
                borderColor: hoveredId === server._id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'
              }}
            >
              {/* ОСНОВНАЯ СТРОКА (высота уменьшена) */}
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="text-[7px] font-mono text-white/10 w-3">{String(index + 1).padStart(2, '0')}</span>
                
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-[9px] font-bold text-white/70 truncate">
                    {server.serverName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[7px] font-bold text-white/30 bg-white/5 px-1 rounded border border-white/5">
                    {server.gameVersion}
                  </span>
                </div>
              </div>

              {/* ПАНЕЛЬ ДЕЙСТВИЙ */}
              <div className={`flex border-t border-white/5 bg-black/60 transition-all duration-200 ease-out ${
                hoveredId === server._id ? 'max-h-[28px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <button
                  onClick={() => (window as any).ipcRenderer.send('launch-game', { serverIp: server.ipAddress })}
                  className="flex-1 py-1.5 text-[8px] font-black uppercase tracking-tighter text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-black transition-all"
                >
                  Играть
                </button>
                <button
                  onClick={() => handleCopyIp(server.ipAddress, server._id)}
                  className="px-3 py-1.5 text-[7px] font-bold border-l border-white/5 text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                  {copiedId === server._id ? 'ОК' : 'IP'}
                </button>
                <button
                  onClick={() => openLink(`https://hardmonitoring.ru/server/${server._id}`)}
                  className="px-3 py-1.5 text-[7px] font-bold border-l border-white/5 text-white/20 hover:text-white hover:bg-white/5 transition-all"
                >
                  Инфо
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ФУТЕР — КНОПКИ УПРАВЛЕНИЯ */}
      <div className="grid grid-cols-3 gap-1 mt-2">
        <button 
          className="py-2 rounded-l-lg bg-[#222] border border-white/10 text-[8px] font-black uppercase tracking-wider text-white/70 hover:bg-[#333] transition-all active:scale-95"
          onClick={() => openLink('https://hardmonitoring.ru/add')}
        >
          Добавить
        </button>
        <button 
          className="py-2 bg-[#1a1a1a] border border-white/10 text-[8px] font-black uppercase tracking-wider text-white/50 hover:text-white transition-all active:scale-95"
          onClick={() => openLink('https://hardmonitoring.ru')}
        >
          Мониторинг
        </button>
        <button 
          className="py-2 rounded-r-lg bg-[var(--color-brand)] border border-white/20 text-[8px] font-black uppercase tracking-wider text-black hover:brightness-110 transition-all shadow-[0_0_15px_rgba(var(--color-brand-rgb),0.2)] active:scale-95"
          onClick={() => {/* Логика автодобавления */}}
        >
          Автодобавление
        </button>
      </div>
    </div>
  );
};

export default ServerList;