import { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useCart } from '../../context/useCart';

export function DishCard({ dish, onOpenDetails }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onOpenDetails(dish)}
      className="group relative flex flex-col rounded-2xl border border-white/5 hover:border-[#d4af37]/40 bg-gradient-to-b from-[#14110d]/90 to-[#0e0c09]/90 hover:from-[#1b1610] hover:to-[#120f0b] overflow-hidden backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.15)] transition-all duration-500 cursor-pointer"
      aria-label={`View details for ${dish.name}`}
    >
      {/* Dish Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden">
        <SafeImage
          src={dish.image}
          alt={dish.name}
          className="w-full h-full"
          imgClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark Vignette over image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09] via-transparent to-black/20" />

        {/* Primary Tag Badge */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full border border-[#d4af37]/40 bg-black/75 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#e5c67d] font-medium">
            {dish.tags[0]}
          </div>
        )}

        {/* Price Tag Badge */}
        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full border border-white/10 bg-black/85 backdrop-blur-md text-xs font-serif tracking-[0.15em] text-[#fbf6ec] font-semibold">
          ${dish.price}
        </div>

        {/* Hover View Details Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/60 bg-black/80 text-[10px] font-sans tracking-[0.25em] uppercase text-[#f5efe2]">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            VIEW DISH
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl text-[#f5efe2] group-hover:text-[#e8c87c] tracking-[0.1em] font-normal transition-colors line-clamp-1 mb-2">
            {dish.name}
          </h3>
          <p className="font-sans text-xs sm:text-[13px] text-[#9c9486] font-light leading-relaxed line-clamp-2 mb-4">
            {dish.shortDescription}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="font-editorial italic text-xs tracking-[0.15em] text-[#787063]">
            Curated Service
          </span>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${dish.name} to cart`}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
              justAdded
                ? 'bg-[#d4af37] text-black font-semibold shadow-[0_0_15px_#d4af37]'
                : 'border border-[#d4af37]/40 hover:border-[#d4af37] bg-white/5 hover:bg-[#d4af37]/15 text-[#e5ded0] hover:text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
