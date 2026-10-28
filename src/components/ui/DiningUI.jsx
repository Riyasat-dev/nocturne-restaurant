import { motion } from "framer-motion";
import { Compass, ChefHat } from "lucide-react";

export function DiningUI({ onExploreMenu, onExploreChef }) {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-between items-center py-16 px-6 pointer-events-none select-none">
      {/* Top Brand Typography */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
        className="text-center max-w-4xl flex flex-col items-center mt-4 sm:mt-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          <span className="text-[#d4af37]/80 text-[10px] tracking-[0.3em] font-sans uppercase">
            ATELIER DE HAUTE GASTRONOMIE
          </span>
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
        </div>

        {/* Heading: AN EVENING BEYOND THE ORDINARY */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#fff8ed] via-[#e5c67d] to-[#927131] drop-shadow-[0_4px_24px_rgba(212,175,55,0.2)]">
          AN EVENING BEYOND THE ORDINARY
        </h1>

        <p className="font-editorial italic text-base sm:text-xl text-[#dcd4c5] tracking-[0.25em] uppercase mt-3 font-light">
          An intimate subterranean salon reserved for sixteen guests
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#9e9587] max-w-xl text-center leading-relaxed font-light mt-4 px-4 hidden sm:block">
          Where culinary architecture meets sensory indulgence. Candlelit walnut
          tables, bespoke sommelier pairings, and silence before each
          revelation.
        </p>
      </motion.div>

      {/* Center Spacer allowing 3D dining tables & chandeliers to shine */}
      <div className="flex-1" />

      {/* Bottom Action Area */}

      {/* Bottom Action Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="flex flex-col items-center pointer-events-auto gap-4 mb-20"
      >
        {/* Primary CTA: Signature Menu */}
        <button
          onClick={onExploreMenu}
          className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#1c1610]/95 to-[#2a2014]/95 hover:from-[#2a2014] hover:to-[#382b1c] text-[#fbf6ed] font-sans text-xs tracking-[0.25em] uppercase font-medium backdrop-blur-md shadow-[0_6px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(212,175,55,0.3)] hover:border-[#d4af37] transition-all duration-500 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-[#d4af37] group-hover:rotate-45 transition-transform duration-500" />
          <span>EXPLORE THE EXPERIENCE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
        </button>

        {/* Secondary CTA: Chef's Theatre */}
        <button
          onClick={onExploreChef}
          className="group flex items-center gap-3 px-7 py-3 rounded-full border border-[#d4af37]/25 bg-black/40 hover:bg-[#d4af37]/10 text-[#dcd4c5] hover:text-[#fff8ed] font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/70 cursor-pointer"
        >
          <ChefHat className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
          <span>ENTER THE CHEF'S THEATRE</span>
        </button>

        {/* Sub-details whisper */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] font-sans tracking-[0.2em] text-[#6b6459] uppercase text-center">
          <span>TABLES 01 — 06</span>
          <span className="w-1 h-1 rounded-full bg-[#3d3831]" />
          <span>8-COURSE COMPOSITIONS</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#3d3831]" />
          <span className="hidden sm:inline-block">
            PRIVATE SOMMELIER CELLAR
          </span>
        </div>
      </motion.div>
    </div>
  );
}
