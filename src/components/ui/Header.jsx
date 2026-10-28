import { useState } from "react";
import { Volume2, VolumeX, ShoppingBag } from "lucide-react";
import { soundManager } from "../../audio/SoundEffects";
import { SkipButton } from "./SkipButton";
import { useCart } from "../../context/useCart";

export function Header({ currentScene, isAwakened, onSkip, onNavigate }) {
  const [isMuted, setIsMuted] = useState(false);
  const { itemCount, openCart } = useCart();

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const showSkip =
    (currentScene === "lamp" && !isAwakened) || currentScene === "entrance";

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Monogram */}
      <div
        onClick={() => onNavigate && onNavigate("lamp")}
        className="flex items-center gap-3 pointer-events-auto cursor-pointer group"
      >
        <span className="font-serif tracking-[0.3em] text-xs font-semibold text-[#c8b99c]/80 group-hover:text-[#d4af37] transition-colors">
          NOCTURNE
        </span>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#d4af37]/40" />
        <span className="hidden sm:inline-block font-sans text-[10px] tracking-[0.25em] text-[#736c62]">
          ATELIER NOIR
        </span>
      </div>

      {/* Tasteful Phase 3 Development Label */}
      {/* <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#120f0c]/60 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-[#d4af37]/90 uppercase font-medium">
          PHASE 3 // HAUTE GASTRONOMIE
        </span>
      </div> */}

      {/* Controls: Cart Trigger, Sound Toggle & Skip */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Skip button (only before lamp awaken or during entrance doors) */}
        {showSkip && (
          <SkipButton
            onClick={onSkip}
            visible={showSkip}
            label={currentScene === "entrance" ? "SKIP TO SALON" : "SKIP INTRO"}
          />
        )}

        {/* Live Shopping Cart Button */}
        <button
          onClick={openCart}
          aria-label={`View shopping cart with ${itemCount} items`}
          className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-black/60 hover:bg-[#1a140d] backdrop-blur-md text-[#f5efe2] transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-sans text-[11px] tracking-[0.2em] uppercase font-medium">
            CART
          </span>
          {itemCount > 0 && (
            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold font-sans">
              {itemCount}
            </span>
          )}
        </button>

        {/* Mute/Sound Toggle */}
        <button
          onClick={handleToggleSound}
          aria-label={
            isMuted ? "Unmute atmospheric audio" : "Mute atmospheric audio"
          }
          title={
            isMuted ? "Unmute atmospheric audio" : "Mute atmospheric audio"
          }
          className="p-2 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-black/40 backdrop-blur-md text-[#a8a29e] hover:text-[#f5f2ea] transition-all duration-300 pointer-events-auto cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#8c827a]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
          )}
        </button>
      </div>
    </header>
  );
}
