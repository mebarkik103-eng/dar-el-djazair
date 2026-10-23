import React, { useState } from 'react';
import { Language, RestaurantConfig, RestaurantProfile } from '../types/restaurant';
import { translations } from '../utils/translations';
import { 
  Phone, 
  Calendar, 
  ShoppingBag, 
  Settings2, 
  Menu as MenuIcon, 
  X, 
  Globe, 
  Download,
  Building2,
  FileCode,
  Layers
} from 'lucide-react';
import { RestaurantSelector } from './RestaurantSelector';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  config: RestaurantConfig;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenWhatsAppConfig: () => void;
  onOpenExport: () => void;
  availableRestaurants?: RestaurantProfile[];
  currentRestaurantId?: string;
  onSelectRestaurant?: (id: string) => void;
  onOpenMultiRestaurantGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  config,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenWhatsAppConfig,
  onOpenExport,
  availableRestaurants = [],
  currentRestaurantId,
  onSelectRestaurant,
  onOpenMultiRestaurantGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { href: '#menu', label: t.navMenu },
    { href: '#gallery', label: t.navGallery },
    { href: '#hours', label: t.navHours },
    { href: '#about', label: t.navAbout },
    { href: '#contact', label: t.navContact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark & City */}
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="group flex items-baseline gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700/50 rounded-sm"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              {lang === 'ar' ? config.nameAr : config.nameFr}
            </span>
            <span className="hidden sm:inline-block text-[11px] font-sans tracking-widest text-amber-700 uppercase font-semibold">
              {lang === 'ar' ? config.cityAr : config.cityFr}
            </span>
          </a>

          {/* Direct Restaurant Selector (Dar El Djazaïr / El Bahia) */}
          {availableRestaurants.length > 1 && currentRestaurantId && onSelectRestaurant && (
            <div className="flex items-center ml-1 sm:ml-3 border-l border-stone-300/80 pl-1.5 sm:pl-3">
              <RestaurantSelector
                restaurants={availableRestaurants}
                currentRestaurantId={currentRestaurantId}
                onSelectRestaurant={onSelectRestaurant}
                lang={lang}
                variant="header"
              />
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Multi-Restaurant Template Guide Trigger */}
          {onOpenMultiRestaurantGuide && (
            <button
              onClick={onOpenMultiRestaurantGuide}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-md transition-colors"
              title="Guide Modèle Multi-Restaurant & Nouveau Client"
            >
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden md:inline whitespace-nowrap font-medium">
                {lang === 'ar' ? 'نموذج العملاء' : 'Modèle Multi-Clients'}
              </span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-900 bg-stone-100 hover:bg-stone-200/70 border border-stone-200 rounded-md transition-colors"
            title={lang === 'fr' ? 'Changer en Arabe' : 'Changer en Français'}
            aria-label="Changer de langue"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span className="whitespace-nowrap font-medium">{lang === 'fr' ? 'العربية' : 'Français'}</span>
          </button>

          {/* Quick Export Code ZIP Button */}
          <button
            onClick={onOpenExport}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-md transition-colors"
            title="Télécharger le code source ZIP"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden lg:inline whitespace-nowrap font-medium">
              {lang === 'ar' ? 'تحميل الكود (ZIP)' : 'Code ZIP'}
            </span>
          </button>

          {/* Quick WhatsApp Configuration Settings Trigger */}
          <button
            onClick={onOpenWhatsAppConfig}
            className="inline-flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-md transition-colors"
            title={t.editWhatsApp}
            aria-label={t.editWhatsApp}
          >
            <Settings2 className="w-4 h-4 text-emerald-700" />
            <span className="hidden xl:inline whitespace-nowrap">{t.editWhatsApp}</span>
          </button>

          {/* Cart / Order Selection Trigger */}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70 rounded-md transition-colors"
            aria-label={t.myOrder}
          >
            <ShoppingBag className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline font-semibold whitespace-nowrap">{t.myOrder}</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold text-white bg-amber-800 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button: Reservation */}
          <button
            onClick={onOpenReservation}
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.reserveTable}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-700 hover:text-stone-950 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Mobile Restaurant Switcher */}
          {availableRestaurants.length > 1 && (
            <div className="p-3 bg-white rounded-lg border border-stone-200/80 space-y-1.5">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                {lang === 'ar' ? 'اختر المطعم المعروض:' : 'Restaurant actif :'}
              </span>
              <div className="flex gap-2">
                {availableRestaurants.map((r) => {
                  const isCurrent = r.id === currentRestaurantId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectRestaurant?.(r.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md border text-center transition-colors ${
                        isCurrent 
                          ? 'bg-amber-900 text-white border-amber-900' 
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {lang === 'ar' ? r.config.nameAr : r.config.nameFr}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-stone-800 hover:text-amber-800 hover:bg-stone-100/70 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200/80 flex flex-col gap-2">
            {onOpenMultiRestaurantGuide && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMultiRestaurantGuide();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors"
              >
                <Layers className="w-4 h-4 text-amber-700" />
                <span>{lang === 'ar' ? 'دليل إنشاء موقع لمطعم جديد (موديل)' : 'Guide création nouveau restaurant client'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExport();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ar' ? 'تحميل الكود المصدري (ZIP)' : 'Télécharger le code source (ZIP)'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg shadow-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.reserveTable}</span>
            </button>

            <div className="flex items-center justify-between text-xs text-stone-600 px-1 pt-1">
              <span>{lang === 'ar' ? 'الواتساب:' : 'WhatsApp:'} <strong className="font-mono text-stone-900">{config.whatsappNumber}</strong></span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppConfig();
                }}
                className="text-amber-800 font-medium underline"
              >
                {lang === 'ar' ? 'تعديل' : 'Modifier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
