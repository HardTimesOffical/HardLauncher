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
  onCreateInstance?: () => void; // ← новый проп
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
  openFolder,
  onCreateInstance,
}) => {
  return (
    <footer className="relative z-50 flex-shrink-0 bg-[var(--color-bg-overlay)] border-t border-[var(--color-border)] transition-colors duration-300">
      <div className="h-16 flex items-center px-4 gap-3">

        {/* АККАУНТ */}
        <div className="w-[180px] flex-shrink-0">
          <AccountManager
            currentNickname={nickname}
            onSelect={onSelectAccount}
            onOpenAuth={() => onTabChange('auth')}
          />
        </div>

        <div className="w-px h-8 bg-[var(--color-border)] flex-shrink-0" />

        {/* ВЕРСИЯ */}
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-bold text-[var(--color-text-dim)] tracking-[0.2em] opacity-50">
              Версия
            </span>
            {selectedVersion && !progress && (
              <button
                onClick={handleResetVersion}
                className="text-[8px] text-[var(--color-text-dim)] hover:text-orange-400 uppercase tracking-tight transition-colors opacity-40 hover:opacity-100"
              >
                Переустановить
              </button>
            )}
            {/* КНОПКА + */}
            <button
              onClick={onCreateInstance}
              title="Создать инстанс"
              className="flex items-center justify-center transition-all opacity-40 hover:opacity-100"
              style={{
                width: '14px',
                height: '14px',
                border: '1px solid var(--color-border-accent)',
                borderRadius: '2px',
                color: 'var(--color-brand)',
                background: 'transparent',
              }}
            >
              <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <VersionSelect
            versions={versions}
            selected={selectedVersion}
            onSelect={setSelectedVersion}
            disabled={isLaunching}
          />
        </div>

        <div className="w-px h-8 bg-[var(--color-border)] flex-shrink-0" />

        {/* ПАПКА */}
        <button
          onClick={openFolder}
          title="Открыть папку игры"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-text-dim)] hover:text-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] hover:border-[var(--color-brand)]/20 transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* ВЕРСИЯ ИНДИКАТОР */}
        <div className="flex flex-col flex-shrink-0">
          <span className="text-[9px] text-[var(--color-text)] opacity-60 leading-none font-bold tabular-nums">
            {selectedVersion || '—'}
          </span>
          <span className="text-[8px] text-[var(--color-text-dim)] uppercase tracking-tight opacity-30">
            linked
          </span>
        </div>

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