import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import SkinHead from "./SkinHead"; // Оставляем для совместимости, если кто-то не из HardTimes

const SERVER_URL = "https://hardtimes-server-1.onrender.com";
const EMOJIS = ["😊", "😂", "🔥", "👍", "💀", "❤️", "😮", "⚔️", "💎", "⛏️"];
const MESSAGES_PER_PAGE = 40;
const STORAGE_KEY = "chat_last_read_id";

// ... (функции проверки URL остаются прежними)
const ALLOWED_IMAGE_DOMAINS = ["pinterest.com", "pinimg.com", "i.pinimg.com"];
const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;

function isPinterestImageUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_IMAGE_DOMAINS.some(d => hostname === d || hostname.endsWith("." + d));
  } catch { return false; }
}
function isImageUrl(url: string): boolean {
  return IMAGE_EXT_REGEX.test(url) && isPinterestImageUrl(url);
}
function containsBlockedUrl(text: string): boolean {
  const matches = text.match(URL_REGEX);
  return matches ? matches.some(url => !isImageUrl(url)) : false;
}
function getLastReadId() { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } }
function saveLastReadId(id: string) { try { localStorage.setItem(STORAGE_KEY, id); } catch {} }

function calcUnread(msgs: any[], lastReadId: string | null): number {
  if (!lastReadId || msgs.length === 0) return 0;
  let lastReadIdx = -1;
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i]._id <= lastReadId) { lastReadIdx = i; break; }
  }
  return lastReadIdx === -1 ? msgs.length : msgs.length - lastReadIdx - 1;
}

interface UserProfile { username: string; avatar?: string | null; provider?: string; }

// --- ОБНОВЛЕННЫЙ КОМПОНЕНТ АВАТАРКИ ---
const MessageAvatar = memo(({ msg, profile }: { msg: any, profile?: UserProfile }) => {
  const cls = "w-7 h-7 rounded-lg flex-shrink-0 object-cover border flex items-center justify-center text-[10px] font-bold uppercase select-none";
  const style = { borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)", color: "var(--color-brand)" };

  // 1. Если есть аватарка из базы HardTimes
  if (profile?.avatar) {
    return <img src={profile.avatar} className={cls} style={style} alt="" loading="lazy" />;
  }

  // 2. Если это системный/внутренний пользователь, но без авы — показываем букву
  if (profile?.provider === "internal" || msg.provider === "internal") {
    return (
      <div className={cls} style={style}>
        {msg.authorName.charAt(0)}
      </div>
    );
  }

  // 3. Fallback на майнкрафт голову для остальных (если нужно)
  return (
    <div className={`${cls} overflow-hidden`} style={style}>
      <SkinHead nickname={msg.authorName} provider={msg.provider || undefined} size={28} />
    </div>
  );
});

