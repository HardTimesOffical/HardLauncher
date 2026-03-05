import React, { useState } from 'react';

export default function ContentPage() {
  const [search, setSearch] = useState('');
  const [contentType, setContentType] = useState<'mods' | 'resourcepacks'>('mods');

  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-white/[0.05] bg-black/20">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter text-white">Контент</h1>
          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Дополнения с Modrinth</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Тип контента */}
          <div className="flex bg-white/[0.03] border border-white/[0.05] p-1 rounded-xl">
            {['mods', 'resourcepacks'].map((type) => (
              <button
                key={type}
                onClick={() => setContentType(type as any)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  contentType === type ? 'bg-[#00ff95] text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                {type === 'mods' ? 'Моды' : 'Паки'}
              </button>
            ))}
          </div>

          {/* Поиск */}
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2 text-[12px] text-white w-64 focus:outline-none focus:border-[#00ff95]/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Тут будут карточки модов */}
          <div className="h-32 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-white/10 text-[10px] uppercase">
             Контент скоро появится...
          </div>
        </div>
      </div>
    </div>
  );
}