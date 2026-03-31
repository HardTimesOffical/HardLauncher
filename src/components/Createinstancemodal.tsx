import { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
  onCreated: (instanceId: string) => void;
}

type LoaderType = 'vanilla' | 'fabric' | 'forge';

const LOADER_LABELS: Record<LoaderType, string> = {
  vanilla: 'Vanilla',
  fabric:  'Fabric',
  forge:   'Forge',
};

const LOADER_COLORS: Record<LoaderType, string> = {
  vanilla: 'var(--color-brand)',
  fabric:  '#c4a86e',
  forge:   '#e07b39',
};

export default function CreateInstanceModal({ onClose, onCreated }: Props) {
  const ipc = (window as any).ipcRenderer;

  const [name, setName] = useState('');
  const [gameVersion, setGameVersion] = useState('');
  const [loaderType, setLoaderType] = useState<LoaderType>('vanilla');
  const [mcVersions, setMcVersions] = useState<string[]>([]);
  const [loadingMc, setLoadingMc] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoadingMc(true);
    ipc.invoke('get-mc-versions-for-instance').then((v: string[]) => {
      setMcVersions(v);
      if (v.length > 0) setGameVersion(v[0]);
      setLoadingMc(false);
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCreate = async () => {
    if (!name.trim()) { setError('Введите название'); return; }
    if (!gameVersion)  { setError('Выберите версию MC'); return; }

    setCreating(true);
    setError('');
    try {
      const result = await ipc.invoke('create-instance', {
        name: name.trim(),
        gameVersion,
        type: loaderType,
        // loaderVersion не передаём — main.ts подберёт автоматически
      });
      if (result.success) {
        onCreated(result.instanceId);
        onClose();
      } else {
        setError('Ошибка создания инстанса');
      }
    } catch (e: any) {
      setError(e.message || 'Неизвестная ошибка');
    }
    setCreating(false);
  };

  const accentColor = LOADER_COLORS[loaderType];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-[400px] animate-scale-in"
        style={{
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-accent)',
          borderRadius: '2px',
        }}
      >
        {/* Угловые акценты */}
        <div className="absolute top-0 left-0 w-4 h-4"
             style={{ borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}` }} />
        <div className="absolute bottom-0 right-0 w-4 h-4"
             style={{ borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}` }} />

        {/* Заголовок */}
        <div className="flex items-center justify-between px-4 py-3"
             style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-4" style={{ background: accentColor }} />
            <span className="font-mc text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--color-text)' }}>
              Новый инстанс
            </span>
          </div>
          <button onClick={onClose}
                  className="w-6 h-6 flex items-center justify-center transition-opacity opacity-40 hover:opacity-100"
                  style={{ color: 'var(--color-text)' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Контент */}
        <div className="p-4 flex flex-col gap-3">

          {/* Название */}
          <div className="flex flex-col gap-1">
            <label className="font-mc text-[9px] uppercase tracking-widest"
                   style={{ color: 'var(--color-text-dim)' }}>
              Название
            </label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="Название инстанса"
              maxLength={48}
              autoFocus
              className="w-full px-3 py-2 text-[11px] font-mc outline-none"
              style={{
                background: 'var(--color-bg-subtle)',
                border: `1px solid ${name ? accentColor + '80' : 'var(--color-border-accent)'}`,
                borderRadius: '2px',
                color: 'var(--color-text)',
              }}
            />
          </div>

          {/* Версия MC */}
          <div className="flex flex-col gap-1">
            <label className="font-mc text-[9px] uppercase tracking-widest"
                   style={{ color: 'var(--color-text-dim)' }}>
              Версия Minecraft
            </label>
            {loadingMc ? (
              <div className="font-mc text-[9px]" style={{ color: 'var(--color-text-dim)' }}>
                Загрузка...
              </div>
            ) : (
              <select
                value={gameVersion}
                onChange={e => setGameVersion(e.target.value)}
                className="w-full px-3 py-2 text-[11px] font-mc outline-none cursor-pointer"
                style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border-accent)',
                  borderRadius: '2px',
                  color: 'var(--color-text)',
                }}>
                {mcVersions.map(v => (
                  <option key={v} value={v} style={{ background: 'var(--color-bg-elevated)' }}>{v}</option>
                ))}
              </select>
            )}
          </div>

          {/* Тип лоадера */}
          <div className="flex flex-col gap-1">
            <label className="font-mc text-[9px] uppercase tracking-widest"
                   style={{ color: 'var(--color-text-dim)' }}>
              Загрузчик
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['vanilla', 'fabric', 'forge'] as LoaderType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setLoaderType(type)}
                  className="py-2 text-[9px] font-mc uppercase tracking-wider transition-all"
                  style={{
                    borderRadius: '2px',
                    border: `1px solid ${loaderType === type ? LOADER_COLORS[type] : 'var(--color-border-accent)'}`,
                    background: loaderType === type ? LOADER_COLORS[type] + '20' : 'var(--color-bg-subtle)',
                    color: loaderType === type ? LOADER_COLORS[type] : 'var(--color-text-dim)',
                  }}>
                  {LOADER_LABELS[type]}
                </button>
              ))}
            </div>
            {loaderType !== 'vanilla' && (
              <div className="font-mc text-[8px] mt-0.5" style={{ color: 'var(--color-text-dim)' }}>
                Последняя стабильная версия {LOADER_LABELS[loaderType]} для MC {gameVersion || '...'}
              </div>
            )}
          </div>

          {/* Превью */}
          {name && gameVersion && (
            <div className="px-3 py-2 font-mc text-[9px]"
                 style={{
                   background: 'var(--color-bg-subtle)',
                   border: '1px solid var(--color-border)',
                   borderRadius: '2px',
                   color: 'var(--color-text-dim)',
                 }}>
              <span style={{ color: accentColor }}>{name}</span>
              {' · '}
              <span style={{ color: 'var(--color-text)' }}>MC {gameVersion}</span>
              {' · '}
              <span style={{ color: accentColor }}>{LOADER_LABELS[loaderType]}</span>
            </div>
          )}

          {/* Ошибка */}
          {error && (
            <div className="px-3 py-2 font-mc text-[9px]"
                 style={{
                   background: 'rgba(192,57,43,0.1)',
                   border: '1px solid rgba(192,57,43,0.3)',
                   borderRadius: '2px',
                   color: 'var(--color-danger)',
                 }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Кнопки */}
        <div className="flex items-center justify-end gap-2 px-4 pb-4">
          <button onClick={onClose} className="btn-tactical" style={{ opacity: 0.5 }}>
            Отмена
          </button>
          <button
            onClick={handleCreate}
            disabled={creating || !name.trim() || !gameVersion}
            className="btn-tactical disabled:opacity-30"
            style={{ borderColor: accentColor, color: accentColor, background: accentColor + '15' }}>
            {creating ? (
              <>
                <span className="w-2 h-2 animate-pulse" style={{ background: accentColor }} />
                Создание...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Создать
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}