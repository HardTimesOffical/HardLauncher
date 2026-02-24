"use client";

import React from 'react';
import VersionSelect from "./VersionSelect";
import LaunchButton from './LaunchButton';

interface FooterProps {
  nickname: string;
  setNickname: (val: string) => void;
  progress: any | null;
  versions: any[];
  selectedVersion: string;
  setSelectedVersion: (val: string) => void;
  isDownloaded: boolean;
  isLaunching: boolean;
  handleLaunch: () => void;
  handleResetVersion: () => void;
  openFolder: () => void;
}

const Footer: React.FC<FooterProps> = ({
  nickname,
  setNickname,
  progress,
  versions,
  selectedVersion,
  setSelectedVersion,
  isDownloaded,
  isLaunching,
  handleLaunch,
  handleResetVersion,
  openFolder
}) => {
  return (
    <footer className="relative z-50 h-20 bg-[#060606]/95 backdrop-blur-xl border-t border-white/10 flex items-center px-8 justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex gap-10 items-center">
        
        {/* ACCOUNT BLOCK */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em]" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            Login
          </span>
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-sm px-3 h-10 group hover:border-[#00ff95]/40 transition-all">
            <div className={`w-1.5 h-1.5 rounded-full ${nickname ? 'bg-[#00ff95] shadow-[0_0_8px_#00ff95]' : 'bg-red-500 animate-pulse'}`} />
            <input 
                type="text" 
                disabled={progress !== null}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                // УДАЛЕН класс uppercase, заменен шрифт для ввода
                className="bg-transparent text-[12px] text-white/80 focus:outline-none w-28 placeholder:text-white/10 tracking-wider font-sans" 
                placeholder="Имя"
                />
          </div>
        </div>

        {/* VERSION SELECT BLOCK */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-[8px] uppercase font-bold text-white/30 mr-5 tracking-[0.2em]" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
              Версия игры
            </span>
            {selectedVersion && !progress && (
              <button onClick={handleResetVersion} className="flex items-center gap-1 group transition-all">
                <span className="text-[7px] text-white/20 group-hover:text-orange-500 uppercase tracking-tighter" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
                  Переустановить
                </span>
                <svg className="w-2 h-2 text-white/20 group-hover:text-orange-500 group-hover:rotate-180 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </div>
          <div className="h-10">
            <VersionSelect versions={versions} selected={selectedVersion} onSelect={setSelectedVersion} disabled={progress !== null} />
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* SYSTEM BLOCK */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] uppercase font-bold text-white/30 tracking-[0.2em]" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
            System
          </span>
          <div className="flex items-center h-10 gap-3">
            <button onClick={openFolder} className="h-10 w-10 flex items-center justify-center rounded-sm bg-white/[0.03] border border-white/10 text-white/40 hover:text-[#00ff95] transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 7v10h18V9h-8l-2-2H3z" />
              </svg>
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] text-[#00ff95]/80 uppercase leading-none" style={{ fontFamily: 'MinecraftSeven, sans-serif' }}>
                {selectedVersion || 'No version'}
              </span>
              <span className="text-[7px] text-white/20 uppercase tracking-tighter">Directory Linked</span>
            </div>
          </div>
        </div>
      </div>

      {/* КНОПКА ЗАПУСКА */}
      <div className="scale-90 transform origin-right">
        <LaunchButton progress={progress} isDownloaded={isDownloaded} isLaunching={isLaunching} onLaunch={handleLaunch} />
      </div>
    </footer>
  );
};

export default Footer;