import { useState, useEffect, useCallback, useRef } from 'react';

const MODRINTH_API = 'https://api.modrinth.com/v2';

type ContentType = 'mod' | 'resourcepack' | 'modpack' | 'shader';

interface ModrinthProject {
  project_id: string;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  downloads: number;
  follows: number;
  icon_url: string | null;
  date_modified: string;
  project_type: string;
  featured_gallery?: string | null;
}

interface ModrinthVersion {
  id: string;
  name: string;
  version_number: string;
  game_versions: string[];
  loaders: string[];
  files: { url: string; filename: string; primary: boolean }[];
  downloads: number;
  date_published: string;
}

interface GameInstance {
  id: string;
  name: string;
  type: string;
  gameVersion: string;
  iconUrl?: string;
  lastPlayed?: string;
}

interface InstallProgress {
  stage: string;
  message: string;
  percent: number;
}

interface ModrinthCategory {
  name: string;
  project_type: string;
  header: string;
}

// ── SVG иконки ───────────────────────────────────────────────
const Icons = {
  mod: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
  modpack: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  resourcepack: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  shader: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  download: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  play: (
    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  trash: (
    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  close: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  check: (
    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  search: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  instance: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  ),
  globe: (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  ),
};

const CONTENT_TABS: { id: ContentType; label: string; icon: React.ReactNode }[] = [
  { id: 'mod',          label: 'Моды',       icon: Icons.mod },
  { id: 'modpack',      label: 'Модпаки',    icon: Icons.modpack },
  { id: 'resourcepack', label: 'Ресурспаки', icon: Icons.resourcepack },
  { id: 'shader',       label: 'Шейдеры',    icon: Icons.shader },
];

const SORT_OPTIONS = [
  { value: 'downloads',  label: 'Загрузки' },
  { value: 'follows',    label: 'Подписчики' },
  { value: 'newest',     label: 'Новые' },
  { value: 'updated',    label: 'Обновлённые' },
  { value: 'relevance',  label: 'Релевантность' },
];

const LOADER_CATEGORIES = new Set(['fabric', 'forge', 'neoforge', 'quilt', 'liteloader', 'modloader', 'rift', 'bukkit', 'folia', 'paper', 'purpur', 'spigot', 'sponge', 'bungeecord', 'waterfall', 'velocity', 'datapack']);

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0)   return 'сегодня';
  if (days < 7)     return `${days}д назад`;
  if (days < 30)    return `${Math.floor(days / 7)}н назад`;
  if (days < 365)   return `${Math.floor(days / 30)}мес назад`;
  return `${Math.floor(days / 365)}г назад`;
}

const loaderStyle = (l: string) => {
  if (l === 'fabric')   return { bg: 'rgba(250,204,21,0.08)',  text: 'rgba(250,204,21,0.75)',  border: 'rgba(250,204,21,0.2)' };
  if (l === 'forge')    return { bg: 'rgba(251,146,60,0.08)',  text: 'rgba(251,146,60,0.75)',  border: 'rgba(251,146,60,0.2)' };
  if (l === 'neoforge') return { bg: 'rgba(248,113,113,0.08)', text: 'rgba(248,113,113,0.75)', border: 'rgba(248,113,113,0.2)' };
  if (l === 'quilt')    return { bg: 'rgba(167,139,250,0.08)', text: 'rgba(167,139,250,0.75)', border: 'rgba(167,139,250,0.2)' };
  return { bg: 'var(--color-bg-subtle)', text: 'var(--color-text-dim)', border: 'var(--color-border)' };
};

