import React, { useEffect, useState } from 'react';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://hardtimes-server-1.onrender.com',
  timeout: 10000,
});

interface IServer {
  _id: string;
  serverName: string;
  ipAddress: string;
  gameType: string;
  playersCount: number;
  isOnline: boolean;
  gameVersion: string;
  premiumVotes: number;
  votesWeekly: number;
}

interface IApiResponse {
  items: IServer[];
}

const ServerList = () => {
  const [servers, setServers] = useState<IServer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServers = async () => {
    try {
      const response = await api.get<IApiResponse>('/servers', { params: { limit: 40 } });
      const topServers = (response.data.items || [])
        .filter((s: IServer) => s.gameType?.toLowerCase().includes('java'))
        .sort((a, b) => b.premiumVotes - a.premiumVotes || b.votesWeekly - a.votesWeekly)
        .slice(0, 10)
        .map((s: IServer) => {
           let cleanIp = s.ipAddress;
           if (typeof s.ipAddress === 'string' && s.ipAddress.trim().startsWith('{')) {
             try { cleanIp = JSON.parse(s.ipAddress).java; } catch { cleanIp = s.ipAddress; }
           }
           return { ...s, ipAddress: cleanIp };
        });
      setServers(topServers);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    // Основной контейнер: добавлена прозрачность /80 и backdrop-blur
    <div className="flex flex-col bg-[#1e1e1e]/80 backdrop-blur-md border-2 border-[#121212]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] w-full overflow-hidden">
      
      {/* Внутренний заголовок: чуть более темная прозрачность */}
      <div className="bg-[#121212]/60 px-3 py-2 border-b border-[#333]/30">
        <span className="text-[#ffaa00] text-[13px] uppercase tracking-[0.2em]" style={{ fontFamily: 'MinecraftTen' }}>
          Рейтинг серверов
        </span>
      </div>

      {/* Список серверов */}
      <div className="flex flex-col max-h-[380px] overflow-y-auto custom-scrollbar bg-black/10">
        {loading ? (
          <div className="p-3 text-center text-[#555] font-mono text-[9px] uppercase tracking-widest">Загрузка данных...</div>
        ) : (
          servers.map((server, index) => (
            <div 
              key={server._id}
              // hover:bg-white/5 делает строку при наведении подсвеченной
              className="flex items-center justify-between py-1.5 px-3 border-b border-[#121212]/30 hover:bg-white/5 transition-colors group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(server.ipAddress);
              }}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[#ffffff]/20 font-mono text-[10px] w-4">{index + 1}.</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#bbb] text-[11px] font-bold group-hover:text-white truncate max-w-[290px]">
                    {server.serverName.toUpperCase()}
                  </span>
                  <span className="text-white/20 text-[8px] font-black border border-white/5 px-1 rounded-sm uppercase">
                    {server.gameVersion}
                  </span>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                <span className="text-[#00ff95]/70 font-mono text-[10px] font-bold tracking-tight group-hover:text-[#00ff95] transition-colors">
                  {server.ipAddress.toLowerCase()}
                </span>
                {server.premiumVotes > 0 && (
                  <span className="ml-2 text-[10px] drop-shadow-[0_0_8px_#ffaa00]">⭐</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Нижний блок кнопок-ссылок: полупрозрачная подложка */}
     <div className="grid grid-cols-3 gap-1 p-1 bg-[#121212]/80">
        <button 
            onClick={() => (window as any).ipcRenderer.openExternal('https://hardmonitoring.ru/monitoring')}
            className="relative flex items-center justify-center py-2 bg-[#4a4a4a]/90 hover:bg-[#5a5a5a] border-b-2 border-r-2 border-[#222] active:border-0 active:translate-y-[1px] transition-all"
        >
            <span className="text-white text-[9px] font-black uppercase tracking-tighter"
                style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            Все сервера
            </span>
        </button>

        <button 
            onClick={() => (window as any).ipcRenderer.openExternal('https://hardmonitoring.ru/monitoring/workbench')}
            className="relative flex items-center justify-center py-2 bg-[#3c8527]/90 hover:bg-[#47a02e] border-b-2 border-r-2 border-[#1a3a11] active:border-0 active:translate-y-[1px] transition-all"
        >
            <span className="text-white text-[9px] font-black uppercase tracking-tighter"
                style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            + Добавить
            </span>
        </button>
        <button 
            onClick={() => (window as any).ipcRenderer.openExternal('https://hardmonitoring.ru/monitoring/workbench')}
            className="relative flex items-center justify-center py-2 bg-yellow-600 hover:bg-yellow-700 border-b-2 border-r-2 border-[#1a3a11] active:border-0 active:translate-y-[1px] transition-all"
        >
            <span className="text-white text-[9px] font-black uppercase tracking-tighter"
                style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            + Добавить бесплатно
            </span>
        </button>
        </div>
    </div>
  );
};

export default ServerList;