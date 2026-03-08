import React, { useState, useEffect } from "react";
import SkinHead from "../components/SkinHead";

interface ActiveAccount {
  nickname: string;
  provider: 'internal' | 'ely' | 'offline';
  token?: string;
}

interface ProfilePageProps {
  account: ActiveAccount;
  onGoToAuth?: () => void; // ← добавь
}

const ProfilePage: React.FC<ProfilePageProps> = ({ account, onGoToAuth }) => {
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
    <div className="w-full max-w-4xl min-h-[400px] animate-in fade-in zoom-in-95 duration-500">
  <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full">

    {/* ШАПКА — Градиент и Блюр */}
    <div className="relative h-32 flex-shrink-0 bg-gradient-to-r from-[var(--color-brand)]/10 to-transparent border-b border-white/5">
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: account.provider !== 'offline' ? `url(${avatarUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Статус Провайдера */}
      <div className="absolute top-6 right-6 z-10">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md font-black text-[9px] uppercase tracking-widest ${providerColor.bg} ${providerColor.border} ${providerColor.text}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {providerColor.label}
        </div>
      </div>
    </div>

    {/* ОСНОВНОЙ КОНТЕНТ */}
    <div className="flex flex-1 flex-col md:flex-row min-h-0">
      
      {/* ЛЕВАЯ ЧАСТЬ — Персонаж */}
      <div className="w-full md:w-64 p-8 flex flex-col items-center gap-6 border-r border-white/5 bg-white/[0.02]">
        
        {/* Аватар в большой раме */}
        <div className="relative -mt-20">
          <div className="w-28 h-28 rounded-[1rem] overflow-hidden border-4 border-[#0a0a0a] shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#050505]">
            <SkinHead
              nickname={account.nickname}
              provider={account.provider}
              size={105}
              className="w-full h-full transform transition-transform hover:scale-110 duration-500"
            />
          </div>
          {/* Статус-точка */}
          <div className={`absolute bottom-1 right-2 w-6 h-6 rounded-full border-4 border-[#0a0a0a] shadow-xl
            ${account.provider !== 'offline' ? 'bg-[var(--color-brand)]' : 'bg-white/20'}`}
          />
        </div>

        {/* Имя и Роль */}
        <div className="text-center w-full">
          <h2 className="text-xl font-black text-white tracking-tight uppercase mb-1 drop-shadow-md">
            {userData.username}
          </h2>
          <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-lg bg-white/5 border border-white/10 ${providerColor.text} uppercase tracking-tighter`}>
            {userData.role}
          </span>
        </div>

        {/* Управление скином */}
        {account.provider !== 'offline' && (
          <button
            onClick={handleManageSkin}
            className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-[var(--color-brand)] hover:text-black hover:border-[var(--color-brand)] transition-all active:scale-95 shadow-lg"
          >
            Настроить облик
          </button>
        )}
      </div>

      {/* ПРАВАЯ ЧАСТЬ — Инфо и Статистика */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {loading ? (
          /* ВИДИМАЯ ЗАГРУЗКА — Скелетон или Спиннер */
          <div className="h-full flex flex-col items-center justify-center gap-4 opacity-50">
            <div className="w-12 h-12 border-2 border-[var(--color-brand)]/20 border-t-[var(--color-brand)] rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 animate-pulse">
              Синхронизация данных...
            </span>
          </div>
        ) : account.provider === 'offline' ? (
          /* ОФЛАЙН РЕЖИМ */
          <div className="h-full flex flex-col items-center justify-center text-center gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 border-dashed">
               <p className="text-white/20 text-xs font-medium max-w-[240px]">
                Для просмотра детальной статистики и управления балансом требуется авторизация
              </p>
            </div>
            <button
              onClick={onGoToAuth}
              className="px-10 py-3 rounded-xl bg-[var(--color-brand)] text-black text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(var(--color-brand-rgb),0.3)]"
            >
              Войти сейчас
            </button>
          </div>
        ) : (
          /* ДАННЫЕ ПРОФИЛЯ */
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Карточка: Баланс */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[var(--color-brand)]/30 transition-colors group">
                <p className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-2">Доступные средства</p>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black tracking-tighter ${account.provider === 'internal' ? 'text-white' : 'text-white/10'}`}>
                    {account.provider === 'internal' ? userData.balance : '—'}
                  </span>
                  <div className="text-[10px] font-bold text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-2 py-0.5 rounded">
                    HT COINS
                  </div>
                </div>
              </div>

              {/* Карточка: Аккаунт */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
                <p className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-2">Тип сессии</p>
                <p className="text-sm font-black text-white/80 uppercase tracking-tight">
                  {account.provider === 'ely' ? 'Ely.by Network' : 'HardSocial'}
                </p>
                <div className="mt-2 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                   <div className="bg-[var(--color-brand)] h-full w-full opacity-50" />
                </div>
              </div>
            </div>

            {/* Системное сообщение */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group">
               <h4 className="text-[10px] font-black text-white/60 uppercase mb-2">Статус синхронизации</h4>
               <p className="text-[11px] text-white/30 leading-relaxed font-medium">
                 {account.provider === 'ely' 
                   ? "Ваш профиль привязан к внешней сети. Скины и плащи обновляются через панель управления Ely.by и синхронизируются автоматически."
                   : "Вы используете локальную учетную запись. Все данные хранятся на серверах Hard Times и доступны только в этом лаунчере."}
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default ProfilePage;