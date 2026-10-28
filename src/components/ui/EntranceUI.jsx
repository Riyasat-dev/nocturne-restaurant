import { motion } from 'framer-motion';
import { FastForward } from 'lucide-react';

export function EntranceUI({ onSkipEntrance }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      className="fixed inset-0 z-20 flex flex-col justify-between items-center py-20 px-6 pointer-events-none select-none"
    >
      {/* Top Scene Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="text-center max-w-xl flex flex-col items-center mt-4"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/70 font-light mb-2">
          ✦ PORTAL NOIR ✦
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] text-[#f5efe2] font-normal drop-shadow-md">
          THE GRAND ENTRANCE
        </h2>
        <p className="font-editorial italic text-sm sm:text-base text-[#a39a8c] tracking-[0.2em] mt-2">
          The threshold unseals to reveal the dining sanctuary
        </p>
      </motion.div>

      {/* Center Spacer for 3D Doors */}
      <div className="flex-1" />

      {/* Discreet Skip Scene Button */}
      <div className="pointer-events-auto mb-16">
        <button
          onClick={onSkipEntrance}
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-black/60 backdrop-blur-md text-[11px] font-sans tracking-[0.25em] text-[#a8a29e] hover:text-[#f5f2ea] transition-all duration-300 cursor-pointer shadow-lg"
        >
          <span>SKIP SCENE</span>
          <FastForward className="w-3 h-3 text-[#d4af37]/80 group-hover:text-[#d4af37] transition-colors" />
        </button>
      </div>
    </motion.div>
  );
}
