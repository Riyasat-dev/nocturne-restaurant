import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Wine, Sparkles, Check } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useCart } from '../../context/useCart';

export function DishDetailModal({ dish, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 700);
  };

  const totalPrice = dish.price * quantity;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-[#d4af37]/35 bg-[#120f0c] shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden text-[#f5efe2]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dish details"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-black/70 hover:bg-[#1a140d] text-[#b3aaa0] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Scrollable Content */}
          <div className="overflow-y-auto custom-scrollbar">
            {/* Dish Header Image */}
            <div className="relative w-full h-64 sm:h-72">
              <SafeImage
                src={dish.image}
                alt={dish.name}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c] via-transparent to-black/30" />

              {/* Tag Pills */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2 flex-wrap">
                {dish.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/80 backdrop-blur-md text-[10px] font-sans tracking-[0.2em] uppercase text-[#e5c67d] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              {/* Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-medium block mb-1">
                    {dish.category?.toUpperCase()} // COMPOSITION
                  </span>
                  <h2
                    id="dish-modal-title"
                    className="font-serif text-2xl sm:text-3xl text-[#f5efe2] tracking-[0.12em] font-normal"
                  >
                    {dish.name}
                  </h2>
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-[#f5efe2] tracking-[0.1em] font-medium text-[#e5c67d]">
                  ${dish.price}
                </div>
              </div>

              {/* Full Poetic Description */}
              <div>
                <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#736c61] mb-2 font-medium">
                  THE DISH
                </h4>
                <p className="font-sans text-sm sm:text-[15px] text-[#b8b0a1] leading-relaxed font-light">
                  {dish.fullDescription}
                </p>
              </div>

              {/* Ingredients List */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div>
                  <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#736c61] mb-2 font-medium flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    KEY INGREDIENTS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1 rounded-lg border border-white/5 bg-[#1a1510] text-xs font-sans tracking-[0.1em] text-[#d4cbba]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sommelier Pairing Note */}
              {dish.pairing && (
                <div className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#17130e]/80 flex items-start gap-3">
                  <Wine className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold block mb-0.5">
                      SOMMELIER RECOMMENDED PAIRING
                    </span>
                    <span className="font-editorial italic text-sm text-[#e0d6c3] tracking-[0.08em]">
                      {dish.pairing}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer: Quantity Selector & Add Button */}
          <div className="p-5 sm:p-6 border-t border-white/5 bg-[#0e0c0a] flex items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 p-1 rounded-full border border-white/10 bg-[#16120e]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-[#d4cbba] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-sans text-sm font-medium w-6 text-center text-[#fbf6ec]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-[#d4cbba] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 cursor-pointer ${
                isAdded
                  ? 'bg-[#d4af37] text-black shadow-[0_0_20px_#d4af37]'
                  : 'bg-gradient-to-r from-[#241c12] to-[#342718] hover:from-[#342718] hover:to-[#42321f] text-[#fbf6ec] border border-[#d4af37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO CART</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                  <span>ADD TO CART — ${totalPrice}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
