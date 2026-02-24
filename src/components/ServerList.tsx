import { useEffect, useState } from 'react';
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
  const [hoveredServerId, setHoveredServerId] = useState<string | null>(null);

  const fetchServers = async () => {
    try {
      const response = await api.get<IApiResponse>('/servers', { params: { limit: 40 } });
      const topServers = (response.data.items || [])
        .filter((s: IServer) => s.gameType?.toLowerCase().includes('java'))
        .sort((a, b) => b.premiumVotes - a.premiumVotes || b.votesWeekly - a.votesWeekly)
        .slice(0, 10) // СТРОГО 10 СЕРВЕРОВ
        .map((s: IServer) => {
          let cleanIp = s.ipAddress;
          if (typeof s.ipAddress === 'string' && s.ipAddress.trim().startsWith('{')) {
            try { cleanIp = JSON.parse(s.ipAddress).java; } catch { cleanIp = s.ipAddress; }
          }
          return { ...s, ipAddress: cleanIp };
        });
      setServers(topServers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const handleOpenLink = (url: string) => {
    // Используем .send, так как openExternal обычно не прокинут напрямую
    (window as any).ipcRenderer.send('open-external', url);
  };

    const handleQuickJoin = (server: IServer) => {
    let finalIp = server.ipAddress;

    // Если вдруг в ipAddress всё еще сидит строка с JSON (защита)
    if (typeof finalIp === 'string' && finalIp.includes('{"java"')) {
        try {
        const parsed = JSON.parse(finalIp);
        finalIp = parsed.java;
        } catch (e) {
        console.error("Ошибка парсинга IP при входе:", e);
        }
    }

    console.log("Запуск игры для сервера:", server.serverName, "IP:", finalIp);

    (window as any).ipcRenderer.send('launch-game', {
        version: server.gameVersion,
        nickname: 'Player', // Не забудь потом заменить на реальный ник
        serverIp: finalIp 
    });
    };

  return (
    <div className="flex flex-col bg-[#1e1e1e]/80 backdrop-blur-md border border-[#121212]/50 w-full overflow-hidden shadow-2xl">
      
      {/* HEADER */}
      <div className="bg-[#121212]/60 px-2 py-1.5 border-b border-[#333]/30 flex justify-between items-center">
        <span className="text-[#ffaa00] text-[10px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'MinecraftTen' }}>
          Топ серверов
        </span>
        <span className="text-white/10 text-[8px] font-mono uppercase">Online</span>
      </div>

      {/* SERVER LIST */}
      <div className="flex flex-col bg-black/5">
        {loading ? (
          <div className="p-4 text-center text-[#555] font-mono text-[8px] uppercase tracking-widest animate-pulse">
            Синхронизация...
          </div>
        ) : (
          servers.map((server, index) => (
            <div
              key={server._id}
              onMouseEnter={() => setHoveredServerId(server._id)}
              onMouseLeave={() => setHoveredServerId(null)}
              className="relative border-b border-[#121212]/20 last:border-0"
            >
              {/* Компактная строка */}
              <div 
                className="flex items-center justify-between py-1 px-2 hover:bg-white/5 transition-colors group cursor-pointer"
                onClick={() => navigator.clipboard.writeText(server.ipAddress)}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-white/10 font-mono text-[8px] w-3 italic">{index + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-[#bbb] text-[10px] font-bold group-hover:text-white truncate max-w-[150px]">
                      {server.serverName.toUpperCase()}
                    </span>
                    <span className="text-[#00ff95]/30 text-[7px] font-mono leading-none">
                      {server.ipAddress.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex flex-col items-end">
                      <span className="text-white/20 text-[6px] font-bold border border-white/5 px-1 uppercase mb-0.5">
                        {server.gameVersion}
                      </span>
                      <span className="text-[#00ff95]/70 font-mono text-[9px] font-black leading-none">
                        {server.playersCount}
                      </span>
                   </div>
                </div>
              </div>

              {/* Компактный выезд кнопок (высота уменьшена) */}
              <div className={`
                overflow-hidden transition-all duration-200 ease-in-out flex bg-black/40
                ${hoveredServerId === server._id ? 'max-h-8 border-t border-[#00ff95]/10' : 'max-h-0'}
              `}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleQuickJoin(server); }}
                  className="flex-1 py-1.5 bg-[#00ff95]/5 hover:bg-[#00ff95]/20 text-[#00ff95] text-[8px] font-black uppercase tracking-widest transition-all"
                  style={{ fontFamily: 'MinecraftSeven, sans-serif' }}
                >
                  Играть
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenLink(`https://hardmonitoring.ru/server/${server._id}`); }}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white/30 hover:text-white text-[7px] font-bold uppercase border-l border-white/5 transition-all"
                >
                  Инфо
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5 bg-[#121212]/90 border-t border-white/5">
        <button onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring')} className="py-1.5 bg-[#4a4a4a]/60 hover:bg-[#5a5a5a] text-white text-[7px] font-bold uppercase" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
          Мониторинг
        </button>
        <button onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring/workbench')} className="py-1.5 bg-[#3c8527]/60 hover:bg-[#47a02e] text-white text-[7px] font-bold uppercase" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
          Добавить
        </button>
        <button onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring/workbench')} className="py-1.5 bg-yellow-600/60 hover:bg-yellow-700 text-white text-[7px] font-bold uppercase" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
          Vip
        </button>
      </div>
    </div>
  );
};

export default ServerList;