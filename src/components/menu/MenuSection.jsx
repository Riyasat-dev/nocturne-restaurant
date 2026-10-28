import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, Sparkles, Filter } from "lucide-react";
import { MENU_CATEGORIES, MENU_DISHES } from "../../data/menuData";
import { DishCard } from "./DishCard";
import { DishDetailModal } from "./DishDetailModal";

export function MenuSection({ onNavigateToDining, onDishModalChange }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);

  // Filtered dishes memoization
  const filteredDishes = useMemo(() => {
    return MENU_DISHES.filter((dish) => {
      const matchesCategory =
        selectedCategory === "all" || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="relative w-full min-h-screen pt-24 sm:pt-28 pb-36 px-4 sm:px-8 max-w-7xl mx-auto z-20 flex flex-col items-center">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center max-w-3xl flex flex-col items-center mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          <span className="text-[#d4af37]/80 text-[10px] tracking-[0.3em] font-sans uppercase">
            CARTE GASTRONOMIQUE
          </span>
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#fffaf0] via-[#e5c67d] to-[#8f6d2f] tracking-[0.2em] font-normal mb-4 drop-shadow-[0_4px_24px_rgba(212,175,55,0.18)]">
          SIGNATURE COMPOSITIONS
        </h1>

        <p className="font-editorial italic text-base sm:text-xl text-[#d4cbba] tracking-[0.2em] uppercase font-light max-w-2xl mb-4">
          An evolving exploration of smoke, heirloom harvest, and darkness
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#9c9486] max-w-xl text-center leading-relaxed font-light">
          Each course is prepared to order using ancestral techniques and modern
          gastronomy. Selections may be enjoyed à la carte or as part of our
          bespoke tasting service.
        </p>
      </motion.div>

      {/* Search & Category Filter Controls */}
      <div className="w-full max-w-4xl flex flex-col gap-5 mb-10">
        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8273]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ingredient or dish name..."
            aria-label="Search menu dishes"
            className="w-full pl-11 pr-10 py-3 rounded-full border border-white/10 focus:border-[#d4af37]/70 bg-black/60 backdrop-blur-md text-xs sm:text-sm font-sans tracking-[0.1em] text-[#f5efe2] placeholder-[#6e675b] focus:outline-none transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#8c8273] hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border border-[#d4af37] bg-gradient-to-r from-[#221a12] to-[#302417] text-[#fbf6ec] shadow-[0_0_15px_rgba(212,175,55,0.25)] font-medium"
                    : "border border-white/5 hover:border-white/20 bg-black/40 hover:bg-white/5 text-[#9c9486] hover:text-[#e5ded0]"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOpenDetails={(dish) => {
                setSelectedDish(dish);
                onDishModalChange?.(true);
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results */
        <div className="py-20 text-center flex flex-col items-center">
          <Filter className="w-8 h-8 text-[#6b6255] mb-3" />
          <h3 className="font-serif text-xl text-[#e0d6c3] tracking-[0.15em] mb-2">
            No Compositions Found
          </h3>
          <p className="font-sans text-xs text-[#8c8273] tracking-[0.1em] mb-4">
            No dishes match &ldquo;{searchQuery}&rdquo;. Try another term or
            reset your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-5 py-2 rounded-full border border-[#d4af37]/40 text-xs font-sans tracking-[0.2em] uppercase text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
          >
            RESET FILTERS
          </button>
        </div>
      )}

      {/* Return to Dining Salon Prompt */}
      {onNavigateToDining && (
        <div className="mt-16 text-center">
          <button
            onClick={onNavigateToDining}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-black/40 text-xs font-sans tracking-[0.25em] text-[#9c9486] hover:text-[#fbf6ec] uppercase transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]/70 group-hover:text-[#d4af37]" />
            <span>RETURN TO THE DINING SALON</span>
          </button>
        </div>
      )}

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => {
            setSelectedDish(null);
            onDishModalChange?.(false);
          }}
        />
      )}
    </section>
  );
}
