import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, MenuCategory, Language, RestaurantConfig, CartItem, RestaurantCategory, RestaurantTheme } from '../types/restaurant';
import { translations, formatDZD, cleanPhoneForWhatsApp } from '../utils/translations';
import { DishImage } from './DishImage';
import { 
  Search, 
  Utensils, 
  Flame, 
  Sparkles, 
  Fish, 
  Coffee, 
  Cake, 
  Clock, 
  Plus, 
  Minus,
  MessageCircle, 
  Info, 
  Check, 
  Leaf, 
  X,
  ShoppingBag
} from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  lang: Language;
  config: RestaurantConfig;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  categories?: RestaurantCategory[];
  theme?: RestaurantTheme;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  items, 
  lang, 
  config, 
  cart,
  onAddToCart,
  onUpdateQuantity,
  categories,
  theme
}) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialtyOnly, setFilterSpecialtyOnly] = useState(false);
  const [filterChefOnly, setFilterChefOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);

  const primaryColor = theme?.primaryColor || '#92400e';
  const primaryLight = theme?.primaryLight || '#fef3c7';

  // Reset category filter when restaurant changes
  useEffect(() => {
    setActiveCategory('all');
  }, [config.nameFr]);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Utensils':
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const categoryTabs: { id: MenuCategory; label: string; icon: React.ReactNode }[] = useMemo(() => {
    const allTab = { id: 'all', label: t.allCategories, icon: <Utensils className="w-4 h-4" /> };
    if (categories && categories.length > 0) {
      return [
        allTab,
        ...categories.map((c) => ({
          id: c.id,
          label: lang === 'ar' ? c.nameAr : c.nameFr,
          icon: getCategoryIcon(c.icon),
        })),
      ];
    }
    return [
      allTab,
      { id: 'starters', label: t.starters, icon: <Flame className="w-4 h-4" /> },
      { id: 'traditional', label: t.traditional, icon: <Sparkles className="w-4 h-4" /> },
      { id: 'grills', label: t.grills, icon: <Fish className="w-4 h-4" /> },
      { id: 'desserts', label: t.desserts, icon: <Cake className="w-4 h-4" /> },
      { id: 'drinks', label: t.drinks, icon: <Coffee className="w-4 h-4" /> },
    ];
  }, [categories, lang, t]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Tag filters
      if (filterSpecialtyOnly && !item.isSpecialty) return false;
      if (filterChefOnly && !item.isChefPick) return false;
      if (filterVegOnly && !item.isVegetarian) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName =
          item.nameFr.toLowerCase().includes(query) ||
          item.nameAr.toLowerCase().includes(query);
        const matchesDesc =
          item.descriptionFr.toLowerCase().includes(query) ||
          item.descriptionAr.toLowerCase().includes(query);
        const matchesIngredients =
          (item.ingredientsFr && item.ingredientsFr.some(i => i.toLowerCase().includes(query))) ||
          (item.ingredientsAr && item.ingredientsAr.some(i => i.toLowerCase().includes(query)));
        
        return matchesName || matchesDesc || matchesIngredients;
      }

      return true;
    });
  }, [items, activeCategory, filterSpecialtyOnly, filterChefOnly, filterVegOnly, searchQuery]);

  const getItemQuantity = (itemId: string): number => {
    const entry = cart.find(ci => ci.item.id === itemId);
    return entry ? entry.quantity : 0;
  };

  const handleOrderDishOnWhatsApp = (item: MenuItem) => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const dishName = lang === 'ar' ? item.nameAr : item.nameFr;
    const priceStr = formatDZD(item.price, lang);
    const message = encodeURIComponent(
      lang === 'ar'
        ? `السلام عليكم، أود طلب طبق: ${dishName} (${priceStr}) من مطعم ${config.nameAr}.`
        : `Bonjour ${config.nameFr}, je souhaite commander le plat : ${dishName} (${priceStr}).`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            {lang === 'ar' ? 'أطايب المطبخ الجزائري' : 'Gastronomie & Terroir'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.menuTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.menuSubtitle}
          </p>
        </div>

        {/* Search Bar & Dietary Filter Toggles */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterSpecialtyOnly(!filterSpecialtyOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filterSpecialtyOnly
                  ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.filterSpecialty}</span>
            </button>

            <button
              onClick={() => setFilterChefOnly(!filterChefOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filterChefOnly
                  ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t.filterChefPick}</span>
            </button>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filterVegOnly
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>{t.filterVeg}</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex overflow-x-auto pb-3 mb-8 gap-2 scrollbar-thin border-b border-stone-200/80">
          {categoryTabs.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'bg-white/70 text-stone-600 hover:text-stone-950 hover:bg-white border border-stone-200/80'
                }`}
                style={isActive ? { backgroundColor: primaryColor } : {}}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-base text-stone-700 font-medium">{t.noItemsFound}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterSpecialtyOnly(false);
                setFilterChefOnly(false);
                setFilterVegOnly(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => {
              const title = lang === 'ar' ? item.nameAr : item.nameFr;
              const desc = lang === 'ar' ? item.descriptionAr : item.descriptionFr;
              const quantity = getItemQuantity(item.id);
              const isInCart = quantity > 0;

              return (
                <article
                  key={item.id}
                  className={`group bg-white rounded-xl border overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                    isInCart ? 'border-amber-500/80 ring-1 ring-amber-500/30' : 'border-stone-200/90'
                  }`}
                >
                  {/* Card Image Area with DishImage fallback */}
                  <div 
                    className="relative aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedDishModal(item)}
                  >
                    <DishImage
                      src={item.image}
                      alt={title}
                      dishName={title}
                      className="group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                    {/* Unboxed Subtle Status badges on image overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-white drop-shadow">
                      {item.isSpecialty && (
                        <span className="bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300">
                          {t.specialtyBadge}
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-emerald-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-300 ml-auto">
                          {t.vegBadge}
                        </span>
                      )}
                      {isInCart && (
                        <span className="bg-amber-800 text-white px-2 py-0.5 rounded text-[11px] font-bold shadow-sm flex items-center gap-1 ml-auto">
                          <Check className="w-3 h-3" />
                          <span>{quantity} {t.inCart}</span>
                        </span>
                      )}
                    </div>

                    {/* Quick view button hint */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2 py-1 rounded flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      <span>{t.viewDetails}</span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 
                          onClick={() => setSelectedDishModal(item)}
                          className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                        >
                          {title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                        {desc}
                      </p>

                      {/* Clean Unboxed Metadata with · separator */}
                      <div className="pt-1 flex items-center gap-2 text-xs text-stone-500">
                        {item.preparationTime && (
                          <>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-700" />
                              <span>{item.preparationTime}</span>
                            </span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span>{lang === 'ar' ? 'مطهو طازجاً' : 'Préparé minute'}</span>
                      </div>
                    </div>

                    {/* Bottom Pricing & Quantity Selector */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-stone-500 block">
                          {t.unitPrice}
                        </span>
                        <span className="text-base sm:text-lg font-bold font-mono text-stone-900 tabular-nums">
                          {formatDZD(item.price, lang)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp single item quick question */}
                        <button
                          onClick={() => handleOrderDishOnWhatsApp(item)}
                          className="p-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors"
                          title={t.orderOnWhatsApp}
                          aria-label={t.orderOnWhatsApp}
                        >
                          <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
                        </button>

                        {/* Interactive Quantity Selector directly on card (+ and -) */}
                        {quantity === 0 ? (
                          <button
                            onClick={() => onAddToCart(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-white shadow-2xs transition-all active:scale-95 hover:opacity-90"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t.addToOrder}</span>
                          </button>
                        ) : (
                          <div 
                            className="inline-flex items-center gap-1 border rounded-lg p-1 shadow-2xs"
                            style={{ backgroundColor: primaryLight, borderColor: `${primaryColor}40` }}
                          >
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1.5 text-stone-700 hover:text-stone-950 rounded-md transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span 
                              className="min-w-6 text-center text-xs font-bold font-mono tabular-nums px-1"
                              style={{ color: primaryColor }}
                            >
                              {quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1.5 text-stone-700 hover:text-stone-950 rounded-md transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Dish Detail Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
            <div className="relative aspect-video bg-stone-100 shrink-0">
              <DishImage
                src={selectedDishModal.image}
                alt={lang === 'ar' ? selectedDishModal.nameAr : selectedDishModal.nameFr}
                dishName={lang === 'ar' ? selectedDishModal.nameAr : selectedDishModal.nameFr}
              />
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {lang === 'ar' ? selectedDishModal.nameAr : selectedDishModal.nameFr}
                </h3>
                <span className="text-lg font-bold font-mono text-amber-800 tabular-nums shrink-0">
                  {formatDZD(selectedDishModal.price, lang)}
                </span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {lang === 'ar' ? selectedDishModal.descriptionAr : selectedDishModal.descriptionFr}
              </p>

              {/* Ingredients */}
              {((lang === 'ar' ? selectedDishModal.ingredientsAr : selectedDishModal.ingredientsFr) ?? []).length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    {t.ingredients}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'ar' ? selectedDishModal.ingredientsAr : selectedDishModal.ingredientsFr)?.map((ing, i) => (
                      <span key={i} className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions inside modal with Quantity Selector */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3 items-center">
                {getItemQuantity(selectedDishModal.id) === 0 ? (
                  <button
                    onClick={() => {
                      onAddToCart(selectedDishModal);
                    }}
                    className="w-full flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addToOrder} ({formatDZD(selectedDishModal.price, lang)})</span>
                  </button>
                ) : (
                  <div className="w-full sm:w-auto flex-1 flex items-center justify-between bg-amber-50 border border-amber-300 rounded-lg p-1.5">
                    <span className="text-xs font-medium text-amber-900 px-2">
                      {getItemQuantity(selectedDishModal.id)} {t.inCart}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(selectedDishModal.id, -1)}
                        className="p-1.5 bg-white text-stone-800 hover:bg-stone-100 rounded-md border border-amber-200 transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateQuantity(selectedDishModal.id, 1)}
                        className="p-1.5 bg-white text-stone-800 hover:bg-stone-100 rounded-md border border-amber-200 transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    handleOrderDishOnWhatsApp(selectedDishModal);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
                  <span>{t.orderOnWhatsApp}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
