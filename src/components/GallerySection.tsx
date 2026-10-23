import React, { useState } from 'react';
import { Language, GalleryItem, RestaurantTheme } from '../types/restaurant';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { translations } from '../utils/translations';
import { DishImage } from './DishImage';
import { Maximize2, X, Camera } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
  gallery?: GalleryItem[];
  theme?: RestaurantTheme;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  lang, 
  gallery, 
  theme 
}) => {
  const t = translations[lang];
  const items = gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  const primaryColor = theme?.primaryColor || '#92400e';

  // Gather unique tags from the gallery items dynamically
  const uniqueTags = Array.from(new Set(items.map((it) => (lang === 'ar' ? it.tagAr : it.tagFr))));

  const filteredGallery = items.filter((item) => {
    if (activeFilter === 'all') return true;
    const itemTag = lang === 'ar' ? item.tagAr : item.tagFr;
    return itemTag === activeFilter;
  });

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-y border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div 
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'ألبوم الذكريات والأجواء' : 'Maison & Ambiance'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.galleryTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
            style={activeFilter === 'all' ? { backgroundColor: primaryColor } : {}}
          >
            {t.galleryAll}
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                activeFilter === tag
                  ? 'text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
              }`}
              style={activeFilter === tag ? { backgroundColor: primaryColor } : {}}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => {
            const title = lang === 'ar' ? item.titleAr : item.titleFr;
            const tag = lang === 'ar' ? item.tagAr : item.tagFr;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImage(item)}
                className="group relative rounded-xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-stone-100 cursor-pointer border border-stone-200"
              >
                <DishImage
                  src={item.image}
                  alt={title}
                  dishName={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 bg-stone-900/60 backdrop-blur-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                    <span 
                      className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs transition-colors"
                      style={{ hover: { backgroundColor: primaryColor } } as any}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white transition-colors"
              aria-label="Fermer la photo"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <img
                src={activeLightboxImage.image}
                alt={lang === 'ar' ? activeLightboxImage.titleAr : activeLightboxImage.titleFr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-stone-900 flex items-center justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 block mb-1">
                  {lang === 'ar' ? activeLightboxImage.tagAr : activeLightboxImage.tagFr}
                </span>
                <p className="text-base sm:text-lg font-serif font-bold">
                  {lang === 'ar' ? activeLightboxImage.titleAr : activeLightboxImage.titleFr}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
