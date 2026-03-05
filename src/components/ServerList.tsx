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

const ServerList = () => {
  const [servers, setServers] = useState<IServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchServers = async () => {
    try {
      const response = await api.get('/servers', { params: { limit: 40 } });
      const topServers = (response.data.items || [])
        .filter((s: IServer) => s.gameType?.toLowerCase().includes('java'))
        .sort((a: IServer, b: IServer) => b.premiumVotes - a.premiumVotes || b.votesWeekly - a.votesWeekly)
        .slice(0, 10)
        .map((s: IServer) => {
          let cleanIp = s.ipAddress;
          if (typeof s.ipAddress === 'string' && s.ipAddress.trim().startsWith('{')) {
            try { cleanIp = JSON.parse(s.ipAddress).java; } catch {}
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

  useEffect(() => { fetchServers(); }, []);

  const handleCopyIp = (server: IServer) => {
    navigator.clipboard.writeText(server.ipAddress);
    setCopiedId(server._id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleOpenLink = (url: string) => {
    (window as any).ipcRenderer.send('open-external-link', url); // было 'open-external'
  };

  const handleQuickJoin = (server: IServer) => {
    let finalIp = server.ipAddress;
    if (typeof finalIp === 'string' && finalIp.includes('{"java"')) {
      try { finalIp = JSON.parse(finalIp).java; } catch {}
    }
    (window as any).ipcRenderer.send('launch-game', {
      version: server.gameVersion,
      nickname: 'Player',
      serverIp: finalIp
    });
  };

  return (
    <div className="flex flex-col w-full bg-[#0f0f0f]">

      {/* HEADER */}
      <div className="px-3 py-2 border-b border-white/[0.05] flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Серверы</span>
        <button onClick={fetchServers} className="text-white/15 hover:text-white/40 transition-colors">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-col divide-y divide-white/[0.03]">
        {loading ? (
          <div className="py-5 text-center text-[8px] uppercase tracking-widest text-white/15 animate-pulse">
            Загрузка...
          </div>
        ) : servers.map((server, index) => (
          <div
            key={server._id}
            onMouseEnter={() => setHoveredId(server._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Строка сервера */}
            <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors group">
              
              {/* Номер */}
              <span className="text-[8px] text-white/15 font-mono w-3 flex-shrink-0">{index + 1}</span>

              {/* Название + IP */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-medium text-white/60 group-hover:text-white/80 truncate block transition-colors">
                  {server.serverName}
                </span>
                <span className="text-[8px] text-white/20 font-mono truncate block">
                  {server.ipAddress}
                </span>
              </div>

              {/* Версия */}
              <span className="text-[8px] text-white/35 border border-white/[0.08] px-1.5 py-0.5 rounded flex-shrink-0">
                {server.gameVersion}
              </span>
            </div>

            {/* Кнопки при hover */}
            <div className={`overflow-hidden transition-all duration-150 ${
              hoveredId === server._id ? 'max-h-7' : 'max-h-0'
            }`}>
              <div className="flex border-t border-white/[0.04]">
                <button
                  onClick={() => handleQuickJoin(server)}
                  className="flex-1 py-1 text-[8px] font-bold uppercase tracking-wider text-[#1bd96a]/70 hover:text-[#1bd96a] hover:bg-[#1bd96a]/5 transition-colors"
                >
                  Играть
                </button>
                <button
                  onClick={() => handleCopyIp(server)}
                  className="px-3 py-1 text-[8px] border-l border-white/[0.04] text-white/20 hover:text-white/50 hover:bg-white/[0.02] transition-colors"
                >
                  {copiedId === server._id ? '✓' : 'IP'}
                </button>
                <button
                  onClick={() => handleOpenLink(`https://hardmonitoring.ru/server/${server._id}`)}
                  className="px-3 py-1 text-[8px] border-l border-white/[0.04] text-white/20 hover:text-white/50 hover:bg-white/[0.02] transition-colors"
                >
                  Инфо
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
     {/* FOOTER */}
      <div className="flex border-t border-white/[0.05]">
        <button
          onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring')}
          className="flex-1 py-2 text-[8px] font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.04] transition-all border-r border-white/[0.05]"
        >
          Мониторинг
        </button>
        <button
          onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring/workbench')}
          className="flex-1 py-2 text-[8px] font-bold uppercase tracking-wider text-[#1bd96a]/60 hover:text-[#1bd96a] hover:bg-[#1bd96a]/[0.05] transition-all border-r border-white/[0.05]"
        >
          Добавить
        </button>
        <button
          onClick={() => handleOpenLink('https://hardmonitoring.ru/monitoring/workbench')}
          className="flex-1 py-2 text-[8px] font-bold uppercase tracking-wider text-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-400/[0.05] transition-all"
        >
          VIP
        </button>
      </div>
    </div>
  );
};

export default ServerList;