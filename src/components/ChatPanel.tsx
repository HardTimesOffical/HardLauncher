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
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-[60] 
          bg-[#0b0f1a]/60 backdrop-blur-md border border-white/10 p-2.5
          hover:bg-[#00ff95]/10 hover:border-[#00ff95]/30 
          transition-all duration-500 ease-in-out group
          ${isChatOpen ? 'left-[300px]' : 'left-0'}`}
        style={{ borderRadius: '0 12px 12px 0' }}
      >
        {!isChatOpen && hasMention && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg className={`absolute w-5 h-5 transition-all duration-500 ${isChatOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 text-white/60 group-hover:text-[#00ff95]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <svg className={`absolute w-5 h-5 transition-all duration-500 ${isChatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 text-[#00ff95]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <aside className={`absolute left-0 top-0 bottom-0 z-[55] w-[300px] 
        bg-[#0b0f1a]/40 backdrop-blur-md border-r border-white/10 
        transition-transform duration-500 ease-in-out shadow-2xl ${
        isChatOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <GlobalChat currentUser={nickname} isChatOpen={isChatOpen} onMention={onMention} />
      </aside>
    </>
  );
};

export default ChatPanel;