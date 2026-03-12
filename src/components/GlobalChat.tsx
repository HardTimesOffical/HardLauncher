import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import SkinHead from "./SkinHead";

const SERVER_URL = "https://hardtimes-server-1.onrender.com";
const EMOJIS = ["😊", "😂", "🔥", "👍", "💀", "❤️", "😮", "⚔️", "💎", "⛏️"];
const MESSAGES_PER_PAGE = 40;
const STORAGE_KEY = "chat_last_read_id";

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
  if (!matches) return false;
  return matches.some(url => !isImageUrl(url));
}
function getLastReadId(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function saveLastReadId(id: string) {
  try { localStorage.setItem(STORAGE_KEY, id); } catch {}
}
// ObjectId hex сравнивается лексикографически = хронологически
function calcUnread(msgs: any[], lastReadId: string | null): number {
  if (!lastReadId || msgs.length === 0) return 0;
  // Ищем последнее сообщение которое <= lastReadId
  let lastReadIdx = -1;
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i]._id <= lastReadId) { lastReadIdx = i; break; }
  }
  if (lastReadIdx === -1) {
    // Все сообщения новее — считаем те что строго больше
    return msgs.filter(m => m._id > lastReadId).length;
  }
  return msgs.length - lastReadIdx - 1;
}

interface UserProfile { username: string; avatar?: string; provider?: string; }

