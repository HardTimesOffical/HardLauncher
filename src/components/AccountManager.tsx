import React, { useState, useEffect, useCallback } from 'react';
import SkinHead from './SkinHead';

interface Account {
  nickname: string;
  token?: string;
  provider?: 'ely' | 'internal';
  uuid?: string;
}

interface SelectedAccount {
  nickname: string;
  provider?: string;
}

interface AccountManagerProps {
  currentNickname: string;
  onSelect: (name: string, hasToken: boolean, provider?: string) => void;
  onOpenAuth: () => void;
}

const AccountManager: React.FC<AccountManagerProps> = ({ currentNickname, onSelect, onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selected, setSelected] = useState<SelectedAccount | null>(null);
  const [offlineInput, setOfflineInput] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const loadAccounts = useCallback(async () => {
    try {
      const ipc = (window as any).ipcRenderer;
      if (ipc) {
        const saved = await ipc.invoke('get-accounts');
        setAccounts(Array.isArray(saved) ? saved : []);
      }
    } catch (err) {
      console.error("Ошибка загрузки аккаунтов:", err);
    }
  }, []);

  useEffect(() => { loadAccounts(); }, [loadAccounts]);

  // Синхронизируем selected с currentNickname при загрузке
  useEffect(() => {
    if (accounts.length === 0) return;
    // Если already selected — не перезаписывай
    if (selected) return;
    
    const found = accounts.find(
      a => a.nickname === currentNickname && !!a.token
    );
    if (found) {
      setSelected({ nickname: found.nickname, provider: found.provider });
      setIsOfflineMode(false);
    }
  }, [accounts]);

  const selectedAccount = selected
    ? accounts.find(a => a.nickname === selected.nickname && a.provider === selected.provider)
    : null;

  const isOnline = !!selectedAccount?.token && !isOfflineMode;

  const handleSelectAccount = (acc: Account) => {
    setSelected({ nickname: acc.nickname, provider: acc.provider });
    setIsOfflineMode(false);
    onSelect(acc.nickname, !!acc.token, acc.provider);
    setIsOpen(false);
  };

  const handleOfflineMode = () => {
    setSelected(null);
    setIsOfflineMode(true);
    setOfflineInput('');
    onSelect('', false, undefined);
    setIsOpen(false);
  };

  const handleOfflineInput = (val: string) => {
    setOfflineInput(val);
    onSelect(val, false, undefined);
  };

  const ProviderBadge = ({ provider }: { provider?: string }) => {
    if (provider === 'ely') return (
      <span className="text-[6px] uppercase bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold tracking-tighter flex-shrink-0">
        Ely.by
      </span>
    );
    if (provider === 'internal') return (
      <span className="text-[6px] uppercase bg-[#1bd96a]/20 text-[#1bd96a] px-1.5 py-0.5 rounded font-bold tracking-tighter flex-shrink-0">
        Hard Times
      </span>
    );
    return null;
  };

  return (
    <div className="flex flex-col gap-1 relative z-[100] w-full">
      <span className="text-[8px] uppercase font-bold text-white/20 tracking-[0.2em] ml-1">Аккаунт</span>

      <div className="flex items-center gap-1.5 h-9">
        
        {/* Инпут — офлайн или отображение выбранного */}
        <div className="relative flex-1 h-full">
          {isOfflineMode ? (
            <input
              autoFocus
              value={offlineInput}
              onChange={(e) => handleOfflineInput(e.target.value)}
              placeholder="Введите никнейм..."
              className="w-full h-full bg-white/[0.02] border border-white/10 rounded-lg px-3 text-[11px] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/15"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center gap-2 px-3 rounded-lg border transition-all cursor-pointer
                ${isOnline
                  ? 'bg-[#1bd96a]/5 border-[#1bd96a]/20'
                  : 'bg-white/[0.02] border-white/10'
                }`}
              onClick={() => { loadAccounts(); setIsOpen(!isOpen); }}
            >
              {selectedAccount ? (
                <>
                  <SkinHead
                    nickname={selectedAccount.nickname}
                    provider={selectedAccount.provider}
                    size={20}
                    className="rounded"
                  />
                  <span className="text-[11px] text-white/80 flex-1 truncate">{selectedAccount.nickname}</span>
                  <ProviderBadge provider={selectedAccount.provider} />
                </>
              ) : (
                <span className="text-[11px] text-white/20">Выберите аккаунт...</span>
              )}
            </div>
          )}

          {/* Онлайн индикатор */}
          {!isOfflineMode && (
            <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full flex-shrink-0
              ${isOnline ? 'bg-[#1bd96a] shadow-[0_0_6px_#1bd96a]' : 'bg-white/15'}`}
            />
          )}
        </div>

        {/* Кнопка открытия дропдауна */}
        <button
          onClick={() => { loadAccounts(); setIsOpen(!isOpen); }}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all flex-shrink-0
            ${isOpen
              ? 'bg-[#1bd96a]/15 border-[#1bd96a]/30 text-[#1bd96a]'
              : 'bg-white/[0.03] border-white/[0.06] text-white/30 hover:text-white/60 hover:bg-white/[0.06]'
            }`}
        >
          <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Дропдаун */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-full min-w-[220px] bg-[#111] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-[200] animate-fade-in">
          
          {/* Список аккаунтов */}
          <div className="max-h-48 overflow-y-auto">
            {accounts.length > 0 ? (
              <>
                <div className="px-3 pt-2 pb-1">
                  <span className="text-[8px] uppercase text-white/20 tracking-widest">Сохранённые аккаунты</span>
                </div>
                {accounts.map((acc, index) => {
                  const isActive = selected?.nickname === acc.nickname && selected?.provider === acc.provider;
                  return (
                    <div
                      key={`${acc.nickname}-${acc.provider}-${index}`}
                      onClick={() => handleSelectAccount(acc)}
                      className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer transition-colors
                        ${isActive ? 'bg-[#1bd96a]/10' : 'hover:bg-white/[0.04]'}`}
                    >
                      <SkinHead
                        nickname={acc.nickname}
                        provider={acc.provider}
                        size={24}
                        className="rounded"
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className={`text-[11px] truncate ${isActive ? 'text-[#1bd96a]' : 'text-white/70'}`}>
                          {acc.nickname}
                        </span>
                        <ProviderBadge provider={acc.provider} />
                      </div>
                      {isActive && (
                        <svg className="w-3 h-3 text-[#1bd96a] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="py-6 text-center text-[9px] text-white/20 uppercase tracking-widest">
                Нет аккаунтов
              </div>
            )}
          </div>

          {/* Разделитель */}
          <div className="border-t border-white/[0.06] mx-2" />

          {/* Офлайн режим */}
          <div className="p-2 flex flex-col gap-1">
            <button
              onClick={handleOfflineMode}
              className={`w-full py-2 px-3 rounded-lg text-[9px] uppercase font-bold tracking-wider transition-all text-left
                ${isOfflineMode
                  ? 'bg-white/[0.06] text-white/60'
                  : 'text-white/25 hover:text-white/50 hover:bg-white/[0.03]'
                }`}
            >
              {isOfflineMode ? '← Ввод никнейма (офлайн)' : 'Войти без аккаунта'}
            </button>
            <button
              onClick={() => { onOpenAuth(); setIsOpen(false); }}
              className="w-full py-2 px-3 rounded-lg bg-[#1bd96a]/90 hover:bg-[#1bd96a] text-black text-[9px] font-black uppercase tracking-wider transition-all"
            >
              + Добавить аккаунт
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;