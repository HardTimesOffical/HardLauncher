import React from 'react';
import GlobalChat from './GlobalChat';

interface ChatPanelProps {
  isChatOpen: boolean;
  setIsChatOpen: (val: boolean) => void;
  hasMention: boolean;
  nickname: string;
  onMention: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isChatOpen, setIsChatOpen, hasMention, nickname, onMention }) => {
  return (
    <>
      {/* Кнопка-переключатель */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-[60] border backdrop-blur-xl p-2.5
          transition-all duration-500 ease-in-out group active:scale-95
          ${isChatOpen ? 'left-[300px]' : 'left-0'}`}
        style={{ 
          borderRadius: '0 12px 12px 0',
          backgroundColor: 'var(--color-bg-overlay)',
          borderColor: 'var(--color-border)'
        }}
      >
        {/* Индикатор уведомления (Меншн) */}
        {!isChatOpen && hasMention && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border border-white/20"></span>
          </span>
        )}

        <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
          {/* Иконка чата */}
          <svg 
            className={`absolute w-5 h-5 transition-all duration-300 ${isChatOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ color: 'var(--color-text)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          
          {/* Иконка закрытия (стрелка) */}
          <svg 
            className={`absolute w-5 h-5 transition-all duration-300 ${isChatOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ color: 'var(--color-brand)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      {/* Панель чата */}
      <aside 
        className={`absolute left-0 top-0 bottom-0 z-[55] w-[300px] border-r backdrop-blur-2xl
          transition-transform duration-500 ease-in-out shadow-2xl ${
          isChatOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          backgroundColor: 'var(--color-bg-subtle)', 
          borderColor: 'var(--color-border)' 
        }}
      >
        {/* Внутри GlobalChat обязательно проверь стили текста */}
        <GlobalChat 
          currentUser={nickname} 
          isChatOpen={isChatOpen} 
          onMention={onMention} 
        />
      </aside>
    </>
  );
};

export default ChatPanel;