// ... (InlineImage и renderMessageContent без изменений)
const InlineImage = memo(({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <div className="mt-1.5 rounded-lg overflow-hidden max-w-[220px]" style={{ border: "1px solid var(--color-border)" }}>
      {!loaded && <div className="w-[220px] h-[120px] bg-white/5 animate-pulse rounded-lg" />}
      <img src={url} alt="" loading="lazy"
        className={`max-w-full max-h-[200px] object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
        onLoad={() => setLoaded(true)} onError={() => setError(true)} />
    </div>
  );
});

function renderMessageContent(text: string) {
  const parts = text.split(URL_REGEX);
  const images: string[] = [];
  const textNodes = parts.map((part, i) => {
    if (!URL_REGEX.test(part)) {
      return part.split(/(@\w+)/g).map((p, j) =>
        p.startsWith("@") ? <span key={`${i}-${j}`} className="text-[var(--color-brand)] font-bold">{p}</span> : p
      );
    }
    if (isImageUrl(part)) { images.push(part); return null; }
    return <span key={i} className="line-through opacity-30 text-red-400 text-[11px]">[ссылка]</span>;
  });
  return { textNodes, images };
}

export default function GlobalChat({
  currentUser, currentProvider, onMention, isChatOpen, onUnreadChange,
}: {
  currentUser: string;
  currentProvider?: string;
  onMention: () => void;
  isChatOpen: boolean;
  onUnreadChange?: (count: number) => void;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [userCache, setUserCache] = useState<Record<string, UserProfile>>({});
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [unread, setUnread] = useState(0);
  const [atBottom, setAtBottom] = useState(true);
  const [urlError, setUrlError] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const isChatOpenRef = useRef(isChatOpen);
  const atBottomRef = useRef(true);
  const lastReadIdRef = useRef<string | null>(getLastReadId());
  const oldestMsgRef = useRef<string | null>(null);
  const userCacheRef = useRef<Record<string, UserProfile>>({});
  const [hasHTAccount, setHasHTAccount] = useState(false);

  // ПРОВЕРКА: может ли пользователь писать (только HardTimes)
 useEffect(() => {
  const checkHT = async () => {
    const ipc = (window as any).ipcRenderer;
    if (ipc) {
      const accounts = await ipc.invoke("get-accounts");
      setHasHTAccount(accounts.some((a: any) => a.provider === "internal"));
    }
  };
  checkHT();
  // Можно добавить интервал или слушать событие обновления аккаунтов
}, [currentUser]); // Перепроверять при смене ника

const canChat = hasHTAccount;

  const fetchUserProfile = useCallback(async (nickname: string): Promise<UserProfile> => {
    if (userCacheRef.current[nickname]) return userCacheRef.current[nickname];
    const fallback: UserProfile = { username: nickname };
    userCacheRef.current[nickname] = fallback;
    try {
      const res = await fetch(`${SERVER_URL}/users/${nickname}`);
      if (res.ok) {
        const data = await res.json();
        const profile: UserProfile = { 
          username: data.username, 
          avatar: data.avatar || null, 
          provider: "internal" 
        };
        userCacheRef.current[nickname] = profile;
        setUserCache(prev => ({ ...prev, [nickname]: profile }));
        return profile;
      }
    } catch {}
    return fallback;
  }, []);

  const openProfile = (nickname: string) => {
    const profile = userCacheRef.current[nickname];
    if (profile?.provider === "internal") {
      const url = `https://hardmonitoring.ru/profile/${nickname}`;
      const ipc = (window as any).ipcRenderer;
      ipc ? ipc.send("open-external-link", url) : window.open(url, "_blank");
    }
  };

  // ... (useEffect сокета и загрузки сообщений остаются прежними, они используют fetchUserProfile)
  useEffect(() => { isChatOpenRef.current = isChatOpen; }, [isChatOpen]);
  useEffect(() => { atBottomRef.current = atBottom; }, [atBottom]);

  useEffect(() => {
    if (!isChatOpen) return;
    setMessages(prev => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        lastReadIdRef.current = last._id;
        saveLastReadId(last._id);
      }
      return prev;
    });
    setUnread(0);
    onUnreadChange?.(0);
    setTimeout(scrollToBottom, 50);
  }, [isChatOpen, onUnreadChange]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setAtBottom(bottom);
    atBottomRef.current = bottom;
    if (bottom) {
      setMessages(prev => {
        if (prev.length > 0) {
          lastReadIdRef.current = prev[prev.length - 1]._id;
          saveLastReadId(lastReadIdRef.current!);
        }
        return prev;
      });
      setUnread(0);
      onUnreadChange?.(0);
    }
    if (el.scrollTop < 80 && hasMore && !loadingMore) loadMoreMessages();
  }, [hasMore, loadingMore, onUnreadChange]);

  useEffect(() => {
    if (!socketRef.current) socketRef.current = io(SERVER_URL, { transports: ["websocket"] });

    fetch(`${SERVER_URL}/chat?limit=${MESSAGES_PER_PAGE}`)
      .then(r => r.json())
      .then(async (data: any[]) => {
        if (!data?.length) return;
        setMessages(data);
        oldestMsgRef.current = data[0]._id;
        setHasMore(data.length >= MESSAGES_PER_PAGE);
        await Promise.all([...new Set(data.map((m: any) => m.authorName)) as any].map(fetchUserProfile));
        
        const savedId = lastReadIdRef.current;
        if (!savedId) {
          saveLastReadId(data[data.length - 1]._id);
        } else {
          const u = calcUnread(data, savedId);
          setUnread(u);
          onUnreadChange?.(u);
        }
        setTimeout(scrollToBottom, 100);
      });

    const handleMessage = async (msg: any) => {
      await fetchUserProfile(msg.authorName);
      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev;
        const next = [...prev, msg];
        if (isChatOpenRef.current && atBottomRef.current) {
          lastReadIdRef.current = msg._id;
          saveLastReadId(msg._id);
        } else {
          setUnread(calcUnread(next, lastReadIdRef.current));
          onUnreadChange?.(calcUnread(next, lastReadIdRef.current));
        }
        return next;
      });
      if (msg.message.includes(`@${currentUser}`)) onMention();
      if (atBottomRef.current) setTimeout(scrollToBottom, 50);
    };

    socketRef.current.on("receive_message", handleMessage);
    return () => { socketRef.current?.off("receive_message", handleMessage); };
  }, [currentUser, fetchUserProfile, onMention, onUnreadChange]);

  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || loadingMore || !oldestMsgRef.current) return;
    setLoadingMore(true);
    const el = scrollRef.current;
    const prevH = el?.scrollHeight ?? 0;
    try {
      const res = await fetch(`${SERVER_URL}/chat?limit=${MESSAGES_PER_PAGE}&before=${oldestMsgRef.current}`);
      const data: any[] = await res.json();
      if (!data.length) { setHasMore(false); return; }
      oldestMsgRef.current = data[0]._id;
      setHasMore(data.length >= MESSAGES_PER_PAGE);
      await Promise.all([...new Set(data.map((m: any) => m.authorName)) as any].map(fetchUserProfile));
      setMessages(prev => [...data, ...prev]);
      requestAnimationFrame(() => { if (el) el.scrollTop = el.scrollHeight - prevH; });
    } catch {} finally { setLoadingMore(false); }
  }, [hasMore, loadingMore, fetchUserProfile]);

