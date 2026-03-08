import React, { useState, useEffect, useCallback } from 'react';

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
  const [offlineInput, setOfflineInput] = useState(() => {
    return localStorage.getItem('offline-nickname') || '';
  });
  const [isOfflineMode, setIsOfflineMode] = useState(() => {
    return !!localStorage.getItem('offline-nickname');
  });

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
    if (accounts.length === 0) {
      const savedOffline = localStorage.getItem('offline-nickname');
      if (savedOffline && !selected) {
        setIsOfflineMode(true);
        setOfflineInput(savedOffline);
        onSelect(savedOffline, false, undefined);
      }
      return;
    }
    if (selected) return;

    const found = accounts.find(a => a.nickname === currentNickname && !!a.token);
    if (found) {
      setSelected({ nickname: found.nickname, provider: found.provider });
      setIsOfflineMode(false);
      localStorage.removeItem('offline-nickname'); // чистим если вошли в аккаунт
    } else {
      const savedOffline = localStorage.getItem('offline-nickname');
      if (savedOffline) {
        setIsOfflineMode(true);
        setOfflineInput(savedOffline);
        onSelect(savedOffline, false, undefined);
      }
    }
  }, [accounts]);

  const selectedAccount = selected
    ? accounts.find(a => a.nickname === selected.nickname && a.provider === selected.provider)
    : null;


  const handleSelectAccount = (acc: Account) => {
    setSelected({ nickname: acc.nickname, provider: acc.provider });
    setIsOfflineMode(false);
    onSelect(acc.nickname, !!acc.token, acc.provider);
    setIsOpen(false);
  };
  

  const handleOfflineMode = () => {
    setSelected(null);
    setIsOfflineMode(true);
    const savedNick = localStorage.getItem('offline-nickname') || '';
    setOfflineInput(savedNick);
    onSelect(savedNick, false, undefined);
    setIsOpen(false);
  };

  const handleOfflineInput = (val: string) => {
    setOfflineInput(val);
    onSelect(val, false, undefined);
    localStorage.setItem('offline-nickname', val); // ← сохраняем
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
      <span className="text-[8px] uppercase font-bold tracking-[0.2em] ml-1 opacity-50" style={{ color: 'var(--color-text)' }}>
        Аккаунт
      </span>

      <div className="flex items-center gap-1.5 h-9">
        <div className="relative flex-1 h-full">
          {isOfflineMode ? (
            <input
              autoFocus
              value={offlineInput}
              onChange={(e) => handleOfflineInput(e.target.value)}
              placeholder="Введите никнейм..."
              className="w-full h-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-lg px-3 text-[11px] focus:outline-none focus:border-[var(--color-brand)] transition-all placeholder:opacity-30"
              style={{ color: 'var(--color-text)' }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-between gap-3 px-3 rounded-lg border transition-all cursor-pointer hover:bg-[var(--color-bg-subtle)]"
              style={{ 
                backgroundColor: 'var(--color-bg-subtle)',
                borderColor:'var(--color-border)'
              }}
              onClick={() => { loadAccounts(); setIsOpen(!isOpen); }}
            >
              <span className="text-[11px] truncate font-medium" style={{ color: 'var(--color-text)' }}>
                {selectedAccount ? selectedAccount.nickname : 'Выберите аккаунт...'}
              </span>
              {selectedAccount && <ProviderBadge provider={selectedAccount.provider} />}
            </div>
          )}
        </div>

        <button
          onClick={() => { loadAccounts(); setIsOpen(!isOpen); }}
          className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all flex-shrink-0"
          style={{ 
            backgroundColor: isOpen ? 'var(--color-brand-dim)' : 'var(--color-bg-subtle)',
            borderColor: isOpen ? 'var(--color-brand)' : 'var(--color-border)',
            color: isOpen ? 'var(--color-brand)' : 'var(--color-text)'
          }}
        >
          <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-full min-w-[220px] border rounded-xl shadow-2xl overflow-hidden z-[200] animate-fade-in"
          style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
          
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            {accounts.length > 0 ? (
              <>
                <div className="px-3 pt-3 pb-1">
                  {/* Исправлен контраст заголовка */}
                  <span className="text-[9px] uppercase font-black tracking-widest opacity-60" style={{ color: 'var(--color-text)' }}>
                    Сохранённые аккаунты
                  </span>
                </div>
                {accounts.map((acc, index) => {
                  const isActive = selected?.nickname === acc.nickname && selected?.provider === acc.provider;
                  return (
                    <div
                      key={`${acc.nickname}-${acc.provider}-${index}`}
                      onClick={() => handleSelectAccount(acc)}
                      className="flex items-center justify-between gap-4 px-3 py-2.5 cursor-pointer transition-colors"
                      style={{ backgroundColor: isActive ? 'var(--color-brand-dim)' : 'transparent' }}
                    >
                      <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                        <span className="text-[11px] truncate font-bold" style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-text)' }}>
                          {acc.nickname}
                        </span>
                        <ProviderBadge provider={acc.provider} />
                      </div>
                      {isActive && (
                        <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-brand)' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="py-8 text-center text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ color: 'var(--color-text)' }}>
                Нет аккаунтов
              </div>
            )}
          </div>

          <div className="border-t mx-2" style={{ borderColor: 'var(--color-border)' }} />

          <div className="p-2 flex flex-col gap-1.5">
            {!isOfflineMode && (
              <button
                onClick={handleOfflineMode}
                className="w-full py-2.5 px-3 rounded-lg text-[9px] uppercase font-black tracking-wider transition-all text-left hover:bg-[var(--color-bg-subtle)]"
                style={{ color: 'var(--color-text-dim)' }}
              >
                Войти без аккаунта
              </button>
            )}
            <button
              onClick={() => { onOpenAuth(); setIsOpen(false); }}
              className="w-full py-2.5 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-sm"
              style={{ 
                backgroundColor: 'var(--color-brand)', 
                color: '#fff' 
              }}
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