const MessageAvatar = memo(({ msg }: { msg: any }) => {
  const cls = "w-7 h-7 rounded-lg flex-shrink-0 object-cover border will-change-transform";
  const style = { borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" };
  if (msg.provider === "internal" && msg.avatar)
    return <img src={msg.avatar} className={cls} style={style} alt="" loading="lazy" />;
  return (
    <div className={`${cls} overflow-hidden`} style={style}>
      <SkinHead nickname={msg.authorName} provider={msg.provider || undefined} size={28} />
    </div>
  );
});

const InlineImage = memo(({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <div className="mt-1.5 rounded-lg overflow-hidden max-w-[220px]"
         style={{ border: "1px solid var(--color-border)" }}>
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
        p.startsWith("@")
          ? <span key={`${i}-${j}`} className="text-[var(--color-brand)] font-bold">{p}</span>
          : p
      );
    }
    if (isImageUrl(part)) { images.push(part); return null; }
    return (
      <span key={i} className="line-through opacity-30 text-red-400 text-[11px]" title="Ссылки запрещены">
        [ссылка]
      </span>
    );
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

  const scrollRef     = useRef<HTMLDivElement>(null);
  const socketRef     = useRef<Socket | null>(null);
  const isChatOpenRef = useRef(isChatOpen);
  const atBottomRef   = useRef(true);
  const lastReadIdRef = useRef<string | null>(getLastReadId());
  const oldestMsgRef  = useRef<string | null>(null);
  const userCacheRef  = useRef<Record<string, UserProfile>>({});

  useEffect(() => { isChatOpenRef.current = isChatOpen; }, [isChatOpen]);
  useEffect(() => { atBottomRef.current = atBottom; }, [atBottom]);

  // Открыли чат — всё прочитано
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
  }, [isChatOpen]); // eslint-disable-line

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, []);

  const fetchUserProfile = useCallback(async (nickname: string): Promise<UserProfile> => {
    if (userCacheRef.current[nickname]) return userCacheRef.current[nickname];
    // Сразу ставим fallback чтобы не делать повторные запросы
    const fallback: UserProfile = { username: nickname };
    userCacheRef.current[nickname] = fallback;
    try {
      const res = await fetch(`${SERVER_URL}/users/${nickname}`);
      if (res.ok) {
        const data = await res.json();
        const profile: UserProfile = { username: data.username, avatar: data.avatar || null, provider: "internal" };
        userCacheRef.current[nickname] = profile;
        setUserCache(prev => ({ ...prev, [nickname]: profile }));
        return profile;
      }
    } catch {}
    setUserCache(prev => ({ ...prev, [nickname]: fallback }));
    return fallback;
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
  }, [hasMore, loadingMore, onUnreadChange]); // eslint-disable-line

  // Первичная загрузка + сокет
  useEffect(() => {
    if (!socketRef.current)
      socketRef.current = io(SERVER_URL, { transports: ["websocket"] });

    fetch(`${SERVER_URL}/chat?limit=${MESSAGES_PER_PAGE}`)
      .then(r => r.json())
      .then(async (data: any[]) => {
        if (!data?.length) return;
        setMessages(data);
        oldestMsgRef.current = data[0]._id;
        setHasMore(data.length >= MESSAGES_PER_PAGE);

        const nicks = [...new Set(data.map((m: any) => m.authorName))] as string[];
        await Promise.all(nicks.map(fetchUserProfile));

        const savedId = lastReadIdRef.current;
        if (!savedId) {
          // Первый запуск — помечаем всё прочитанным
          const last = data[data.length - 1];
          lastReadIdRef.current = last._id;
          saveLastReadId(last._id);
          setUnread(0);
          onUnreadChange?.(0);
        } else {
          const u = calcUnread(data, savedId);
          console.log(`[Chat] lastReadId=${savedId}, total=${data.length}, unread=${u}`);
          setUnread(u);
          onUnreadChange?.(u);
        }

        setTimeout(scrollToBottom, 100);
      })
      .catch(console.error);

    const handleMessage = async (msg: any) => {
      await fetchUserProfile(msg.authorName);
      setMessages(prev => {
        // Дедупликация — сокет может прислать то что уже загружено через HTTP
        if (prev.some(m => m._id === msg._id)) return prev;
        const next = [...prev, msg];
        if (isChatOpenRef.current && atBottomRef.current) {
          // Читаем сразу
          lastReadIdRef.current = msg._id;
          saveLastReadId(msg._id);
        } else {
          const u = calcUnread(next, lastReadIdRef.current);
          setUnread(u);
          onUnreadChange?.(u);
        }
        return next;
      });
      if (msg.message.includes(`@${currentUser}`)) onMention();
      if (atBottomRef.current) setTimeout(scrollToBottom, 50);
    };

    socketRef.current.on("receive_message", handleMessage);
    return () => { socketRef.current?.off("receive_message", handleMessage); };
  }, [currentUser]); // eslint-disable-line

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

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !canChat || cooldown > 0) return;
    if (containsBlockedUrl(newMessage)) {
      setUrlError(true); setTimeout(() => setUrlError(false), 2500); return;
    }
    let userToken: string | null = null;
    const ipc = (window as any).ipcRenderer;
    if (ipc) {
      try {
        const accounts = await ipc.invoke("get-accounts");
        const cur = accounts.find((a: any) => a.nickname === currentUser && a.provider === currentProvider);
        userToken = cur?.token;
      } catch {}
    }
    socketRef.current?.emit("send_message", {
      message: newMessage, authorName: currentUser,
      token: userToken, provider: currentProvider || null, userId: null,
    });
    setNewMessage(""); setCooldown(3);
  };

  const openProfile = (nickname: string) => {
    if (userCacheRef.current[nickname]?.provider === "internal") {
      const ipc = (window as any).ipcRenderer;
      const url = `https://hardmonitoring.ru/profile/${nickname}`;
      ipc ? ipc.send("open-external-link", url) : window.open(url, "_blank");
    }
  };

  const canChat = currentUser && currentUser !== "Player" && currentUser.trim() !== "";

  return (
    <div className="flex flex-col h-full w-full relative" style={{ backgroundColor: "var(--color-bg-subtle)" }}>

      <div ref={scrollRef} onScroll={handleScroll}
           className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">

        {hasMore && (
          <div className="flex justify-center pb-1">
            <button onClick={loadMoreMessages} disabled={loadingMore}
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full disabled:opacity-30"
                    style={{ color: "var(--color-brand)", border: "1px solid var(--color-brand)", opacity: 0.6 }}>
              {loadingMore ? "Загрузка..." : "Загрузить ещё"}
            </button>
          </div>
        )}

        {messages.map((msg, i) => {
          const isMe = msg.authorName === currentUser;
          const profile = userCache[msg.authorName];
          const isRegistered = !!(msg.user || msg.userId || profile?.provider === "internal");
          const { textNodes, images } = renderMessageContent(msg.message);
          const isFirstUnread = unread > 0 && i === messages.length - unread;

          return (
            <React.Fragment key={msg._id || i}>
              {isFirstUnread && (
                <div className="flex items-center gap-2 py-1">
                  <div className="flex-1 h-px" style={{ background: "var(--color-brand)", opacity: 0.4 }} />
                  <span className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: "var(--color-brand)", opacity: 0.7 }}>
                    {unread} непрочитанных
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--color-brand)", opacity: 0.4 }} />
                </div>
              )}
              <div className={`flex items-start gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                <MessageAvatar msg={msg} />
                <div className={`flex flex-col max-w-[78%] ${isMe ? "items-end" : "items-start"}`}>
                  <div className={`flex items-center gap-1.5 mb-0.5 ${isMe ? "flex-row-reverse" : ""}`}>
                    {isRegistered
                      ? <button onClick={() => openProfile(msg.authorName)}
                                className="text-[10px] font-black hover:brightness-125 transition-all"
                                style={{ color: "var(--color-brand)" }}>{msg.authorName}</button>
                      : <span className="text-[10px] font-bold opacity-30" style={{ color: "var(--color-text)" }}>{msg.authorName}</span>
                    }
                    <span className="text-[8px] opacity-20" style={{ color: "var(--color-text)" }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className={`text-[12px] px-3 py-1.5 rounded-2xl leading-relaxed break-words shadow-sm border
                      ${isMe ? "rounded-tr-none" : "rounded-tl-none"}`}
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
            </React.Fragment>
          );
        })}
      </div>

      {(!atBottom || unread > 0) && (
        <button onClick={() => {
          scrollToBottom();
          setMessages(prev => {
            if (prev.length > 0) { lastReadIdRef.current = prev[prev.length-1]._id; saveLastReadId(lastReadIdRef.current!); }
            return prev;
          });
          setUnread(0); onUnreadChange?.(0);
        }}
          className="absolute right-4 bottom-[60px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg hover:brightness-110 active:scale-95 z-20"
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

      <div className="p-3 border-t flex-shrink-0 relative"
           style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
        {showEmoji && (
          <div className="absolute bottom-full left-2 right-2 p-2 rounded-t-xl border-x border-t flex flex-wrap gap-2 z-10"
               style={{ backgroundColor: "var(--color-bg-elevated)", borderColor: "var(--color-border)" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setNewMessage(p => p + e)}
                      className="hover:scale-125 transition-transform text-lg p-1">{e}</button>
            ))}
          </div>
        )}
        {urlError && (
          <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-red-400 opacity-80 text-center">
            Ссылки запрещены. Только изображения с Pinterest.
          </div>
        )}
        {canChat ? (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button type="button" onClick={() => setShowEmoji(!showEmoji)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
                    style={{ color: showEmoji ? "var(--color-brand)" : "var(--color-text-dim)" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <input value={newMessage} onChange={e => { setNewMessage(e.target.value); setUrlError(false); }}
                   placeholder={cooldown > 0 ? `Подождите ${cooldown}с...` : "Написать сообщение..."}
                   className="flex-1 border rounded-xl px-3 py-1.5 text-[12px] outline-none transition-all placeholder:opacity-20"
                   style={{
                     backgroundColor: "var(--color-bg-elevated)",
                     borderColor: urlError ? "rgba(248,113,113,0.5)" : "var(--color-border)",
                     color: "var(--color-text)",
                   }}
                   autoComplete="off" />
            <button type="submit" disabled={cooldown > 0 || !newMessage.trim()}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-20"
                    style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="text-center py-2 text-[10px] font-black uppercase tracking-widest opacity-20"
               style={{ color: "var(--color-text)" }}>
            Авторизуйтесь для доступа к чату
          </div>
        )}
      </div>
    </div>
  );
}