const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Сразу отсекаем пустые или спам
  if (!newMessage.trim() || cooldown > 0) return;

  // 2. Проверка URL
  if (containsBlockedUrl(newMessage)) {
    setUrlError(true);
    setTimeout(() => setUrlError(false), 2500);
    return;
  }

  const ipc = (window as any).ipcRenderer;
  let chatUser = currentUser;
  let chatProvider = currentProvider;
  let chatToken: string | null = null;

  try {
    if (ipc) {
      const accounts = await ipc.invoke("get-accounts");
      const htAccount = accounts.find((a: any) => a.provider === "internal");

      if (!htAccount) {
        // Если аккаунта нет, просто выходим (кнопка и так должна быть скрыта через canChat)
        return;
      }

      chatUser = htAccount.nickname;
      chatProvider = "internal";
      chatToken = htAccount.token;
    }

    // 3. Отправка
    socketRef.current?.emit("send_message", {
      message: newMessage,
      authorName: chatUser,
      token: chatToken,
      provider: chatProvider,
      userId: null,
    });

    // 4. Очистка и запуск таймера
    setNewMessage(""); 
    setCooldown(3);

  } catch (err) {
    console.error("Ошибка при отправке сообщения:", err);
    // В случае ошибки сбрасываем кулдаун, чтобы юзер мог попробовать еще раз
    setCooldown(0);
  }
};

