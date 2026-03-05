import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import SkinHead from "./SkinHead";

const SERVER_URL = "https://hardtimes-server-1.onrender.com";
const EMOJIS = ["😊", "😂", "🔥", "👍", "💀", "❤️", "😮", "⚔️", "💎", "⛏️"];

interface UserProfile {
  username: string;
  avatar?: string;
  provider?: string;
}

export default function GlobalChat({
  currentUser,
  currentProvider,
  onMention,
  isChatOpen
}: {
  currentUser: string;
  currentProvider?: string;
  onMention: () => void;
  isChatOpen: boolean;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [userCache, setUserCache] = useState<Record<string, UserProfile>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const isChatOpenRef = useRef(isChatOpen);

  useEffect(() => { isChatOpenRef.current = isChatOpen; }, [isChatOpen]);

  const canChat = currentUser && currentUser !== "Player" && currentUser.trim() !== "";

  // Получить профиль пользователя (кеш)
  const fetchUserProfile = async (nickname: string): Promise<UserProfile> => {
    if (userCache[nickname]) return userCache[nickname];
    try {
      const res = await fetch(`${SERVER_URL}/users/${nickname}`);
      if (res.ok) {
        const data = await res.json();
        const profile: UserProfile = {
          username: data.username,
          avatar: data.avatar || null,
          provider: 'internal'
        };
        setUserCache(prev => ({ ...prev, [nickname]: profile }));
        return profile;
      }
    } catch {}
    // Не найден на сервере — офлайн игрок
    const fallback: UserProfile = { username: nickname, avatar: undefined, provider: undefined };
    setUserCache(prev => ({ ...prev, [nickname]: fallback }));
    return fallback;
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(p => p - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SERVER_URL, { transports: ["websocket"] });
    }

    fetch(`${SERVER_URL}/chat?limit=40`)
      .then(res => res.json())
      .then(async (data) => {
        setMessages(data);
        // Предзагружаем профили
        const nicks = [...new Set(data.map((m: any) => m.authorName))] as string[];
        await Promise.all(nicks.map(fetchUserProfile));
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 100);
      })
      .catch(console.error);

    const handleMessage = async (msg: any) => {
      await fetchUserProfile(msg.authorName);
      setMessages(prev => [...prev, msg]);
      if (!isChatOpenRef.current && msg.message.includes(`@${currentUser}`)) onMention();
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    };

    socketRef.current.on("receive_message", handleMessage);
    return () => { socketRef.current?.off("receive_message", handleMessage); };
  }, [currentUser, onMention]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !canChat || cooldown > 0) return;

    let userToken = null;
    const ipc = (window as any).ipcRenderer;
    if (ipc) {
      try {
        const accounts = await ipc.invoke('get-accounts');
        const current = accounts.find((a: any) => a.nickname === currentUser && a.provider === currentProvider);
        userToken = current?.token;
      } catch {}
    }

    socketRef.current?.emit("send_message", {
      message: newMessage,
      authorName: currentUser,
      token: userToken,
      provider: currentProvider || null, // ДОБАВИТЬ
      userId: null,
    });

    setNewMessage("");
    setCooldown(3);
  };

  const openProfile = (nickname: string) => {
    const profile = userCache[nickname];
    if (profile?.provider === 'internal') {
      const ipc = (window as any).ipcRenderer;
      const url = `https://hardmonitoring.ru/profile/${nickname}`;
      ipc ? ipc.send('open-external-link', url) : window.open(url, '_blank');
    }
  };

  const MessageAvatar = ({ msg }: { msg: any }) => {
  // Hard Times с аватаркой
  if (msg.provider === 'internal' && msg.avatar) {
    return (
      <img
        src={msg.avatar}
        className="w-8 h-8 rounded-lg bg-black/40 border border-white/[0.06] flex-shrink-0 object-cover"
        alt=""
      />
    );
  }
  // Ely.by или без аватарки — голова скина
  return (
    <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/[0.06] flex-shrink-0 bg-black/40">
      <SkinHead
        nickname={msg.authorName}
        provider={msg.provider || undefined}
        size={32}
      />
    </div>
  );
};

  const renderMessage = (text: string) =>
    text.split(/(@\w+)/g).map((part, i) =>
      part.startsWith('@')
        ? <span key={i} className="text-[#1bd96a] font-semibold">{part}</span>
        : part
    );

  return (
    <div className="flex flex-col h-full w-full bg-[#0f0f0f] text-white">

      {/* Шапка */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1bd96a] shadow-[0_0_6px_#1bd96a]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Глобальный чат</span>
        </div>
        <span className="text-[9px] text-white/20 uppercase tracking-wider">HardTimes</span>
      </div>

      {/* Сообщения */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
        {messages.map((msg, i) => {
          const isMe = msg.authorName === currentUser;
          const profile = userCache[msg.authorName];
          const isRegistered = !!(msg.user || msg.userId || profile?.provider === 'internal');

          return (
            <div key={i} className={`flex items-start gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              
              <MessageAvatar msg={msg} />

              <div className={`flex flex-col max-w-[78%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 mb-0.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {isRegistered ? (
                    <button
                      onClick={() => openProfile(msg.authorName)}
                      className="text-[10px] font-bold text-[#1bd96a]/80 hover:text-[#1bd96a] transition-colors"
                    >
                      {msg.authorName}
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-white/30">{msg.authorName}</span>
                  )}
                  <span className="text-[8px] text-white/10">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className={`text-[11px] px-3 py-1.5 rounded-xl leading-relaxed break-words
                  ${isMe
                    ? 'bg-[#1bd96a]/10 text-white/80 rounded-tr-sm'
                    : 'bg-white/[0.04] text-white/70 rounded-tl-sm'
                  }`}>
                  {renderMessage(msg.message)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ввод */}
      <div className="p-3 border-t border-white/[0.06] flex-shrink-0 relative">
        {showEmoji && (
          <div className="absolute bottom-full left-0 right-0 p-2 bg-[#141414] border-t border-white/[0.06] flex flex-wrap gap-1.5 z-10">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setNewMessage(p => p + e)} className="hover:scale-125 transition-transform text-sm">
                {e}
              </button>
            ))}
          </div>
        )}

        {canChat ? (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors
                ${showEmoji ? 'text-[#1bd96a] bg-[#1bd96a]/10' : 'text-white/20 hover:text-white/40'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder={cooldown > 0 ? `Подождите ${cooldown}с...` : "Написать сообщение..."}
              className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-white/10 placeholder:text-white/15 transition-colors"
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={cooldown > 0 || !newMessage.trim()}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-[#1bd96a]/10 text-[#1bd96a] hover:bg-[#1bd96a]/20 disabled:opacity-20 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-1 text-[9px] text-white/20 uppercase tracking-widest">
            Войдите чтобы писать в чат
          </div>
        )}
      </div>
    </div>
  );
}