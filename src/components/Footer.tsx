"use client";

import React from 'react';
import VersionSelect from "./VersionSelect";
import LaunchButton from './LaunchButton';
import AccountManager from './AccountManager';

interface FooterProps {
  nickname: string;
  setNickname: (val: string) => void;
  onSelectAccount: (name: string, hasToken: boolean, provider?: string) => void;
  onTabChange: (tab: 'play' | 'settings' | 'auth') => void;
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
  onTabChange,
  onSelectAccount,
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
    <footer className="relative z-50 flex-shrink-0 bg-[#0a0a0a] border-t border-white/[0.06]">
      
      {/* Основная строка футера */}
      <div className="h-16 flex items-center px-4 gap-3">

        {/* АККАУНТ */}
        <div className="w-[180px] flex-shrink-0">
          <AccountManager
            currentNickname={nickname}
            onSelect={onSelectAccount}
            onOpenAuth={() => onTabChange('auth')}
          />
        </div>

        {/* РАЗДЕЛИТЕЛЬ */}
        <div className="w-px h-8 bg-white/[0.06] flex-shrink-0" />

        {/* ВЕРСИЯ */}
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] uppercase font-bold text-white/20 tracking-[0.2em]">Версия</span>
            {selectedVersion && !progress && (
              <button
                onClick={handleResetVersion}
                className="text-[8px] text-white/15 hover:text-orange-400 uppercase tracking-tight transition-colors"
              >
                Переустановить
              </button>
            )}
          </div>
            <VersionSelect 
              versions={versions} // Было filteredVersions (ошибка)
              selected={selectedVersion} 
              onSelect={setSelectedVersion}
              disabled={isLaunching}
            />
        </div>

        {/* РАЗДЕЛИТЕЛЬ */}
        <div className="w-px h-8 bg-white/[0.06] flex-shrink-0" />

        {/* ПАПКА */}
        <button
          onClick={openFolder}
          title="Открыть папку игры"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/25 hover:text-white/60 hover:bg-white/[0.06] hover:border-white/10 transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* ВЕРСИЯ ИНДИКАТОР */}
        <div className="flex flex-col flex-shrink-0">
          <span className="text-[9px] text-white/40 leading-none">{selectedVersion || '—'}</span>
          <span className="text-[8px] text-white/15 uppercase tracking-tight">linked</span>
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* КНОПКА ЗАПУСКА */}
        <LaunchButton
          progress={progress}
          isDownloaded={isDownloaded}
          isLaunching={isLaunching}
          onLaunch={handleLaunch}
        />
      </div>
    </footer>
  );
};

export default Footer;