useEffect(() => {
  if (cooldown <= 0) return;

  const id = setInterval(() => {
    setCooldown((prev) => {
      if (prev <= 1) {
        clearInterval(id);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(id);
  // Убираем cooldown из зависимостей, чтобы интервал не перезапускался постоянно
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cooldown > 0]);

return (
    <div className="flex flex-col h-full w-full relative" style={{ backgroundColor: "var(--color-bg-subtle)" }}>
      
      {/* Список сообщений */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
        {messages.map((msg, i) => {
          const isMe = msg.authorName === currentUser;
          const profile = userCache[msg.authorName];
          const isRegistered = profile?.provider === "internal";
          const { textNodes, images } = renderMessageContent(msg.message);

          return (
            <div key={msg._id || i} className={`flex items-start gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
              {/* Аватарка (автоматически выберет фото из базы или букву) */}
              <MessageAvatar msg={msg} profile={profile} />
              
              <div className={`flex flex-col max-w-[78%] ${isMe ? "items-end" : "items-start"}`}>
                <div className={`flex items-center gap-1.5 mb-0.5 ${isMe ? "flex-row-reverse" : ""}`}>
                  {isRegistered ? (
                    <button 
                      onClick={() => openProfile(msg.authorName)}
                      className="text-[10px] font-black hover:underline transition-all"
                      style={{ color: "var(--color-brand)" }}
                    >
                      {msg.authorName}
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold opacity-30">{msg.authorName}</span>
                  )}
                  <span className="text-[8px] opacity-20">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className={`text-[12px] px-3 py-1.5 rounded-2xl leading-relaxed break-words shadow-sm border ${isMe ? "rounded-tr-none" : "rounded-tl-none"}`}
                  style={{
                    backgroundColor: isMe ? "var(--color-brand-dim)" : "var(--color-bg-elevated)",
                    color: "var(--color-text)",
                    borderColor: isMe ? "var(--color-brand)" : "var(--color-border)",
                  }}>
                  {textNodes}
                  {images.map((url, j) => <InlineImage key={j} url={url} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Кнопка прокрутки вниз / счетчик непрочитанных */}
      {(!atBottom || unread > 0) && (
        <button onClick={() => scrollToBottom()}
          className="absolute right-4 bottom-[100px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg hover:brightness-110 active:scale-95 z-20"
          style={{ backgroundColor: "var(--color-bg-elevated)", border: "1px solid var(--color-border)" }}>
          {unread > 0 && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-brand)", color: "#000" }}>
              {unread > 99 ? "99+" : unread}
            </span>
          )}
          <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* ФОРМА ВВОДА */}
      <div className="p-3 border-t flex-shrink-0 relative" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        
        {/* Подсказка про Pinterest */}
        <div className="mb-2 text-[10px] opacity-40 text-center flex items-center justify-center gap-1.5 select-none">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.14 9.41 7.62 11.17-.1-.95-.19-2.41.04-3.45.21-.94 1.35-5.71 1.35-5.71s-.34-.69-.34-1.71c0-1.61.93-2.81 2.1-2.81 1 0 1.47.75 1.47 1.64 0 1-.64 2.49-.96 3.87-.27 1.15.58 2.09 1.71 2.09 2.05 0 3.63-2.16 3.63-5.28 0-2.76-1.99-4.69-4.82-4.69-3.28 0-5.21 2.46-5.21 5.01 0 1 .38 2.06.86 2.64.09.11.1.21.07.33-.08.33-.26 1.05-.3 1.19-.05.19-.16.23-.37.13-1.39-.65-2.26-2.67-2.26-4.3 0-3.5 2.54-6.72 7.34-6.72 3.85 0 6.85 2.75 6.85 6.42 0 3.83-2.42 6.91-5.77 6.91-1.13 0-2.19-.59-2.55-1.28l-.69 2.63c-.25.96-.92 2.16-1.37 2.9 1.12.33 2.3.51 3.53.51 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
          </svg>
          Вы можете загружать фото с помощью ссылок с Pinterest
        </div>

        {/* Ошибка при вводе сторонней ссылки */}
        {urlError && (
          <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-red-400 opacity-80 text-center animate-bounce">
            Ссылки запрещены. Только прямые изображения с Pinterest.
          </div>
        )}

        {canChat ? (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button type="button" onClick={() => setShowEmoji(!showEmoji)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                    style={{ color: showEmoji ? "var(--color-brand)" : "var(--color-text-dim)" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <input 
              value={newMessage} 
              onChange={e => { setNewMessage(e.target.value); setUrlError(false); }}
              placeholder={cooldown > 0 ? `Подождите ${cooldown}с...` : "Написать сообщение..."}
              className="flex-1 border rounded-xl px-3 py-1.5 text-[12px] outline-none transition-all placeholder:opacity-20"
              style={{
                backgroundColor: "var(--color-bg-elevated)",
                borderColor: urlError ? "rgba(248,113,113,0.5)" : "var(--color-border)",
                color: "var(--color-text)",
              }}
              autoComplete="off" 
            />

            <button 
              type="submit" 
              disabled={cooldown > 0 || !newMessage.trim()}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-20 shadow-lg"
              style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-2 text-[10px] font-black uppercase tracking-widest opacity-20 border border-dashed rounded-xl"
               style={{ color: "var(--color-text)", borderColor: "var(--color-border)" }}>
            Авторизуйте аккаунт HardTimes для доступа к чату
          </div>
        )}

        {/* Панель эмодзи */}
        {showEmoji && (
          <div className="absolute bottom-full left-2 right-2 p-2 mb-2 rounded-xl border flex flex-wrap gap-2 z-10 shadow-2xl animate-in slide-in-from-bottom-2"
               style={{ backgroundColor: "var(--color-bg-elevated)", borderColor: "var(--color-border)" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => { setNewMessage(p => p + e); setShowEmoji(false); }}
                      className="hover:scale-125 transition-transform text-lg p-1">{e}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}