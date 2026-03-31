// src/components/PlayTab.tsx
// Положи changelog.json в public/changelog.json

import { useEffect, useState, useRef } from 'react'
import ServerList from './ServerList'
import BackgroundCarousel from './BackgroundCarousel'

interface ChangelogEntry {
  version: string
  date: string
  tag: 'major' | 'feature' | 'fix' | 'hotfix'
  title: string
  body: string
}

// Простой markdown → JSX (без библиотек)
function renderMarkdown(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  lines.forEach((line, i) => {
    if (!line.trim()) {
      elements.push(<br key={i} />)
      return
    }

    // Bullet list
    if (line.startsWith('- ')) {
      const content = line.slice(2)
      elements.push(
        <div key={i} className="flex gap-2 items-start my-0.5">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: parseBold(content) }} className="text-white/60 text-[11px] leading-relaxed" />
        </div>
      )
      return
    }

    elements.push(
      <p key={i}
         dangerouslySetInnerHTML={{ __html: parseBold(line) }}
         className="text-white/60 text-[11px] leading-relaxed" />
    )
  })

  return elements
}

function parseBold(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90 font-semibold">$1</strong>')
             .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-[10px] font-mono text-white/80">$1</code>')
}

const TAG_STYLES: Record<string, { label: string; color: string }> = {
  major:   { label: 'MAJOR',   color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  feature: { label: 'НОВОЕ',   color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  fix:     { label: 'ФИКС',    color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  hotfix:  { label: 'HOTFIX',  color: 'bg-red-500/20 text-red-300 border-red-500/30' },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface PlayTabProps {
  bgImages: string[]
}

export default function PlayTab({ bgImages }: PlayTabProps) {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('changelog.json')
      .then(r => r.json())
      .then(data => {
        setChangelog(data)
        if (data.length > 0) setExpanded(data[0].version)
      })
      .catch(() => {})
  }, [])

  return (
 <div className="h-full flex relative font-sans overflow-hidden">
      {/* Фоновый carousel */}
      <div className="absolute inset-0 z-0">
        <BackgroundCarousel images={bgImages} interval={10000} />
        {/* Градиент: Синегорск-стайл, более глубокий черный справа */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent" />
      </div>

      {/* Левая зона — Арт и минималистичный лейбл */}
      <div className="flex-1 relative z-10 flex flex-col justify-end p-8 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-2 opacity-60">
          <div className="w-8 h-[1px] bg-[var(--color-brand)]" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-text)]">
            SINEGORSK DISTRICT
          </span>
        </div>
      </div>

      {/* Правая панель (Контентная зона) */}
      <div className="relative z-10 w-[400px] h-full flex flex-col gap-2 p-2 bg-black/20 backdrop-blur-sm border-l border-white/5">

        {/* СЕРВЕРЫ (ServerList) — теперь без лишних отступов и скруглений */}
        <div className="bg-black/60 border border-[var(--color-border-accent)] shadow-2xl">
          <ServerList />
        </div>

        {/* БЛОК ОБНОВЛЕНИЙ */}
        <div className="flex-1 flex flex-col min-h-0 bg-black/60 border border-[var(--color-border-accent)] shadow-2xl">
          {/* Заголовок в стиле Синегорск */}
          <div className="px-4 py-2.5 flex items-center justify-between bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-3 bg-[var(--color-brand)]" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--color-text)]">
                Журнал изменений
              </span>
            </div>
            {changelog.length > 0 && (
              <span className="text-[9px] font-mono font-bold text-[var(--color-brand)] opacity-80">
                v.{changelog[0].version}
              </span>
            )}
          </div>

          {/* Список новостей */}
          <div ref={listRef} className="flex-1 overflow-y-auto custom-scroll px-2 py-3 flex flex-col gap-1.5">
            {changelog.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[var(--color-text-dim)] text-[10px] uppercase tracking-widest animate-pulse">Загрузка данных...</span>
              </div>
            ) : (
              changelog.map((entry, idx) => {
                const isOpen = expanded === entry.version
                const tag = TAG_STYLES[entry.tag] ?? TAG_STYLES.feature

                return (
                  <div
                    key={entry.version}
                    className="transition-all duration-200 border border-transparent"
                    style={{
                      background: isOpen ? 'var(--color-bg-subtle)' : 'rgba(255,255,255,0.02)',
                      borderColor: isOpen ? 'var(--color-border-accent)' : 'transparent',
                    }}
                  >
                    {/* Хедер записи */}
                    <button
                      className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-white/[0.03] transition-colors"
                      onClick={() => setExpanded(isOpen ? null : entry.version)}
                    >
                      {/* Индикатор: Яркий оливковый для первой (актуальной) записи */}
                      <div className={`w-1 h-1 flex-shrink-0 ${idx === 0 ? 'bg-[var(--color-brand)]' : 'bg-white/20'}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`text-[11px] font-bold truncate ${isOpen ? 'text-[var(--color-brand)]' : 'text-white/90'}`}>
                            {entry.title}
                          </span>
                          <span className="text-[9px] font-mono text-white/20 ml-2">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        {/* Тег: Используем чистые цвета из твоего яркого :root */}
                        <span className={`text-[8px] font-black px-1.5 py-0.5 border uppercase tracking-tighter ${tag.color} bg-black/20`}>
                          {tag.label}
                        </span>
                      </div>

                      {/* Стрелка (квадратная стилистика) */}
                      <svg
                        className={`w-3 h-3 text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                      >
                        <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Тело (Markdown контент) */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-black/20">
                        <div className="text-[11px] leading-relaxed text-white/70 space-y-1">
                          {renderMarkdown(entry.body)}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}