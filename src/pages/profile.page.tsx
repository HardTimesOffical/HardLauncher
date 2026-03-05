import React, { useState, useEffect } from "react";
import SkinHead from "../components/SkinHead";

interface ActiveAccount {
  nickname: string;
  provider: 'internal' | 'ely' | 'offline';
  token?: string;
}

interface ProfilePageProps {
  account: ActiveAccount;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ account }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  setLoading(true);

  if (account.provider === 'offline') {
    setUserData({ username: account.nickname || 'Гость', role: 'Оффлайн', isOffline: true });
    setLoading(false);
    return;
  }

  if (account.provider === 'ely') {
    setUserData({ username: account.nickname, role: 'Ely.by Network', provider: 'ely' });
    setLoading(false);
    return;
  }

  // internal — тянем с сервера
  fetch(`https://hardtimes-server-1.onrender.com/users/${account.nickname}`)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      setUserData({
        username: data?.username || account.nickname,
        role: 'Hard Times',
        provider: 'internal',
        balance: data?.balance ?? 0,
        avatar: data?.avatar || null,
        votesTotal: data?.votesTotal ?? 0,
        votesWeekly: data?.votesWeekly ?? 0,
      });
    })
    .catch(() => {
      setUserData({ username: account.nickname, role: 'Hard Times', provider: 'internal', balance: 0 });
    })
    .finally(() => setLoading(false));

}, [account]);

  const handleManageSkin = () => {
    if (account.provider === 'ely') {
      window.ipcRenderer.send('open-external-link', 'https://ely.by/skins');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-white/20 text-xs uppercase tracking-widest animate-pulse">Загрузка...</div>
    </div>
  );

  const avatarUrl = account.provider === 'ely'
    ? `https://skinsystem.ely.by/skins/${account.nickname}.png`
    : `https://minotar.net/helm/${account.nickname || 'char'}/128.png`;

  const providerColor = {
    ely: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', label: 'Ely.by' },
    internal: { bg: 'bg-[#1bd96a]/10', border: 'border-[#1bd96a]/20', text: 'text-[#1bd96a]', label: 'Hard Times' },
    offline: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/40', label: 'Offline' },
  }[account.provider];

  return (
    <div className="w-full max-w-3xl animate-scale-in">
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">

        {/* ШАПКА */}
        <div className="relative h-24 bg-gradient-to-br from-[#141414] to-[#0d0d0d] border-b border-white/[0.06]">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: account.provider !== 'offline'
                ? `url(${avatarUrl})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
            }}
          />
          <div className="absolute inset-0 bg-[#111]/60" />

          {/* Бейдж провайдера */}
          <div className="absolute top-4 right-4">
            <span className={`text-[9px] px-2 py-1 rounded-full border font-bold uppercase tracking-wider ${providerColor.bg} ${providerColor.border} ${providerColor.text}`}>
              {providerColor.label}
            </span>
          </div>
        </div>

        {/* КОНТЕНТ */}
        <div className="flex gap-0">
          
          {/* ЛЕВАЯ КОЛОНКА — Аватар */}
          <div className="w-48 p-6 flex flex-col items-center gap-4 border-r border-white/[0.06]">
            
            {/* Аватар */}
            <div className="relative -mt-12">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#111] shadow-2xl bg-black">
                <SkinHead
                nickname={account.nickname}
                provider={account.provider}
                size={80}
                className="w-full h-full rounded-2xl"
                />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#111]
                ${account.provider !== 'offline' ? 'bg-[#1bd96a]' : 'bg-white/20'}`}
            />
              {/* Онлайн индикатор */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#111]
                ${account.provider !== 'offline' ? 'bg-[#1bd96a]' : 'bg-white/20'}`}
              />
            </div>

            {/* Имя */}
            <div className="text-center">
              <h2 className="text-sm font-bold text-white">{userData.username}</h2>
              <p className={`text-[9px] mt-0.5 ${providerColor.text}`}>{userData.role}</p>
            </div>

            {/* Кнопка скина */}
            {account.provider !== 'offline' && (
              <button
                onClick={handleManageSkin}
                className={`w-full py-2 px-3 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all
                  ${account.provider === 'ely'
                    ? 'border-blue-500/20 text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30'
                    : 'border-white/10 text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                  }`}
              >
                {account.provider === 'ely' ? 'Изменить скин' : 'Загрузить скин'}
              </button>
            )}
          </div>

          {/* ПРАВАЯ КОЛОНКА — Инфо */}
          <div className="flex-1 p-6 flex flex-col gap-4">

            {account.provider === 'offline' ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-[11px] text-white/30 leading-relaxed max-w-xs">
                  Вы играете в офлайн режиме. Войдите через Ely.by или Hard Times для доступа к профилю.
                </p>
                <button
                  onClick={() => window.ipcRenderer.send('tab-change', 'auth')}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#1bd96a]/10 border border-[#1bd96a]/20 text-[#1bd96a] text-[10px] font-bold uppercase tracking-wider hover:bg-[#1bd96a]/15 transition-all"
                >
                  Войти в аккаунт
                </button>
              </div>
            ) : (
              <>
                {/* Карточки статистики */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-[8px] text-white/25 uppercase tracking-widest mb-1">Баланс</p>
                    <p className={`text-2xl font-mono font-bold ${account.provider === 'internal' ? 'text-[#1bd96a]' : 'text-white/20'}`}>
                      {account.provider === 'internal' ? `${userData.balance}` : '—'}
                    </p>
                    {account.provider === 'internal' && (
                      <p className="text-[8px] text-white/20 mt-0.5">кристаллов</p>
                    )}
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-[8px] text-white/25 uppercase tracking-widest mb-1">Сеть</p>
                    <p className="text-[11px] text-white/60 font-bold mt-1">
                      {account.provider === 'ely' ? 'Ely.by Network' : 'Hard Times'}
                    </p>
                  </div>
                </div>

                {/* Инфо блок */}
                <div className={`rounded-xl p-4 border ${providerColor.bg} ${providerColor.border}`}>
                  {account.provider === 'ely' ? (
                    <div>
                      <p className={`text-[10px] font-bold mb-1 ${providerColor.text}`}>Внешняя авторизация</p>
                      <p className="text-[10px] text-white/30 leading-relaxed">
                        Управление скинами, плащами и паролем — в личном кабинете Ely.by. Изменения применятся при следующем запуске игры.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className={`text-[10px] font-bold mb-1 ${providerColor.text}`}>Hard Times аккаунт</p>
                      <p className="text-[10px] text-white/30 leading-relaxed">
                        Полная статистика и достижения будут доступны после запуска основного сервера.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;