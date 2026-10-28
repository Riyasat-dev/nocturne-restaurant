import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export function IntroOverlay({ isAwakened, onAwaken, prefersReducedMotion }) {
  return (
    <AnimatePresence>
      {!isAwakened && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.4 : 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-20 flex flex-col justify-between items-center py-20 px-6 pointer-events-none select-none"
        >
          {/* Top Elegant Whispers */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
            className="text-center max-w-xl flex flex-col items-center mt-6"
          >
            <p className="font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-[#a39a8c]/80 font-light mb-3">
              SOME PLACES ARE DISCOVERED. OTHERS ARE AWAKENED.
            </p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.4em] text-[#d4af37]/60 font-medium">
              NOCTURNE
            </h2>
          </motion.div>

          {/* Middle Spacer for Lamp Silhouette */}
          <div className="flex-1" />

          {/* Bottom Interactive "CLICK TO AWAKEN" Hint */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center pointer-events-auto cursor-pointer mb-4"
            onClick={onAwaken}
          >
            <div className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-[#d4af37]/30 bg-black/60 hover:bg-[#1a140d]/80 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]">
              {/* Pulsing golden amber indicator dot */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-4 h-4 rounded-full bg-[#d4af37]/20 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#ffb84d] shadow-[0_0_8px_#ff9900]" />
              </div>

              <span className="font-sans text-xs sm:text-[13px] tracking-[0.28em] text-[#e8dfcf] group-hover:text-white uppercase font-medium transition-colors">
                CLICK TO AWAKEN
              </span>

              <Flame className="w-3.5 h-3.5 text-[#d4af37]/70 group-hover:text-[#ffaa33] transition-colors" />
            </div>

            <span className="font-sans text-[10px] tracking-[0.2em] text-[#6b645b] mt-3 uppercase">
              TOUCH THE BRASS LAMP OR PRESS SPACE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
