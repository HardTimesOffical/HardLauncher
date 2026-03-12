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
    <div className="h-full flex relative">
      {/* Фоновый carousel */}
      <div className="absolute inset-0 z-0">
        <BackgroundCarousel images={bgImages} interval={10000} />
        {/* Градиент: прозрачно слева, темнее справа */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Левая зона — пустая, показываем арт */}
      <div className="flex-1 relative z-10 flex flex-col justify-end p-6 pointer-events-none select-none">
        {/* Маленький watermark / лейбл лаунчера */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-[2px] bg-white/40" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Hard Times</span>
        </div>
      </div>

      {/* Правая панель */}
      <div className="relative z-10 w-[380px] h-full flex flex-col gap-3 p-4">

        {/* Серверы */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(10,10,15,0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <ServerList />
        </div>

        {/* Блок новостей / changelog */}
        <div
          className="flex-1 flex flex-col min-h-0 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(10,10,15,0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Заголовок */}
          <div className="px-4 py-3 flex items-center gap-2"
               style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-white/40">
              Обновления
            </span>
            {changelog.length > 0 && (
              <span className="ml-auto text-[9px] font-bold tracking-widest uppercase text-white/20">
                v{changelog[0].version}
              </span>
            )}
          </div>

          {/* Список */}
          <div ref={listRef} className="flex-1 overflow-y-auto custom-scroll px-2 py-2 flex flex-col gap-1">
            {changelog.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-white/20 text-[11px]">Загрузка...</span>
              </div>
            )}

            {changelog.map((entry, idx) => {
              const isOpen = expanded === entry.version
              const tag = TAG_STYLES[entry.tag] ?? TAG_STYLES.feature

              return (
                <div
                  key={entry.version}
                  className="rounded-lg overflow-hidden transition-all duration-200"
                  style={{
                    background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: `1px solid ${isOpen ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
                  }}
                >
                  {/* Хедер записи */}
                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : entry.version)}
                  >
                    {/* Индикатор — первая запись яркая */}
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${idx === 0 ? 'bg-white/70' : 'bg-white/20'}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-white/80 truncate">{entry.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-wider ${tag.color}`}>
                          {tag.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/25">{formatDate(entry.date)}</span>
                    </div>

                    {/* Стрелка */}
                    <svg
                      className="w-3 h-3 text-white/25 flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Тело */}
                  {isOpen && (
                    <div className="px-4 pb-3 pt-1 border-t border-white/5">
                      <div className="flex flex-col gap-0.5">
                        {renderMarkdown(entry.body)}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}