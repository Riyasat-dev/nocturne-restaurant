import { useState } from 'react';
import { Utensils } from 'lucide-react';

export function SafeImage({ src, alt, className = '', imgClassName = '' }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#14110d] ${className}`}>
      {/* Loading Skeleton */}
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#17130f] via-[#241c14] to-[#17130f] animate-pulse" />
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        /* Graceful Culinary Fallback Art */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#18130e] to-[#0d0a07] text-center">
          <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-2 bg-[#201811]">
            <Utensils className="w-5 h-5 text-[#d4af37]/70" />
          </div>
          <span className="font-serif text-[11px] tracking-[0.2em] text-[#c9bea9] uppercase line-clamp-1">
            {alt}
          </span>
          <span className="font-sans text-[9px] tracking-[0.15em] text-[#6b6256] uppercase mt-1">
            NOCTURNE COMPOSITION
          </span>
        </div>
      )}
    </div>
  );
}
