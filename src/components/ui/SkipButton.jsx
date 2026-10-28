import { FastForward } from 'lucide-react';

export function SkipButton({ onClick, visible, label = 'SKIP INTRO' }) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-black/40 backdrop-blur-md text-[11px] font-sans tracking-[0.2em] text-[#a8a29e] hover:text-[#f5f2ea] transition-all duration-300 pointer-events-auto cursor-pointer"
    >
      <span>{label}</span>
      <FastForward className="w-3 h-3 text-[#d4af37]/70 group-hover:text-[#d4af37] transition-colors" />
    </button>
  );
}
