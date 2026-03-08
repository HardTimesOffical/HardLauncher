interface TabButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export const TabButton = ({ active, label, onClick }: TabButtonProps) => (
  <button 
    onClick={onClick}
    className={`transition-all pb-2 border-b-2 text-[11px] font-bold uppercase tracking-wider ${
      active 
        ? 'border-[var(--color-brand)] text-[var(--color-text)]' 
        : 'border-transparent text-[var(--color-text-dim)] hover:text-[var(--color-text)] opacity-60 hover:opacity-100'
    }`}
  >
    {label}
  </button>
);