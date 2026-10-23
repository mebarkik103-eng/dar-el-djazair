import React from 'react';
import { RestaurantProfile, Language } from '../types/restaurant';
import { 
  Building2, 
  Waves, 
  UtensilsCrossed, 
  Check, 
  ArrowRightLeft, 
  MapPin, 
  Phone,
  Sparkles
} from 'lucide-react';

interface RestaurantSelectorProps {
  restaurants: RestaurantProfile[];
  currentRestaurantId: string;
  onSelectRestaurant: (id: string) => void;
  lang: Language;
  variant?: 'header' | 'banner' | 'menu' | 'floating';
}

export const RestaurantSelector: React.FC<RestaurantSelectorProps> = ({
  restaurants,
  currentRestaurantId,
  onSelectRestaurant,
  lang,
  variant = 'header',
}) => {
  // 1. Variant: Top Interactive Switcher Banner (Full width bar at very top)
  if (variant === 'banner') {
    return (
      <aside aria-label="Sélecteur de restaurant" className="w-full bg-stone-900 text-white border-b border-stone-800 text-xs py-2 px-3 sm:px-6 transition-all shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Label with icon */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-1 bg-amber-500/20 text-amber-400 rounded-md">
              <Building2 className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-stone-200">
              {lang === 'ar' ? 'سلكتور المطاعم المتعددة :' : 'Démonstrateur Multi-Restaurants :'}
            </span>
            <span className="hidden md:inline-block text-[11px] text-stone-400">
              {lang === 'ar' ? '(اختر المطعم لعرض قائمته المستقلة)' : '(cliquez pour basculer de profil)'}
            </span>
          </div>

          {/* Restaurant Buttons */}
          <div className="flex items-center gap-2">
            {restaurants.map((restaurant) => {
              const isSelected = restaurant.id === currentRestaurantId;
              const isAlger = restaurant.id === 'dar-el-djazair';

              return (
                <button
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant.id)}
                  type="button"
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? isAlger
                        ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-400/60 scale-[1.02]'
                        : 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300/60 scale-[1.02]'
                      : 'bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700'
                  }`}
                  title={lang === 'ar' ? `التبديل إلى ${restaurant.config.nameAr}` : `Basculer vers ${restaurant.config.nameFr}`}
                >
                  {isAlger ? (
                    <UtensilsCrossed className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-amber-400'}`} />
                  ) : (
                    <Waves className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-200' : 'text-sky-400'}`} />
                  )}
                  <span>{lang === 'ar' ? restaurant.config.nameAr : restaurant.config.nameFr}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-stone-900 text-stone-400'
                  }`}>
                    {lang === 'ar' ? restaurant.config.cityAr : restaurant.config.cityFr.split(',')[0]}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  // 2. Variant: Menu Section In-Line Switcher (High visibility inside the Menu)
  if (variant === 'menu') {
    return (
      <div className="mb-8 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-stone-100 rounded-xl text-stone-700">
              <ArrowRightLeft className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">
                {lang === 'ar' ? 'تبديل مطعم التجربة :' : 'Changer de profil restaurant :'}
              </p>
              <p className="text-[11px] text-stone-500">
                {lang === 'ar' 
                  ? 'كل مطعم يمتلك قائمة أطباق وأسعار وهوية مستقلة تماماً' 
                  : 'Chaque restaurant dispose de son menu, ses prix et son WhatsApp distincts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            {restaurants.map((restaurant) => {
              const isSelected = restaurant.id === currentRestaurantId;
              const isAlger = restaurant.id === 'dar-el-djazair';

              return (
                <button
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant.id)}
                  type="button"
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? isAlger
                        ? 'bg-amber-800 text-white shadow-sm ring-1 ring-amber-700'
                        : 'bg-sky-700 text-white shadow-sm ring-1 ring-sky-600'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {isAlger ? (
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                  ) : (
                    <Waves className="w-3.5 h-3.5" />
                  )}
                  <span>{lang === 'ar' ? restaurant.config.nameAr : restaurant.config.nameFr}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Variant: Header Pill Switcher (Default in Main Navigation)
  return (
    <div className="inline-flex items-center p-1 bg-stone-100/95 hover:bg-stone-200/80 border border-stone-200 rounded-xl shadow-2xs transition-colors">
      {restaurants.map((restaurant) => {
        const isSelected = restaurant.id === currentRestaurantId;
        const isAlger = restaurant.id === 'dar-el-djazair';

        return (
          <button
            key={restaurant.id}
            onClick={() => onSelectRestaurant(restaurant.id)}
            type="button"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              isSelected
                ? isAlger
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-sky-700 text-white shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900 font-medium hover:bg-white/60'
            }`}
            title={lang === 'ar' ? `اختر مطعم ${restaurant.config.nameAr}` : `Afficher ${restaurant.config.nameFr} (${restaurant.config.cityFr})`}
          >
            {isAlger ? (
              <UtensilsCrossed className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-amber-700'}`} />
            ) : (
              <Waves className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-200' : 'text-sky-600'}`} />
            )}
            <span className="whitespace-nowrap font-medium">
              {lang === 'ar' ? restaurant.config.nameAr : restaurant.config.nameFr}
            </span>
            <span className={`hidden lg:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
              isSelected ? 'bg-white/20 text-white' : 'text-stone-500'
            }`}>
              {lang === 'ar' ? restaurant.config.cityAr : restaurant.config.cityFr.split(',')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
