import React, { useState, useEffect, useRef, memo } from "react";
import { io, Socket } from "socket.io-client";
import SkinHead from "./SkinHead";

const SERVER_URL = "https://hardtimes-server-1.onrender.com";
const EMOJIS = ["😊", "😂", "🔥", "👍", "💀", "❤️", "😮", "⚔️", "💎", "⛏️"];

interface UserProfile {
  username: string;
  avatar?: string;
  provider?: string;
}

// Мемоизируем аватар, чтобы он не перерендерялся без нужды (убирает мигание)
const MessageAvatar = memo(({ msg }: { msg: any }) => {
  const commonClass = "w-8 h-8 rounded-lg flex-shrink-0 object-cover border shadow-sm will-change-transform";
  const borderStyle = { borderColor: 'var(--color-border)' };

  if (msg.provider === 'internal' && msg.avatar) {
    return (
      <img
        src={msg.avatar}
        className={commonClass}
        style={{ ...borderStyle, backgroundColor: 'var(--color-bg-subtle)' }}
        alt=""
        loading="lazy"
      />
    );
  }
  return (
    <div className={`${commonClass} overflow-hidden`} style={{ ...borderStyle, backgroundColor: 'var(--color-bg-subtle)' }}>
      <SkinHead
        nickname={msg.authorName}
        provider={msg.provider || undefined}
        size={32}
      />
    </div>
  );
});

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
      provider: currentProvider || null,
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

  const renderMessage = (text: string) =>
    text.split(/(@\w+)/g).map((part, i) =>
      part.startsWith('@')
        ? <span key={i} className="text-[var(--color-brand)] font-bold">{part}</span>
        : part
    );

  return (
    <div className="flex flex-col h-full w-full" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>

      {/* Сообщения */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => {
          const isMe = msg.authorName === currentUser;
          const profile = userCache[msg.authorName];
          const isRegistered = !!(msg.user || msg.userId || profile?.provider === 'internal');

          return (
            <div key={i} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
              
              <MessageAvatar msg={msg} />

              <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {isRegistered ? (
                    <button
                      onClick={() => openProfile(msg.authorName)}
                      className="text-[11px] font-black hover:brightness-125 transition-all"
                      style={{ color: 'var(--color-brand)' }}
                    >
                      {msg.authorName}
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold opacity-40" style={{ color: 'var(--color-text)' }}>{msg.authorName}</span>
                  )}
                  <span className="text-[9px] font-medium opacity-20" style={{ color: 'var(--color-text)' }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className={`text-[13px] px-3.5 py-2 rounded-2xl leading-relaxed break-words shadow-sm border
                  ${isMe
                    ? 'rounded-tr-none'
                    : 'rounded-tl-none'
                  }`}
                  style={{ 
                    backgroundColor: isMe ? 'var(--color-brand-dim)' : 'var(--color-bg-elevated)',
                    color: 'var(--color-text)',
                    borderColor: isMe ? 'var(--color-brand)' : 'var(--color-border)',
                    opacity: 0.95
                  }}>
                  {renderMessage(msg.message)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ввод */}
      <div className="p-3 border-t flex-shrink-0 relative" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
        {showEmoji && (
          <div className="absolute bottom-full left-2 right-2 p-2 rounded-t-xl border-x border-t flex flex-wrap gap-2 z-10 animate-fade-in"
               style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setNewMessage(p => p + e)} className="hover:scale-125 transition-transform text-lg p-1">
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
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all"
              style={{ 
                color: showEmoji ? 'var(--color-brand)' : 'var(--color-text-dim)',
                backgroundColor: showEmoji ? 'var(--color-brand-dim)' : 'transparent'
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder={cooldown > 0 ? `Подождите ${cooldown}с...` : "Написать сообщение..."}
              className="flex-1 border rounded-xl px-4 py-2 text-[12px] outline-none transition-all placeholder:opacity-20"
              style={{ 
                backgroundColor: 'var(--color-bg-elevated)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={cooldown > 0 || !newMessage.trim()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-20 shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-brand)', 
                color: '#fff' 
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-2 text-[10px] font-black uppercase tracking-widest opacity-20" style={{ color: 'var(--color-text)' }}>
            Авторизуйтесь для доступа к чату
          </div>
        )}
      </div>
    </div>
  );
}