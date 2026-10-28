import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../../context/useCart";
import { CartItem } from "./CartItem";

export function CartDrawer({ onProceedToCheckout, onExploreMenu }) {
  const {
    items,
    isCartOpen,
    closeCart,
    clearCart,
    itemCount,
    subtotal,
    tax,
    total,
  } = useCart();

  // Close on Escape and prevent background scrolling while open
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close cart backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 w-full h-full bg-black/75 backdrop-blur-sm cursor-default"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 flex w-full justify-end pointer-events-none">
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Your tasting order"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="
                pointer-events-auto flex flex-col
                w-full sm:w-[min(100%,28rem)]
                h-full h-[100dvh] max-h-[100dvh]
                overflow-hidden
                bg-[#100d0a] text-[#f5efe2]
                border-l border-[#d4af37]/30
                shadow-2xl
              "
            >
              {/* Header */}
              <header className="shrink-0 px-4 py-4 sm:px-6 sm:py-6 border-b border-white/5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full border border-[#d4af37]/40 bg-[#1c1610] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-serif text-base sm:text-lg tracking-[0.1em] sm:tracking-[0.15em] text-[#fbf6ec] font-normal">
                      TASTING ORDER
                    </h2>
                    <span className="font-sans text-[10px] tracking-[0.16em] text-[#8c8273] uppercase">
                      {itemCount} {itemCount === 1 ? "SELECTION" : "SELECTIONS"}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      title="Clear order"
                      aria-label="Clear order"
                      className="min-w-10 min-h-10 p-2 flex items-center justify-center rounded-full text-[#a39b8e] hover:text-[#d4af37] hover:bg-white/5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={closeCart}
                    aria-label="Close cart drawer"
                    className="min-w-10 min-h-10 p-2 flex items-center justify-center rounded-full border border-white/10 hover:border-[#d4af37]/40 text-[#a39b8e] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </header>

              {/* Scrollable content */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-2 custom-scrollbar">
                {items.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="min-h-full flex flex-col items-center justify-center text-center px-3 py-8">
                    <div className="w-16 h-16 rounded-full border border-[#d4af37]/25 bg-[#17130e] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                      <ShoppingBag className="w-7 h-7 text-[#d4af37]/60" />
                    </div>

                    <h3 className="font-serif text-lg tracking-[0.12em] text-[#e0d6c3] font-normal mb-2">
                      YOUR ORDER IS EMPTY
                    </h3>

                    <p className="font-sans text-xs text-[#8c8273] tracking-[0.06em] max-w-xs leading-relaxed mb-6 font-light">
                      Select dishes from our Signature Compositions to craft
                      your bespoke tasting experience.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        closeCart();
                        onExploreMenu?.();
                      }}
                      className="min-h-11 px-5 py-3 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#1c1610] to-[#291f13] text-[11px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.2em] uppercase text-[#fbf6ec] hover:border-[#d4af37] transition-all shadow-lg"
                    >
                      EXPLORE THE MENU
                    </button>
                  </div>
                )}
              </div>

              {/* Fixed footer */}
              {items.length > 0 && (
                <footer className="shrink-0 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-5 border-t border-white/5 bg-[#0b0907] flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-sans tracking-[0.1em] sm:tracking-[0.15em] text-[#9c9486]">
                    <span>SUBTOTAL</span>
                    <span className="font-serif text-[#fbf6ec]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-sans tracking-[0.06em] sm:tracking-[0.1em] text-[#736c60]">
                    <span>SERVICE &amp; DINING TAX (8.5%)</span>
                    <span className="font-serif text-[#d4cbba]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between gap-3 text-sm sm:text-base font-serif tracking-[0.08em] sm:tracking-[0.15em] text-[#fbf6ec] font-semibold">
                    <span>ESTIMATED TOTAL</span>
                    <span className="shrink-0 text-lg sm:text-xl text-[#e5c67d]">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      onProceedToCheckout();
                    }}
                    className="mt-1 min-h-12 w-full py-3 px-3 sm:px-6 rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#211a12] via-[#332517] to-[#211a12] hover:from-[#2e2316] hover:to-[#402e1c] text-[#fbf6ec] font-sans text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(0,0,0,0.8)] transition-all"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#d4af37]" />
                  </button>

                  <p className="font-sans text-[9px] sm:text-[10px] text-center tracking-[0.08em] sm:tracking-[0.15em] text-[#5e584f] uppercase leading-relaxed">
                    FRONTEND DEMONSTRATION // ZERO REAL PAYMENT REQUIRED
                  </p>
                </footer>
              )}
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
