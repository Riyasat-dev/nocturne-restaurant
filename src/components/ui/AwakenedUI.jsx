import { motion, AnimatePresence } from 'framer-motion';
import { Compass, RotateCcw } from 'lucide-react';

export function AwakenedUI({ isAwakened, onReset, onExplore, prefersReducedMotion }) {
  return (
    <AnimatePresence>
      {isAwakened && (
        <motion.div
          key="awakened-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.5 : 1.8,
            delay: prefersReducedMotion ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 z-20 flex flex-col justify-between items-center py-16 px-6 pointer-events-none select-none"
        >
          {/* Top Brand Title & Subtitle */}
          <div className="flex flex-col items-center text-center max-w-4xl mt-4 sm:mt-8">
            {/* Subtle filigree insignia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
              <span className="text-[#d4af37]/80 text-[10px] tracking-[0.3em]">✦</span>
              <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
            </motion.div>

            {/* Grand Brand Title: NOCTURNE */}
            <motion.h1
              initial={{ opacity: 0, y: 25, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              transition={{
                duration: prefersReducedMotion ? 0.4 : 2.2,
                delay: prefersReducedMotion ? 0 : 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-[#fff7e6] via-[#dfba73] to-[#8f6d2f] drop-shadow-[0_4px_24px_rgba(212,175,55,0.2)]"
            >
              NOCTURNE
            </motion.h1>

            {/* Subtitle: DINING BEYOND THE ORDINARY */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.6,
                delay: prefersReducedMotion ? 0 : 1.4,
                ease: 'easeOut',
              }}
              className="font-editorial italic text-base sm:text-xl md:text-2xl text-[#e8dfcf] tracking-[0.25em] sm:tracking-[0.3em] uppercase mt-3 font-light"
            >
              DINING BEYOND THE ORDINARY
            </motion.p>

            {/* Cinematic Poetic Narrative */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.9 }}
              className="font-sans text-xs sm:text-sm text-[#a8a092] max-w-xl text-center leading-relaxed font-light mt-5 px-4 hidden sm:block"
            >
              Where culinary mastery meets nocturnal intrigue. An intimate sensory sanctuary
              revealed in flame and shadow.
            </motion.p>
          </div>

          {/* Center Space allowing 3D glowing lamp to command presence */}
          <div className="flex-1" />

          {/* Bottom Interactive Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 2.2 }}
            className="flex flex-col items-center pointer-events-auto gap-4 mb-2"
          >
            {/* Primary Action Button */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <button
                onClick={onExplore}
                className="group relative flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#d4af37]/40 bg-gradient-to-r from-[#17130e]/90 to-[#221b12]/90 hover:from-[#221b12] hover:to-[#2e2316] text-[#f5efe2] font-sans text-xs tracking-[0.25em] uppercase font-medium backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-500 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-45 transition-transform duration-500" />
                <span>ENTER THE SANCTUARY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/80" />
              </button>

              {/* Re-play / Douse flame button */}
              <button
                onClick={onReset}
                title="Douse the flame and return to darkness"
                className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 hover:border-[#d4af37]/30 bg-black/40 hover:bg-[#15120e]/60 text-[#a8a092] hover:text-[#f5efe2] font-sans text-xs tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#d4af37]/70" />
                <span className="hidden sm:inline">RE-IGNITE</span>
              </button>
            </div>

            {/* Footer Whispers & Details */}
            <div className="flex items-center gap-4 sm:gap-8 text-[10px] font-sans tracking-[0.25em] text-[#6b6459] uppercase mt-2">
              <span>8-COURSE SENSORY TASTING</span>
              <span className="w-1 h-1 rounded-full bg-[#403b34]" />
              <span>BY PRIVATE INVITATION</span>
              <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[#403b34]" />
              <span className="hidden md:inline-block">19:00 — MIDNIGHT</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
