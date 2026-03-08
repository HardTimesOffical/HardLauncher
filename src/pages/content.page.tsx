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

const CONTENT_TABS: { id: ContentType; label: string; icon: string }[] = [
  { id: 'mod',          label: 'Моды',       icon: '🧩' },
  { id: 'modpack',      label: 'Модпаки',    icon: '📦' },
  { id: 'resourcepack', label: 'Ресурспаки', icon: '🎨' },
  { id: 'shader',       label: 'Шейдеры',    icon: '✨' },
];

const SORT_OPTIONS = [
  { value: 'downloads',  label: 'Загрузки' },
  { value: 'follows',    label: 'Подписчики' },
  { value: 'newest',     label: 'Новые' },
  { value: 'updated',    label: 'Обновлённые' },
  { value: 'relevance',  label: 'Релевантность' },
];

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

// ─── Custom Select ───────────────────────────────────────
function CustomSelect({
  value, onChange, options, placeholder,
}: {
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
        <svg
          className="w-2.5 h-2.5 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none', color: open ? 'var(--color-brand)' : 'var(--color-text-dim)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 min-w-full rounded-xl border shadow-2xl z-[500] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
          style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
        >
          {placeholder && (
            <div
              onClick={() => { onChange(''); setOpen(false); }}
              className="px-3 py-2 text-[10px] cursor-pointer"
              style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
            >
              {placeholder}
            </div>
          )}
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="px-3 py-2 text-[10px] cursor-pointer transition-all flex items-center justify-between gap-2"
              style={{
                backgroundColor: value === opt.value ? 'var(--color-brand-dim)' : 'transparent',
                color: value === opt.value ? 'var(--color-brand)' : 'var(--color-text)',
              }}
              onMouseEnter={e => { if (value !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-bg-subtle)'; }}
              onMouseLeave={e => { if (value !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <span className="whitespace-nowrap">{opt.label}</span>
              {value === opt.value && (
                <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-brand)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Progress Modal ──────────────────────────────────────
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
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-brand)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : isError ? (
            <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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

// ─── Version Modal ───────────────────────────────────────
function VersionModal({ project, instances, onClose, onInstallMod, onInstallModpack }: {
  project: ModrinthProject;
  instances: GameInstance[];
  onClose: () => void;
  onInstallMod: (url: string, filename: string, instanceId?: string) => void;
  onInstallModpack: (mrpackUrl: string, versionId: string) => void;
}) {
  const [versions, setVersions]         = useState<ModrinthVersion[]>([]);
  const [loading, setLoading]           = useState(true);
  const [gameFilter, setGameFilter]     = useState('');
  const [loaderFilter, setLoaderFilter] = useState('');
  const [selectedInstance, setSelectedInstance] = useState('');
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

  const loaderStyle = (l: string) => {
    if (l === 'fabric')   return { bg: 'rgba(250,204,21,0.08)',  text: 'rgba(250,204,21,0.7)',  border: 'rgba(250,204,21,0.15)' };
    if (l === 'forge')    return { bg: 'rgba(251,146,60,0.08)',  text: 'rgba(251,146,60,0.7)',  border: 'rgba(251,146,60,0.15)' };
    if (l === 'neoforge') return { bg: 'rgba(248,113,113,0.08)', text: 'rgba(248,113,113,0.7)', border: 'rgba(248,113,113,0.15)' };
    return { bg: 'var(--color-bg-subtle)', text: 'var(--color-text-dim)', border: 'var(--color-border)' };
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {project.icon_url && (
            <img src={project.icon_url} className="w-9 h-9 rounded-xl object-cover" alt=""
              onError={e => { (e.target as any).style.display = 'none'; }} />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-bold truncate" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>{versions.length} версий</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: 'var(--color-text-dim)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Instance selector */}
        {!isModpack && instances.length > 0 && (
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
            <p className="text-[9px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
              Установить в инстанс
            </p>
            <CustomSelect
              value={selectedInstance}
              onChange={setSelectedInstance}
              placeholder="Глобальная папка"
              options={instances.map(i => ({ value: i.id, label: `${i.name} (${i.gameVersion})` }))}
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <CustomSelect value={gameFilter} onChange={setGameFilter} placeholder="Все версии MC"
            options={gameVersions.slice(0, 25).map(v => ({ value: v, label: v }))} />
          {loaders.length > 1 && (
            <CustomSelect value={loaderFilter} onChange={setLoaderFilter} placeholder="Все загрузчики"
              options={loaders.map(l => ({ value: l, label: l }))} />
          )}
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-5 h-5 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--color-brand-dim)', borderTopColor: 'var(--color-brand)' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-[11px]" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>Версии не найдены</div>
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
                  <p className="text-[11px] font-medium truncate" style={{ color: 'var(--color-text)' }}>{ver.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    {ver.game_versions.slice(0, 4).map(gv => (
                      <span key={gv} className="text-[8px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-dim)', opacity: 0.6 }}>{gv}</span>
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
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: ModrinthProject; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const isModpack = project.project_type === 'modpack';
  const loaderBadges    = project.categories.filter(c => ['fabric', 'forge', 'neoforge', 'quilt'].includes(c)).slice(0, 2);
  const otherCategories = project.categories.filter(c => !['fabric', 'forge', 'neoforge', 'quilt'].includes(c)).slice(0, 2);

  const loaderStyle = (l: string) => {
    if (l === 'fabric')   return { bg: 'rgba(250,204,21,0.08)',  text: 'rgba(250,204,21,0.6)',  border: 'rgba(250,204,21,0.12)' };
    if (l === 'forge')    return { bg: 'rgba(251,146,60,0.08)',  text: 'rgba(251,146,60,0.6)',  border: 'rgba(251,146,60,0.12)' };
    if (l === 'neoforge') return { bg: 'rgba(248,113,113,0.08)', text: 'rgba(248,113,113,0.6)', border: 'rgba(248,113,113,0.12)' };
    return { bg: 'var(--color-bg-subtle)', text: 'var(--color-text-dim)', border: 'var(--color-border)' };
  };

  return (
    <div onClick={onClick} className="group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200"
      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-brand)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--color-border)'; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}
    >
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
              : <span className="text-lg">{isModpack ? '📦' : '🧩'}</span>}
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
                style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-dim)', borderColor: 'var(--color-border)', opacity: 0.6 }}>{c}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-1" style={{ color: 'var(--color-text-dim)', opacity: 0.5 }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
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
          <span className="text-[8px] font-bold uppercase" style={{ color: 'var(--color-brand)' }}>{isModpack ? 'Установить' : 'Версии'}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function ContentPage({ nickname }: { nickname: string }) {
  const [search, setSearch]                       = useState('');
  const [debouncedSearch, setDebouncedSearch]     = useState('');
  const [contentType, setContentType]             = useState<ContentType>('mod');
  const [sortBy, setSortBy]                       = useState('downloads');
  const [projects, setProjects]                   = useState<ModrinthProject[]>([]);
  const [loading, setLoading]                     = useState(true);
  const [offset, setOffset]                       = useState(0);
  const [totalHits, setTotalHits]                 = useState(0);
  const [selectedProject, setSelectedProject]     = useState<ModrinthProject | null>(null);
  const [instances, setInstances]                 = useState<GameInstance[]>([]);
  const [installProgress, setInstallProgress]     = useState<InstallProgress | null>(null);
  const [installingProject, setInstallingProject] = useState('');
  const [toast, setToast]                         = useState<string | null>(null);
  const LIMIT = 20;

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

  useEffect(() => { setOffset(0); setProjects([]); }, [contentType, debouncedSearch, sortBy]);

  const fetchProjects = useCallback(async (off: number) => {
    setLoading(true);
    try {
      const facets = JSON.stringify([[`project_type:${contentType}`]]);
      const params = new URLSearchParams({ query: debouncedSearch, facets, index: sortBy, offset: String(off), limit: String(LIMIT) });
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
  }, [contentType, debouncedSearch, sortBy]);

  useEffect(() => { fetchProjects(0); }, [fetchProjects]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleInstallMod = async (url: string, filename: string, instanceId?: string) => {
    try {
      const result = await window.ipcRenderer.invoke('install-mod', {
        url, filename,
        projectType: contentType === 'shader' ? 'shader' : contentType === 'resourcepack' ? 'resourcepack' : 'mod',
        instanceId,
      });
      if (result?.success) showToast(`✓ ${filename} установлен${instanceId ? ' в инстанс' : ''}`);
      else showToast(`✗ Ошибка: ${result?.error || 'неизвестно'}`);
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
                <span className="text-[11px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CustomSelect value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: 'var(--color-text-dim)' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-8 py-1.5 rounded-xl border text-[11px] w-44 outline-none transition-all"
              style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--color-brand)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--color-border)'} />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--color-text-dim)' }}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {!loading && totalHits > 0 && (
        <div className="px-5 py-1.5 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)' }}>
          <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
            {formatNumber(totalHits)} проектов{debouncedSearch ? ` по «${debouncedSearch}»` : ''}
          </span>
        </div>
      )}

      {/* Instances bar */}
      {instances.length > 0 && (
        <div className="px-5 py-2 border-b flex items-center gap-2 flex-shrink-0 overflow-x-auto"
          style={{ borderColor: 'var(--color-border)' }}>
          <span className="text-[9px] uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}>
            Инстансы:
          </span>
          {instances.map(inst => (
            <div key={inst.id} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 flex-shrink-0 border"
              style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
              {inst.iconUrl && (
                <img src={inst.iconUrl} className="w-4 h-4 rounded object-cover" alt=""
                  onError={e => { (e.target as any).style.display = 'none'; }} />
              )}
              <span className="text-[10px] whitespace-nowrap" style={{ color: 'var(--color-text)' }}>{inst.name}</span>
              <span className="text-[9px]" style={{ color: 'var(--color-text-dim)' }}>{inst.gameVersion}</span>
              <button
                onClick={() => window.ipcRenderer.send('launch-game', { nickname, instanceId: inst.id })}
                className="w-5 h-5 flex items-center justify-center rounded border transition-all ml-0.5"
                style={{ backgroundColor: 'var(--color-brand-dim)', borderColor: 'var(--color-brand)', color: 'var(--color-brand)' }}
                title="Запустить">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button
                onClick={() => window.ipcRenderer.invoke('remove-instance', inst.id)
                  .then(() => setInstances(prev => prev.filter(i => i.id !== inst.id)))}
                className="w-5 h-5 flex items-center justify-center rounded transition-all"
                style={{ color: 'var(--color-text-dim)', opacity: 0.4 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-dim)'; (e.currentTarget as HTMLElement).style.opacity = '0.4'; }}
                title="Удалить">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-6 h-6 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-brand-dim)', borderTopColor: 'var(--color-brand)' }} />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-dim)', opacity: 0.3 }}>Загрузка...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <span className="text-3xl opacity-20">🔍</span>
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
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'}
                >
                  {loading ? 'Загрузка...' : `Ещё (${formatNumber(totalHits - projects.length)})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[998] rounded-xl px-4 py-2 text-[11px] shadow-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap"
          style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text-dim)' }}>
          {toast}
        </div>
      )}

      {selectedProject && !installProgress && (
        <VersionModal project={selectedProject} instances={instances}
          onClose={() => setSelectedProject(null)}
          onInstallMod={handleInstallMod}
          onInstallModpack={handleInstallModpack} />
      )}
      {installProgress && (
        <ModpackProgressModal progress={installProgress} projectName={installingProject}
          onClose={() => { setInstallProgress(null); setInstallingProject(''); }} />
      )}
    </div>
  );
}