// ─── Custom Select ───────────────────────────────────────────
function CustomSelect({ value, onChange, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative no-drag" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-medium transition-all min-w-[120px]"
        style={{
          backgroundColor: open ? 'var(--color-bg-subtle)' : 'var(--color-bg-elevated)',
          borderColor: open ? 'var(--color-brand)' : 'var(--color-border)',
          color: 'var(--color-text-dim)',
        }}
      >
        <span className="flex-1 text-left truncate">{selected?.label || placeholder || 'Выбрать'}</span>
        <svg className="w-2.5 h-2.5 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none', color: open ? 'var(--color-brand)' : 'var(--color-text-dim)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 min-w-full rounded-xl border shadow-2xl z-[500] overflow-hidden animate-in"
          style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
          {placeholder && (
            <div onClick={() => { onChange(''); setOpen(false); }}
              className="px-3 py-2 text-[10px] cursor-pointer"
              style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}>
              {placeholder}
            </div>
          )}
          {options.map(opt => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              className="px-3 py-2 text-[10px] cursor-pointer flex items-center justify-between gap-2"
              style={{
                backgroundColor: value === opt.value ? 'var(--color-brand-dim)' : 'transparent',
                color: value === opt.value ? 'var(--color-brand)' : 'var(--color-text)',
              }}
              onMouseEnter={e => { if (value !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'; }}
              onMouseLeave={e => { if (value !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}>
              <span className="whitespace-nowrap">{opt.label}</span>
              {value === opt.value && <span style={{ color: 'var(--color-brand)' }}>{Icons.check}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Instance Selector ──────────────────────────────────────
// Показывает глобальную установку + список инстансов
function InstanceSelector({ instances, selected, onChange, isModpack }: {
  instances: GameInstance[];
  selected: string;
  onChange: (v: string) => void;
  isModpack: boolean;
}) {
  if (isModpack || instances.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span style={{ color: 'var(--color-brand)' }}>{Icons.instance}</span>
        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-dim)' }}>
          Установить в
        </span>
      </div>

      {/* Глобально */}
      <button
        onClick={() => onChange('')}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left"
        style={{
          backgroundColor: !selected ? 'var(--color-brand-dim)' : 'var(--color-bg-subtle)',
          borderColor: !selected ? 'var(--color-brand)' : 'var(--color-border)',
        }}
      >
        <span style={{ color: !selected ? 'var(--color-brand)' : 'var(--color-text-dim)' }}>{Icons.globe}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold" style={{ color: !selected ? 'var(--color-brand)' : 'var(--color-text)' }}>
            Глобально
          </p>
          <p className="text-[8px]" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
            Общая папка mods
          </p>
        </div>
        {!selected && <span style={{ color: 'var(--color-brand)' }}>{Icons.check}</span>}
      </button>

      {/* Инстансы */}
      <div className="flex flex-col gap-1">
        {instances.map(inst => {
          const isSelected = selected === inst.id;
          return (
            <button
              key={inst.id}
              onClick={() => onChange(inst.id)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left"
              style={{
                backgroundColor: isSelected ? 'var(--color-brand-dim)' : 'transparent',
                borderColor: isSelected ? 'var(--color-brand)' : 'var(--color-border)',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'; }}
              onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              {inst.iconUrl ? (
                <img src={inst.iconUrl} className="w-5 h-5 rounded object-cover flex-shrink-0" alt="" />
              ) : (
                <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>{Icons.instance}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold truncate"
                   style={{ color: isSelected ? 'var(--color-brand)' : 'var(--color-text)' }}>
                  {inst.name}
                </p>
                <p className="text-[8px]" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
                  {inst.type} · MC {inst.gameVersion}
                </p>
              </div>
              {isSelected && <span style={{ color: 'var(--color-brand)' }}>{Icons.check}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Project Detail Panel ────────────────────────────────────
function ProjectDetailPanel({ project, instances, onClose, onInstallMod, onInstallModpack }: {
  project: ModrinthProject;
  instances: GameInstance[];
  onClose: () => void;
  onInstallMod: (url: string, filename: string, instanceId?: string) => void;
  onInstallModpack: (mrpackUrl: string, versionId: string) => void;
}) {
  const [versions, setVersions]           = useState<ModrinthVersion[]>([]);
  const [loading, setLoading]             = useState(true);
  const [gameFilter, setGameFilter]       = useState('');
  const [loaderFilter, setLoaderFilter]   = useState('');
  const [selectedInstance, setSelectedInstance] = useState('');
  const [tab, setTab]                     = useState<'versions' | 'info'>('info');
  const isModpack = project.project_type === 'modpack';

  useEffect(() => {
    fetch(`${MODRINTH_API}/project/${project.project_id}/version`)
      .then(r => r.json())
      .then(data => { setVersions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [project.project_id]);

  const gameVersions = [...new Set(versions.flatMap(v => v.game_versions))].sort().reverse();
  const loaders      = [...new Set(versions.flatMap(v => v.loaders))];

  const filtered = versions.filter(v => {
    if (gameFilter   && !v.game_versions.includes(gameFilter))   return false;
    if (loaderFilter && !v.loaders.includes(loaderFilter))       return false;
    return true;
  });

  const displayCategories = project.categories.filter(c => !LOADER_CATEGORIES.has(c));
  const displayLoaders    = project.categories.filter(c => LOADER_CATEGORIES.has(c)).slice(0, 4);

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl border flex flex-col"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}>

        {/* Gallery / Header */}
        <div className="relative flex-shrink-0">
          {project.featured_gallery ? (
            <div className="h-32 overflow-hidden relative">
              <img src={project.featured_gallery} className="w-full h-full object-cover" alt=""
                onError={e => { (e.target as any).style.display = 'none'; }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-bg-elevated) 10%, transparent 60%)' }} />
            </div>
          ) : (
            <div className="h-2" style={{ backgroundColor: 'var(--color-brand)', opacity: 0.4 }} />
          )}
          <div className={`flex items-end gap-4 px-5 pb-4 ${project.featured_gallery ? 'absolute bottom-0 left-0 right-0' : 'pt-4'}`}>
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 flex-shrink-0 flex items-center justify-center shadow-lg"
              style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
              {project.icon_url
                ? <img src={project.icon_url} className="w-full h-full object-cover" alt="" onError={e => { (e.target as any).style.display = 'none'; }} />
                : <span style={{ color: 'var(--color-brand)', opacity: 0.5 }}>{isModpack ? Icons.modpack : Icons.mod}</span>}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h2 className="text-[15px] font-black truncate" style={{ color: 'var(--color-text)' }}>{project.title}</h2>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-[10px]" style={{ color: 'var(--color-text-dim)' }}>{formatNumber(project.downloads)} загрузок</span>
                <span className="text-[10px]" style={{ color: 'var(--color-text-dim)' }}>{formatNumber(project.follows)} подписчиков</span>
                <span className="text-[9px]" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>{timeAgo(project.date_modified)}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg mb-1 flex-shrink-0 transition-all border"
              style={{ color: 'var(--color-text-dim)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
              {Icons.close}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b flex-shrink-0 px-5 gap-1" style={{ borderColor: 'var(--color-border)' }}>
          {(['info', 'versions'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all"
              style={{
                borderBottomColor: tab === t ? 'var(--color-brand)' : 'transparent',
                color: tab === t ? 'var(--color-brand)' : 'var(--color-text-dim)',
              }}>
              {t === 'info' ? 'О проекте' : `Версии (${versions.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* INFO TAB */}
          {tab === 'info' && (
            <div className="p-5 flex flex-col gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>Описание</p>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text)' }}>{project.description}</p>
              </div>

              {displayLoaders.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>Загрузчики</p>
                  <div className="flex flex-wrap gap-1.5">
                    {displayLoaders.map(l => { const s = loaderStyle(l); return (
                      <span key={l} className="text-[10px] px-2.5 py-1 rounded-lg border font-bold capitalize"
                        style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}>{l}</span>
                    ); })}
                  </div>
                </div>
              )}

              {displayCategories.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>Категории</p>
                  <div className="flex flex-wrap gap-1.5">
                    {displayCategories.map(c => (
                      <span key={c} className="text-[10px] px-2.5 py-1 rounded-lg border capitalize"
                        style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-dim)', borderColor: 'var(--color-border)' }}>{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Выбор инстанса на вкладке info */}
              {!isModpack && instances.length > 0 && (
                <InstanceSelector
                  instances={instances}
                  selected={selectedInstance}
                  onChange={setSelectedInstance}
                  isModpack={false}
                />
              )}

              <button onClick={() => setTab('versions')}
                className="w-full py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all mt-1 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-brand-dim)', borderColor: 'var(--color-brand)', color: 'var(--color-brand)' }}>
                Выбрать версию для установки
                {Icons.arrow}
              </button>
            </div>
          )}

          {/* VERSIONS TAB */}
          {tab === 'versions' && (
            <div className="flex flex-col">
              {/* Выбор инстанса + фильтры */}
              <div className="px-4 py-3 border-b flex flex-col gap-2"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>

                {/* Выбор инстанса */}
                {!isModpack && instances.length > 0 && (
                  <InstanceSelector
                    instances={instances}
                    selected={selectedInstance}
                    onChange={setSelectedInstance}
                    isModpack={false}
                  />
                )}

                {/* Фильтры версий */}
                <div className="flex flex-wrap gap-2 items-center">
                  <CustomSelect value={gameFilter} onChange={setGameFilter} placeholder="Все версии MC"
                    options={gameVersions.slice(0, 25).map(v => ({ value: v, label: v }))} />
                  {loaders.length > 1 && (
                    <CustomSelect value={loaderFilter} onChange={setLoaderFilter} placeholder="Все загрузчики"
                      options={loaders.map(l => ({ value: l, label: l }))} />
                  )}
                  <span className="text-[9px] ml-auto" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
                    {filtered.length} версий
                  </span>
                </div>
              </div>

              {/* Список версий */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-5 h-5 border-2 rounded-full animate-spin"
                    style={{ borderColor: 'var(--color-brand-dim)', borderTopColor: 'var(--color-brand)' }} />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-10 text-[11px]" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
                  Версии не найдены
                </div>
              ) : filtered.slice(0, 50).map(ver => {
                const primaryFile = ver.files.find(f => f.primary) || ver.files[0];
                const mrpackFile  = ver.files.find(f => f.filename.endsWith('.mrpack'));
                const targetFile  = isModpack ? mrpackFile : primaryFile;
                return (
                  <div key={ver.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-0 transition-colors"
                    style={{ borderColor: 'var(--color-border)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate" style={{ color: 'var(--color-text)' }}>{ver.name}</p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {ver.game_versions.slice(0, 5).map(gv => (
                          <span key={gv} className="text-[8px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-dim)', opacity: 0.7 }}>{gv}</span>
                        ))}
                        {ver.loaders.map(l => {
                          const s = loaderStyle(l);
                          return <span key={l} className="text-[8px] px-1.5 py-0.5 rounded border font-bold"
                            style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}>{l}</span>;
                        })}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 mr-2">
                      <p className="text-[9px]" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>{timeAgo(ver.date_published)}</p>
                      <p className="text-[9px]" style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}>{formatNumber(ver.downloads)} ↓</p>
                    </div>
                    {targetFile && (
                      <button
                        onClick={() => {
                          if (isModpack && mrpackFile) onInstallModpack(mrpackFile.url, ver.id);
                          else if (primaryFile) onInstallMod(primaryFile.url, primaryFile.filename, selectedInstance || undefined);
                          onClose();
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-brand-dim)', borderColor: 'var(--color-brand)', color: 'var(--color-brand)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                        {Icons.download}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Progress Modal ──────────────────────────────────────────
function ModpackProgressModal({ progress, projectName, onClose }: {
  progress: InstallProgress | null;
  projectName: string;
  onClose?: () => void;
}) {
  if (!progress) return null;
  const isDone  = progress.stage === 'done';
  const isError = progress.stage === 'error';
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4 border shadow-2xl"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3">
          {isDone ? (
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-brand-dim)' }}>
              <span style={{ color: 'var(--color-brand)' }}>{Icons.check}</span>
            </div>
          ) : isError ? (
            <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
              <span className="text-red-400">{Icons.close}</span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
              <div className="w-5 h-5 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--color-brand-dim)', borderTopColor: 'var(--color-brand)' }} />
            </div>
          )}
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {isDone ? 'Установлено!' : isError ? 'Ошибка' : 'Установка...'}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-dim)' }}>{projectName}</p>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress.percent}%`, backgroundColor: isError ? '#f87171' : 'var(--color-brand)', boxShadow: isError ? 'none' : '0 0 8px var(--color-brand)' }} />
        </div>
        <p className="text-[11px]" style={{ color: 'var(--color-text-dim)' }}>{progress.message}</p>
        {(isDone || isError) && (
          <button onClick={onClose}
            className="w-full py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all"
            style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}>
            {isDone ? 'Готово' : 'Закрыть'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Project Card ────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: ModrinthProject; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const isModpack = project.project_type === 'modpack';
  const loaderBadges    = project.categories.filter(c => LOADER_CATEGORIES.has(c)).slice(0, 2);
  const otherCategories = project.categories.filter(c => !LOADER_CATEGORIES.has(c)).slice(0, 2);

  return (
    <div onClick={onClick} className="group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200"
      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-brand)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-border)'; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}>
      {project.featured_gallery && (
        <div className="h-24 overflow-hidden relative">
          <img src={project.featured_gallery} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" alt=""
            onError={e => { (e.target as any).style.display = 'none'; }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-bg-elevated), transparent)' }} />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden border flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
            {project.icon_url && !imgError
              ? <img src={project.icon_url} className="w-full h-full object-cover" alt="" onError={() => setImgError(true)} />
              : <span style={{ color: 'var(--color-brand)', opacity: 0.4 }}>
                  {isModpack ? Icons.modpack : Icons.mod}
                </span>}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[12px] font-bold truncate" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
            <p className="text-[10px] mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>{project.description}</p>
          </div>
        </div>
        {(loaderBadges.length > 0 || otherCategories.length > 0) && (
          <div className="flex flex-wrap gap-1 mt-3">
            {loaderBadges.map(l => { const s = loaderStyle(l); return (
              <span key={l} className="text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase"
                style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}>{l}</span>
            ); })}
            {otherCategories.map(c => (
              <span key={c} className="text-[8px] px-1.5 py-0.5 rounded border capitalize"
                style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-dim)', borderColor: 'var(--color-border)', opacity: 0.7 }}>{c}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-1" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
            {Icons.download}
            <span className="text-[10px] font-mono">{formatNumber(project.downloads)}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-[10px] font-mono">{formatNumber(project.follows)}</span>
          </div>
          <span className="flex-1" />
          <span className="text-[9px]" style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}>{timeAgo(project.date_modified)}</span>
        </div>
      </div>
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="rounded-lg px-2 py-0.5 border" style={{ backgroundColor: 'var(--color-brand-dim)', borderColor: 'var(--color-brand)' }}>
          <span className="text-[8px] font-bold uppercase" style={{ color: 'var(--color-brand)' }}>Подробнее</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function ContentPage({ nickname }: { nickname: string }) {
  const [search, setSearch]                   = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [contentType, setContentType]         = useState<ContentType>('mod');
  const [sortBy, setSortBy]                   = useState('downloads');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [projects, setProjects]               = useState<ModrinthProject[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [offset, setOffset]                   = useState(0);
  const [totalHits, setTotalHits]             = useState(0);
  const [selectedProject, setSelectedProject] = useState<ModrinthProject | null>(null);
  const [instances, setInstances]             = useState<GameInstance[]>([]);
  const [installProgress, setInstallProgress] = useState<InstallProgress | null>(null);
  const [installingProject, setInstallingProject] = useState('');
  const [toast, setToast]                     = useState<string | null>(null);
  const [categories, setCategories]           = useState<ModrinthCategory[]>([]);
  const LIMIT = 20;

  useEffect(() => {
    fetch(`${MODRINTH_API}/tag/category`)
      .then(r => r.json())
      .then((data: ModrinthCategory[]) => {
        const type = contentType === 'shader' ? 'shader'
          : contentType === 'resourcepack' ? 'resourcepack'
          : contentType === 'modpack' ? 'modpack' : 'mod';
        setCategories(data.filter(c => c.project_type === type && !LOADER_CATEGORIES.has(c.name)));
      })
      .catch(() => {});
    setSelectedCategory('');
  }, [contentType]);

  useEffect(() => {
    window.ipcRenderer.invoke('get-instances').then(setInstances).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (_: any, progress: InstallProgress) => {
      setInstallProgress(progress);
      if (progress.stage === 'done') {
        window.ipcRenderer.invoke('get-instances').then(setInstances).catch(() => {});
        window.ipcRenderer.send('instances-updated');
      }
    };
    window.ipcRenderer.on('modpack-install-progress', handler);
    return () => { window.ipcRenderer.removeListener('modpack-install-progress', handler); };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setOffset(0); setProjects([]); }, [contentType, debouncedSearch, sortBy, selectedCategory]);

  const fetchProjects = useCallback(async (off: number) => {
    setLoading(true);
    try {
      const facets: string[][] = [[`project_type:${contentType}`]];
      if (selectedCategory) facets.push([`categories:${selectedCategory}`]);
      const params = new URLSearchParams({
        query: debouncedSearch,
        facets: JSON.stringify(facets),
        index: sortBy,
        offset: String(off),
        limit: String(LIMIT),
      });
      const res  = await fetch(`${MODRINTH_API}/search?${params}`);
      const data = await res.json();
      setTotalHits(data.total_hits || 0);
      if (off === 0) setProjects(data.hits || []);
      else setProjects(prev => [...prev, ...(data.hits || [])]);
    } catch (err) {
      console.error('[Modrinth]', err);
    } finally {
      setLoading(false);
    }
  }, [contentType, debouncedSearch, sortBy, selectedCategory]);

  useEffect(() => { fetchProjects(0); }, [fetchProjects]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleInstallMod = async (url: string, filename: string, instanceId?: string) => {
    try {
      const result = await window.ipcRenderer.invoke('install-mod', {
        url, filename,
        projectType: contentType === 'shader' ? 'shader' : contentType === 'resourcepack' ? 'resourcepack' : 'mod',
        instanceId,
      });
      if (result?.success) {
        showToast(`✓ ${filename}${instanceId ? ` → ${instances.find(i => i.id === instanceId)?.name || 'инстанс'}` : ' (глобально)'}`);
      } else {
        showToast(`✗ Ошибка: ${result?.error || 'неизвестно'}`);
      }
    } catch { showToast('✗ Ошибка установки'); }
  };

  const handleInstallModpack = async (mrpackUrl: string, versionId: string) => {
    if (!selectedProject) return;
    setInstallingProject(selectedProject.title);
    setInstallProgress({ stage: 'downloading_mrpack', message: 'Начало...', percent: 0 });
    const result = await window.ipcRenderer.invoke('install-modpack', {
      mrpackUrl, projectId: selectedProject.project_id, versionId,
      projectName: selectedProject.title, iconUrl: selectedProject.icon_url,
    });
    if (!result?.success) setInstallProgress({ stage: 'error', message: result?.error || 'Ошибка', percent: 0 });
  };

  const hasMore = projects.length < totalHits;

  return (
    <div className="h-full w-full flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* HEADER */}
      <div className="px-5 py-3 border-b flex items-center justify-between gap-4 flex-shrink-0"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
        <div className="flex items-center gap-3">
          <h1 className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-dim)' }}>Контент</h1>
          <div className="w-px h-4" style={{ backgroundColor: 'var(--color-border)' }} />
          <div className="flex p-0.5 rounded-xl border gap-0.5"
            style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
            {CONTENT_TABS.map(tab => (
              <button key={tab.id} onClick={() => setContentType(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[10px] font-bold uppercase transition-all"
                style={{
                  backgroundColor: contentType === tab.id ? 'var(--color-brand)' : 'transparent',
                  color: contentType === tab.id ? 'var(--color-bg)' : 'var(--color-text-dim)',
                }}>
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CustomSelect value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-dim)' }}>
              {Icons.search}
            </div>
            <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-8 py-1.5 rounded-xl border text-[11px] w-44 outline-none transition-all"
              style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--color-brand)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--color-border)'} />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-dim)' }}>
                {Icons.close}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      {categories.length > 0 && (
        <div className="px-5 py-2 border-b flex items-center gap-1.5 flex-shrink-0 overflow-x-auto"
          style={{ borderColor: 'var(--color-border)' }}>
          <button onClick={() => setSelectedCategory('')}
            className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex-shrink-0 border transition-all"
            style={{
              backgroundColor: !selectedCategory ? 'var(--color-brand)' : 'var(--color-bg-elevated)',
              borderColor: !selectedCategory ? 'var(--color-brand)' : 'var(--color-border)',
              color: !selectedCategory ? 'var(--color-bg)' : 'var(--color-text-dim)',
            }}>Все</button>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
              className="px-2.5 py-1 rounded-lg text-[9px] font-medium capitalize flex-shrink-0 border transition-all"
              style={{
                backgroundColor: selectedCategory === cat.name ? 'var(--color-brand-dim)' : 'var(--color-bg-elevated)',
                borderColor: selectedCategory === cat.name ? 'var(--color-brand)' : 'var(--color-border)',
                color: selectedCategory === cat.name ? 'var(--color-brand)' : 'var(--color-text-dim)',
              }}>{cat.name}</button>
          ))}
        </div>
      )}

      {/* STATS + INSTANCES BAR */}
      {((!loading && totalHits > 0) || instances.length > 0) && (
        <div className="flex items-center justify-between px-5 border-b flex-shrink-0 overflow-x-auto"
          style={{ borderColor: 'var(--color-border)', minHeight: '32px' }}>
          {!loading && totalHits > 0 && (
            <span className="text-[9px] uppercase tracking-widest py-2 flex-shrink-0" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
              {formatNumber(totalHits)} проектов{debouncedSearch ? ` по «${debouncedSearch}»` : ''}{selectedCategory ? ` • ${selectedCategory}` : ''}
            </span>
          )}
          {instances.length > 0 && (
            <div className="flex items-center gap-1.5 py-1.5 ml-auto">
              <span className="text-[9px] uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}>
                Инстансы:
              </span>
              {instances.map(inst => (
                <div key={inst.id} className="flex items-center gap-1 rounded-lg px-2 py-0.5 flex-shrink-0 border"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
                  {inst.iconUrl && (
                    <img src={inst.iconUrl} className="w-3.5 h-3.5 rounded object-cover" alt=""
                      onError={e => { (e.target as any).style.display = 'none'; }} />
                  )}
                  <span className="text-[9px] whitespace-nowrap" style={{ color: 'var(--color-text)' }}>{inst.name}</span>
                  <span className="text-[8px]" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>{inst.gameVersion}</span>
                  <button onClick={() => window.ipcRenderer.send('launch-game', { nickname, instanceId: inst.id })}
                    className="w-4 h-4 flex items-center justify-center rounded border transition-all"
                    style={{ backgroundColor: 'var(--color-brand-dim)', borderColor: 'var(--color-brand)', color: 'var(--color-brand)' }}>
                    {Icons.play}
                  </button>
                  <button
                    onClick={() => window.ipcRenderer.invoke('remove-instance', inst.id)
                      .then(() => setInstances(prev => prev.filter(i => i.id !== inst.id)))}
                    className="w-4 h-4 flex items-center justify-center rounded transition-all"
                    style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-dim)'; (e.currentTarget as HTMLElement).style.opacity = '0.3'; }}>
                    {Icons.trash}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-6 h-6 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-brand-dim)', borderTopColor: 'var(--color-brand)' }} />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}>Загрузка...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <span style={{ color: 'var(--color-text-dim)', opacity: 0.2 }}>{Icons.search}</span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>Ничего не найдено</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {projects.map(p => <ProjectCard key={p.project_id} project={p} onClick={() => setSelectedProject(p)} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => { const no = offset + LIMIT; setOffset(no); fetchProjects(no); }}
                  disabled={loading}
                  className="px-5 py-2 rounded-xl text-[10px] border transition-all disabled:opacity-40"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-brand)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'}>
                  {loading ? 'Загрузка...' : `Ещё (${formatNumber(totalHits - projects.length)})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[998] rounded-xl px-4 py-2 text-[11px] shadow-2xl border whitespace-nowrap"
          style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}>
          {toast}
        </div>
      )}

      {selectedProject && !installProgress && (
        <ProjectDetailPanel
          project={selectedProject}
          instances={instances}
          onClose={() => setSelectedProject(null)}
          onInstallMod={handleInstallMod}
          onInstallModpack={handleInstallModpack}
        />
      )}
      {installProgress && (
        <ModpackProgressModal progress={installProgress} projectName={installingProject}
          onClose={() => { setInstallProgress(null); setInstallingProject(''); }} />
      )}
    </div>
  );
}