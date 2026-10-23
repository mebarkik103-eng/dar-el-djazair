import React, { useState } from 'react';
import { Utensils, Sparkles } from 'lucide-react';

interface DishImageProps {
  src: string;
  alt: string;
  className?: string;
  dishName?: string;
}

export const DishImage: React.FC<DishImageProps> = ({
  src,
  alt,
  className = '',
  dishName,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 text-amber-400">
          <Utensils className="w-6 h-6" />
        </div>
        <p className="text-xs font-serif font-semibold text-amber-200 line-clamp-1">
          {dishName || alt}
        </p>
        <p className="text-[10px] text-stone-400 tracking-wider uppercase mt-0.5">
          Dar El Djazaïr
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-stone-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-stone-400 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
