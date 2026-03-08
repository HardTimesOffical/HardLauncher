import { useState, useEffect, useCallback } from 'react';

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
  { id: 'mod', label: 'Моды', icon: '🧩' },
  { id: 'modpack', label: 'Модпаки', icon: '📦' },
  { id: 'resourcepack', label: 'Ресурспаки', icon: '🎨' },
  { id: 'shader', label: 'Шейдеры', icon: '✨' },
];

const SORT_OPTIONS = [
  { value: 'downloads', label: 'Загрузки' },
  { value: 'follows', label: 'Подписчики' },
  { value: 'newest', label: 'Новые' },
  { value: 'updated', label: 'Обновлённые' },
  { value: 'relevance', label: 'Релевантность' },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'сегодня';
  if (days < 7) return `${days}д назад`;
  if (days < 30) return `${Math.floor(days / 7)}н назад`;
  if (days < 365) return `${Math.floor(days / 30)}мес назад`;
  return `${Math.floor(days / 365)}г назад`;
}

// ─── Progress bar для установки модпака ─────────────────
function ModpackProgressModal({ progress, projectName, onClose }: {
  progress: InstallProgress | null;
  projectName: string;
  onClose?: () => void;
}) {
  if (!progress) return null;
  const isDone = progress.stage === 'done';
  const isError = progress.stage === 'error';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.9)' }}>
      <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {isDone ? (
            <div className="w-10 h-10 rounded-full bg-[#00ff95]/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#00ff95]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-[#00ff95]/30 border-t-[#00ff95] rounded-full animate-spin" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-white">{isDone ? 'Установлено!' : isError ? 'Ошибка' : 'Установка...'}</p>
            <p className="text-[10px] text-white/40">{projectName}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${isError ? 'bg-red-400' : 'bg-[#00ff95]'}`}
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <p className="text-[11px] text-white/40">{progress.message}</p>

        {(isDone || isError) && (
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-[11px] text-white/60 transition-all"
          >
            {isDone ? 'Готово' : 'Закрыть'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Modal выбора версий ─────────────────────────────────
function VersionModal({
  project,
  instances,
  onClose,
  onInstallMod,
  onInstallModpack,
}: {
  project: ModrinthProject;
  instances: GameInstance[];
  onClose: () => void;
  onInstallMod: (url: string, filename: string, instanceId?: string) => void;
  onInstallModpack: (mrpackUrl: string, versionId: string) => void;
}) {
  const [versions, setVersions] = useState<ModrinthVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState('');
  const [loaderFilter, setLoaderFilter] = useState('');
  const [selectedInstance, setSelectedInstance] = useState<string>('');
  const isModpack = project.project_type === 'modpack';

  useEffect(() => {
    fetch(`${MODRINTH_API}/project/${project.project_id}/version`)
      .then(r => r.json())
      .then(data => { setVersions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [project.project_id]);

  const gameVersions = [...new Set(versions.flatMap(v => v.game_versions))].sort().reverse();
  const loaders = [...new Set(versions.flatMap(v => v.loaders))];

  const filtered = versions.filter(v => {
    if (gameFilter && !v.game_versions.includes(gameFilter)) return false;
    if (loaderFilter && !v.loaders.includes(loaderFilter)) return false;
    return true;
  });

  const getLoaderColor = (l: string) => {
    if (l === 'fabric') return 'bg-yellow-400/10 text-yellow-400/70 border-yellow-400/10';
    if (l === 'forge') return 'bg-orange-400/10 text-orange-400/70 border-orange-400/10';
    if (l === 'neoforge') return 'bg-red-400/10 text-red-400/70 border-red-400/10';
    return 'bg-white/[0.05] text-white/30 border-white/[0.06]';
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <div className="w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
          {project.icon_url && (
            <img src={project.icon_url} className="w-9 h-9 rounded-xl object-cover" alt="" onError={e => { (e.target as any).style.display = 'none'; }} />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-bold text-white truncate">{project.title}</h3>
            <p className="text-[9px] text-white/25 uppercase tracking-wider">{versions.length} версий</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-white/20 hover:text-white/60 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Instance selector (только для модов) */}
        {!isModpack && instances.length > 0 && (
          <div className="px-4 py-3 border-b border-white/[0.04] bg-white/[0.01]">
            <p className="text-[9px] text-white/25 uppercase tracking-wider mb-2">Установить в инстанс (опционально)</p>
            <select
              value={selectedInstance}
              onChange={e => setSelectedInstance(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] text-white/70 focus:outline-none"
            >
              <option value="">Глобальная папка</option>
              {instances.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name} ({inst.gameVersion})</option>
              ))}
            </select>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 p-3 border-b border-white/[0.04]">
          <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] text-white/60 focus:outline-none">
            <option value="">Все версии MC</option>
            {gameVersions.slice(0, 25).map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          {loaders.length > 1 && (
            <select value={loaderFilter} onChange={e => setLoaderFilter(e.target.value)}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] text-white/60 focus:outline-none">
              <option value="">Все загрузчики</option>
              {loaders.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          )}
        </div>

        {/* Version list */}
        <div className="max-h-72 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-5 h-5 border-2 border-[#00ff95]/30 border-t-[#00ff95] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-white/20 text-[11px]">Версии не найдены</div>
          ) : (
            filtered.slice(0, 50).map(ver => {
              const primaryFile = ver.files.find(f => f.primary) || ver.files[0];
              const mrpackFile = ver.files.find(f => f.filename.endsWith('.mrpack'));
              const targetFile = isModpack ? mrpackFile : primaryFile;

              return (
                <div key={ver.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] border-b border-white/[0.03] last:border-0 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/80 font-medium truncate">{ver.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      {ver.game_versions.slice(0, 4).map(gv => (
                        <span key={gv} className="text-[8px] text-white/25 bg-white/[0.03] px-1.5 py-0.5 rounded">{gv}</span>
                      ))}
                      {ver.loaders.map(l => (
                        <span key={l} className={`text-[8px] px-1.5 py-0.5 rounded border font-bold ${getLoaderColor(l)}`}>{l}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 mr-2">
                    <p className="text-[9px] text-white/20">{timeAgo(ver.date_published)}</p>
                    <p className="text-[9px] text-white/15">{formatNumber(ver.downloads)} ↓</p>
                  </div>
                  {targetFile && (
                    <button
                      onClick={() => {
                        if (isModpack && mrpackFile) {
                          onInstallModpack(mrpackFile.url, ver.id);
                        } else if (primaryFile) {
                          onInstallMod(primaryFile.url, primaryFile.filename, selectedInstance || undefined);
                        }
                        onClose();
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-[#00ff95]/10 hover:bg-[#00ff95]/20 border border-[#00ff95]/20 rounded-lg text-[#00ff95] transition-all flex-shrink-0"
                      title={isModpack ? 'Установить модпак' : `Скачать ${primaryFile?.filename}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Project card ────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: ModrinthProject; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const isModpack = project.project_type === 'modpack';

  const loaderBadges = project.categories
    .filter(c => ['fabric', 'forge', 'neoforge', 'quilt'].includes(c)).slice(0, 2);
  const otherCategories = project.categories
    .filter(c => !['fabric', 'forge', 'neoforge', 'quilt'].includes(c)).slice(0, 2);

  const getLoaderClass = (l: string) => {
    if (l === 'fabric') return 'bg-yellow-400/10 text-yellow-400/60 border-yellow-400/10';
    if (l === 'forge') return 'bg-orange-400/10 text-orange-400/60 border-orange-400/10';
    if (l === 'neoforge') return 'bg-red-400/10 text-red-400/60 border-red-400/10';
    return 'bg-white/[0.04] text-white/25 border-white/[0.05]';
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-white/[0.12] hover:bg-[#141414] hover:-translate-y-0.5 hover:shadow-xl"
    >
      {project.featured_gallery && (
        <div className="h-24 overflow-hidden relative">
          <img src={project.featured_gallery} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" alt="" onError={e => { (e.target as any).style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
            {project.icon_url && !imgError ? (
              <img src={project.icon_url} className="w-full h-full object-cover" alt="" onError={() => setImgError(true)} />
            ) : (
              <span className="text-lg">{isModpack ? '📦' : '🧩'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[12px] font-bold text-white truncate">{project.title}</h3>
            <p className="text-[10px] text-white/30 mt-0.5 line-clamp-2 leading-relaxed">{project.description}</p>
          </div>
        </div>

        {(loaderBadges.length > 0 || otherCategories.length > 0) && (
          <div className="flex flex-wrap gap-1 mt-3">
            {loaderBadges.map(l => (
              <span key={l} className={`text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase ${getLoaderClass(l)}`}>{l}</span>
            ))}
            {otherCategories.map(c => (
              <span key={c} className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.03] text-white/20 border border-white/[0.04] capitalize">{c}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1 text-white/25">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-[10px] font-mono">{formatNumber(project.downloads)}</span>
          </div>
          <div className="flex items-center gap-1 text-white/25">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-[10px] font-mono">{formatNumber(project.follows)}</span>
          </div>
          <span className="flex-1" />
          <span className="text-[9px] text-white/15">{timeAgo(project.date_modified)}</span>
        </div>
      </div>

      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-[#00ff95]/15 border border-[#00ff95]/20 rounded-lg px-2 py-0.5">
          <span className="text-[8px] text-[#00ff95] font-bold uppercase">{isModpack ? 'Установить' : 'Версии'}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────
export default function  ContentPage({ nickname }: { nickname: string }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [contentType, setContentType] = useState<ContentType>('mod');
  const [sortBy, setSortBy] = useState('downloads');
  const [projects, setProjects] = useState<ModrinthProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ModrinthProject | null>(null);
  const [instances, setInstances] = useState<GameInstance[]>([]);
  const [installProgress, setInstallProgress] = useState<InstallProgress | null>(null);
  const [installingProject, setInstallingProject] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);
  const LIMIT = 20;

  // Load instances
  useEffect(() => {
    window.ipcRenderer.invoke('get-instances').then(setInstances).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (_: any, progress: InstallProgress) => {
      setInstallProgress(progress);
      if (progress.stage === 'done') {
        window.ipcRenderer.invoke('get-instances').then(setInstances).catch(() => {});
        // Уведомляем App.tsx
        window.ipcRenderer.send('instances-updated');
      }
    };
    window.ipcRenderer.on('modpack-install-progress', handler);
    return () => {
      window.ipcRenderer.removeListener('modpack-install-progress', handler);
      // Явно ничего не возвращаем
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset on filter change
  useEffect(() => {
    setOffset(0);
    setProjects([]);
  }, [contentType, debouncedSearch, sortBy]);

  const fetchProjects = useCallback(async (off: number) => {
    setLoading(true);
    try {
      const facets = JSON.stringify([[`project_type:${contentType}`]]);
      const params = new URLSearchParams({
        query: debouncedSearch,
        facets,
        index: sortBy,
        offset: String(off),
        limit: String(LIMIT),
      });
      const res = await fetch(`${MODRINTH_API}/search?${params}`);
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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleInstallMod = async (url: string, filename: string, instanceId?: string) => {
    try {
      const result = await window.ipcRenderer.invoke('install-mod', {
        url, filename,
        projectType: contentType === 'shader' ? 'shader' : contentType === 'resourcepack' ? 'resourcepack' : 'mod',
        instanceId,
      });
      if (result?.success) {
        showToast(`✓ ${filename} установлен${instanceId ? ' в инстанс' : ''}`);
      } else {
        showToast(`✗ Ошибка: ${result?.error || 'неизвестно'}`);
      }
    } catch {
      showToast('✗ Ошибка установки');
    }
  };

  const handleInstallModpack = async (mrpackUrl: string, versionId: string) => {
    if (!selectedProject) return;
    setInstallingProject(selectedProject.title);
    setInstallProgress({ stage: 'downloading_mrpack', message: 'Начало...', percent: 0 });

    const result = await window.ipcRenderer.invoke('install-modpack', {
      mrpackUrl,
      projectId: selectedProject.project_id,
      versionId,
      projectName: selectedProject.title,
      iconUrl: selectedProject.icon_url,
    });

    if (!result?.success) {
      setInstallProgress({ stage: 'error', message: result?.error || 'Ошибка', percent: 0 });
    }
  };

  const handleLaunchInstance = (instanceId: string) => {
    window.ipcRenderer.send('launch-game', { nickname, instanceId });
  };

  const hasMore = projects.length < totalHits;

  return (
    <div className="h-full w-full flex flex-col bg-[#0f0f0f]">

      {/* HEADER */}
      <div className="px-6 py-3.5 border-b border-white/[0.05] flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Контент</h1>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex bg-white/[0.03] border border-white/[0.05] p-0.5 rounded-xl">
            {CONTENT_TABS.map(tab => (
              <button key={tab.id} onClick={() => setContentType(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[10px] font-bold uppercase transition-all ${
                  contentType === tab.id ? 'bg-[#00ff95] text-black shadow-sm' : 'text-white/30 hover:text-white/60'
                }`}>
                <span className="text-[11px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-1.5 text-[10px] text-white/40 focus:outline-none focus:border-white/[0.12] transition-all">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl pl-8 pr-8 py-1.5 text-[11px] text-white w-48 focus:outline-none focus:border-[#00ff95]/40 transition-all" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
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
        <div className="px-6 py-1.5 border-b border-white/[0.03] flex-shrink-0">
          <span className="text-[9px] text-white/15 uppercase tracking-widest">
            {formatNumber(totalHits)} проектов{debouncedSearch ? ` по «${debouncedSearch}»` : ''}
          </span>
        </div>
      )}

      {/* Instances bar (если есть установленные) */}
      {/* Instances bar */}
      {instances.length > 0 && (
        <div className="px-6 py-2 border-b border-white/[0.03] flex items-center gap-2 flex-shrink-0 overflow-x-auto">
          <span className="text-[9px] text-white/20 uppercase tracking-widest flex-shrink-0">Инстансы:</span>
          {instances.map(inst => (
            <div key={inst.id} className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-1 flex-shrink-0">
              {inst.iconUrl && (
                <img src={inst.iconUrl} className="w-4 h-4 rounded object-cover" alt=""
                  onError={e => { (e.target as any).style.display = 'none'; }} />
              )}
              <span className="text-[10px] text-white/50 whitespace-nowrap">{inst.name}</span>
              <span className="text-[9px] text-white/20">{inst.gameVersion}</span>
              {/* Кнопка запуска */}
              <button
                onClick={() => handleLaunchInstance(inst.id)}
                className="w-5 h-5 flex items-center justify-center bg-[#00ff95]/10 hover:bg-[#00ff95]/20 rounded text-[#00ff95] transition-all ml-0.5"
                title="Запустить"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              {/* Кнопка удаления */}
              <button
                onClick={() => {
                  window.ipcRenderer.invoke('remove-instance', inst.id).then(() => {
                    setInstances(prev => prev.filter(i => i.id !== inst.id));
                  });
                }}
                className="w-5 h-5 flex items-center justify-center text-white/15 hover:text-red-400 rounded transition-all"
                title="Удалить"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-6 h-6 border-2 border-[#00ff95]/20 border-t-[#00ff95] rounded-full animate-spin" />
            <span className="text-[10px] text-white/15 uppercase tracking-widest">Загрузка...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <span className="text-3xl opacity-20">🔍</span>
            <span className="text-[11px] text-white/20">Ничего не найдено</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {projects.map(p => (
                <ProjectCard key={p.project_id} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-5">
                <button onClick={() => { const no = offset + LIMIT; setOffset(no); fetchProjects(no); }} disabled={loading}
                  className="px-5 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] rounded-xl text-[10px] text-white/40 hover:text-white/60 transition-all disabled:opacity-40">
                  {loading ? 'Загрузка...' : `Ещё (${formatNumber(totalHits - projects.length)})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[998] bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-[11px] text-white/60 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Version modal */}
      {selectedProject && !installProgress && (
        <VersionModal
          project={selectedProject}
          instances={instances}
          onClose={() => setSelectedProject(null)}
          onInstallMod={handleInstallMod}
          onInstallModpack={handleInstallModpack}
        />
      )}

      {/* Modpack install progress */}
      {installProgress && (
        <ModpackProgressModal
          progress={installProgress}
          projectName={installingProject}
          onClose={() => { setInstallProgress(null); setInstallingProject(''); }}
        />
      )}
    </div>
  );
}
