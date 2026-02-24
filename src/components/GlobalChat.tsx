"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "https://hardtimes-server-1.onrender.com";

// Список быстрых эмодзи
const EMOJIS = ["😊", "😂", "🔥", "👍", "💀", "❤️", "😮", "⚔️", "💎", "⛏️"];

export default function GlobalChat({ 
  currentUser, 
  onMention, 
  isChatOpen 
}: { 
  currentUser: string, 
  onMention: () => void, 
  isChatOpen: boolean 
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // Создаем Ref для состояния открытия чата, чтобы сокет видел его без перезапуска эффекта
  const isChatOpenRef = useRef(isChatOpen);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  const canChat = currentUser && currentUser !== "Player" && currentUser.trim() !== "";

  // Таймер кулдауна
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Основной эффект сокета и истории
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SERVER_URL, { transports: ["websocket"] });
    }

    // Загрузка истории один раз
    fetch(`${SERVER_URL}/chat?limit=40`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 100);
      })
      .catch(console.error);

    // Слушатель сообщений
    const handleMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);

      // Используем Ref, чтобы проверка была актуальной без перезагрузки useEffect
      if (!isChatOpenRef.current && msg.message.includes(`@${currentUser}`)) {
        onMention(); 
      }

      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    };

    socketRef.current.on("receive_message", handleMessage);

    return () => {
      socketRef.current?.off("receive_message", handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Зависимость только от юзера, чтобы не переподключаться при каждом движении чата

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !canChat || cooldown > 0) return;

    socketRef.current?.emit("send_message", {
      message: newMessage,
      authorName: currentUser,
      userId: null, 
    });

    setNewMessage("");
    setCooldown(3);
    setShowEmoji(false);
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const renderMessage = (text: string) => {
    return text.split(/(@\w+)/g).map((part, i) => 
      part.startsWith('@') 
        ? <span key={i} className="text-emerald-400 font-semibold">{part}</span> 
        : part
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent font-sans text-white border-r border-white/5">
      {/* Шапка */}
      <div className="p-3 border-b border-white/5 bg-black/40 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Launcher Chat</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-emerald-500/60 font-bold uppercase">Online</span>
        </div>
      </div>

      {/* Сообщения */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <style>{`.custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); }`}</style>
        
        {messages.map((msg, i) => {
          const isMe = msg.authorName === currentUser;
          const isRegistered = msg.user || msg.userId;
          const avatarUrl = msg.avatar || `https://minotar.net/helm/${msg.authorName}/32.png`;

          return (
            <div key={i} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse text-right' : ''}`}>
              <img 
                src={avatarUrl} 
                className="w-7 h-7 rounded-sm bg-black/40 border border-white/10 flex-shrink-0"
                alt=""
              />
              <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {isRegistered ? (
                    <a 
                      href={`https://hardmonitoring.ru/profile/${msg.authorName}`}
                      target="_blank"
                      className="text-[11px] font-bold text-emerald-500/80 hover:text-emerald-400 transition-colors"
                    >
                      {msg.authorName}
                    </a>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400/80 cursor-help" title="Не авторизован">
                      {msg.authorName}
                    </span>
                  )}
                  <span className="text-[8px] text-white/10">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <div className={`text-[12px] p-2 rounded-lg leading-snug break-words ${
                  isMe ? 'bg-emerald-500/10 text-emerald-50 rounded-tr-none' : 'bg-white/5 text-white/80 rounded-tl-none'
                }`}>
                  {renderMessage(msg.message)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ввод сообщения */}
      <div className="p-3 bg-black/40 border-t border-white/5 relative">
        {showEmoji && (
          <div className="absolute bottom-full left-0 w-full p-2 bg-[#161b22] border-t border-white/10 flex flex-wrap gap-2 animate-in slide-in-from-bottom-2 z-10">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => addEmoji(e)} className="hover:scale-125 transition-transform text-sm">{e}</button>
            ))}
          </div>
        )}

        {canChat ? (
          <form onSubmit={handleSend} className="flex flex-col gap-2">
            <div className="flex items-center bg-white/[0.03] border border-white/5 rounded px-2">
              <button 
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className={`p-1.5 transition-colors ${showEmoji ? 'text-emerald-400' : 'text-white/20 hover:text-white/40'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              <input 
                id="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={cooldown > 0 ? `Пауза ${cooldown}с...` : "Сообщение..."}
                className="flex-1 bg-transparent px-2 py-2 text-[12px] outline-none placeholder:text-white/10"
                autoComplete="off"
              />
              
              <button 
                type="submit" 
                disabled={cooldown > 0 || !newMessage.trim()}
                className="p-1.5 text-emerald-500 hover:scale-110 disabled:opacity-0 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-1 text-[9px] text-red-500/40 font-bold uppercase tracking-widest">
            Установите ник
          </div>
        )}
      </div>
    </div>
  );
}