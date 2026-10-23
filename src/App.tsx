/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Language, RestaurantConfig, CartItem, MenuItem, RestaurantProfile } from './types/restaurant';
import { AVAILABLE_RESTAURANTS, getRestaurantById } from './config/restaurantsRegistry';
import { DEFAULT_ACTIVE_RESTAURANT_ID } from './config/activeRestaurant';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { HoursAndLocation } from './components/HoursAndLocation';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { BottomCartBar } from './components/BottomCartBar';
import { ExportModal } from './components/ExportModal';
import { MultiRestaurantModal } from './components/MultiRestaurantModal';
import { RestaurantSelector } from './components/RestaurantSelector';

export default function App() {
  // Active Restaurant Profile Selection (Multi-Restaurant Support)
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>(() => {
    const saved = localStorage.getItem('active_restaurant_id');
    if (saved && AVAILABLE_RESTAURANTS.some(r => r.id === saved)) {
      return saved;
    }
    return DEFAULT_ACTIVE_RESTAURANT_ID;
  });

  const activeProfile: RestaurantProfile = useMemo(() => {
    return getRestaurantById(activeRestaurantId) || AVAILABLE_RESTAURANTS[0];
  }, [activeRestaurantId]);

  // Language State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('dar_restaurant_lang');
    return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
  });

  // Custom WhatsApp Number Map per Restaurant (Isolated storage)
  const [customWhatsAppMap, setCustomWhatsAppMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('custom_restaurant_whatsapp_map');
      if (saved) return JSON.parse(saved);
      // Migrate legacy single number if present
      const legacyNumber = localStorage.getItem('dar_restaurant_whatsapp');
      if (legacyNumber) {
        return { 'dar-el-djazair': legacyNumber };
      }
      return {};
    } catch {
      return {};
    }
  });

  // Current config with customized WhatsApp override if any
  const currentConfig: RestaurantConfig = useMemo(() => {
    const customNum = customWhatsAppMap[activeProfile.id];
    if (customNum) {
      return { ...activeProfile.config, whatsappNumber: customNum };
    }
    return activeProfile.config;
  }, [activeProfile, customWhatsAppMap]);

  // Cart / Order State - Isolated per Restaurant ID to prevent any data cross-contamination
  const [cartMap, setCartMap] = useState<Record<string, CartItem[]>>(() => {
    try {
      const saved = localStorage.getItem('restaurant_carts_by_id');
      if (saved) return JSON.parse(saved);
      // Migrate legacy cart if present
      const legacyCart = localStorage.getItem('dar_restaurant_cart');
      if (legacyCart) {
        return { 'dar-el-djazair': JSON.parse(legacyCart) };
      }
      return {};
    } catch {
      return {};
    }
  });

  const currentCart: CartItem[] = useMemo(() => {
    return cartMap[activeProfile.id] || [];
  }, [cartMap, activeProfile.id]);

  // Modals & Drawers
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppConfigOpen, setIsWhatsAppConfigOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isMultiRestaurantGuideOpen, setIsMultiRestaurantGuideOpen] = useState(false);

  // Sync RTL / LTR on language change
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('dar_restaurant_lang', lang);
  }, [lang]);

  // Sync Active Restaurant ID to LocalStorage
  useEffect(() => {
    localStorage.setItem('active_restaurant_id', activeRestaurantId);
  }, [activeRestaurantId]);

  // Sync Carts Map to LocalStorage
  useEffect(() => {
    localStorage.setItem('restaurant_carts_by_id', JSON.stringify(cartMap));
  }, [cartMap]);

  // Sync Custom WhatsApp Numbers Map to LocalStorage
  useEffect(() => {
    localStorage.setItem('custom_restaurant_whatsapp_map', JSON.stringify(customWhatsAppMap));
  }, [customWhatsAppMap]);

  // Dynamic Theme CSS Custom Properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', activeProfile.theme.primaryColor);
    root.style.setProperty('--color-primary-hover', activeProfile.theme.primaryHover);
    root.style.setProperty('--color-primary-light', activeProfile.theme.primaryLight);
    root.style.setProperty('--color-secondary', activeProfile.theme.secondaryColor);
    root.style.setProperty('--color-accent', activeProfile.theme.accentColor);
  }, [activeProfile]);

  // Toast notification on restaurant switch
  const [switchToast, setSwitchToast] = useState<{
    name: string;
    city: string;
    visible: boolean;
  } | null>(null);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const handleSelectRestaurant = (id: string) => {
    setActiveRestaurantId(id);
    try {
      localStorage.setItem('active_restaurant_id', id);
    } catch {
      // safe fallback
    }

    const targetProfile = getRestaurantById(id);
    if (targetProfile) {
      setSwitchToast({
        name: lang === 'ar' ? targetProfile.config.nameAr : targetProfile.config.nameFr,
        city: lang === 'ar' ? targetProfile.config.cityAr : targetProfile.config.cityFr,
        visible: true,
      });
      setTimeout(() => {
        setSwitchToast(null);
      }, 3500);
    }
  };

  const handleSaveWhatsAppNumber = (newNumber: string) => {
    setCustomWhatsAppMap((prev) => ({
      ...prev,
      [activeProfile.id]: newNumber,
    }));
  };

  // Cart operations (isolated to active restaurant)
  const handleAddToCart = (item: MenuItem) => {
    setCartMap((prev) => {
      const currentList = prev[activeProfile.id] || [];
      const existing = currentList.find((ci) => ci.item.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = currentList.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        updated = [...currentList, { item, quantity: 1 }];
      }
      return { ...prev, [activeProfile.id]: updated };
    });
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCartMap((prev) => {
      const currentList = prev[activeProfile.id] || [];
      const updated = currentList
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
      return { ...prev, [activeProfile.id]: updated };
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartMap((prev) => {
      const currentList = prev[activeProfile.id] || [];
      return {
        ...prev,
        [activeProfile.id]: currentList.filter((ci) => ci.item.id !== itemId),
      };
    });
  };

  const handleClearCart = () => {
    setCartMap((prev) => ({ ...prev, [activeProfile.id]: [] }));
  };

  const totalCartCount = currentCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div 
      className={`min-h-screen text-stone-900 selection:bg-amber-200 selection:text-stone-900 flex flex-col ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}
      style={{ backgroundColor: activeProfile.theme.bodyBg || '#FAF8F5' }}
    >
      {/* Top Interactive Restaurant Switcher Banner (Ensures 100% Visibility on all devices) */}
      <RestaurantSelector
        restaurants={AVAILABLE_RESTAURANTS}
        currentRestaurantId={activeRestaurantId}
        onSelectRestaurant={handleSelectRestaurant}
        lang={lang}
        variant="banner"
      />

      {/* Top Header with Restaurant Switcher */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        config={currentConfig}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenWhatsAppConfig={() => setIsWhatsAppConfigOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        availableRestaurants={AVAILABLE_RESTAURANTS}
        currentRestaurantId={activeRestaurantId}
        onSelectRestaurant={handleSelectRestaurant}
        onOpenMultiRestaurantGuide={() => setIsMultiRestaurantGuideOpen(true)}
      />

      {/* Restaurant Switch Notification Toast */}
      {switchToast && switchToast.visible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900/95 text-white shadow-2xl border border-amber-500/40 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              {lang === 'ar'
                ? `تم التبديل بنجاح إلى: ${switchToast.name} (${switchToast.city})`
                : `Restaurant actif : ${switchToast.name} (${switchToast.city})`}
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <Hero
          lang={lang}
          config={currentConfig}
          hero={activeProfile.hero}
          theme={activeProfile.theme}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* In-Menu Profile Selector for maximum visibility */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <RestaurantSelector
            restaurants={AVAILABLE_RESTAURANTS}
            currentRestaurantId={activeRestaurantId}
            onSelectRestaurant={handleSelectRestaurant}
            lang={lang}
            variant="menu"
          />
        </div>

        {/* Dynamic Menu Section with DZD Prices and Categories */}
        <MenuSection
          items={activeProfile.menuItems}
          categories={activeProfile.categories}
          theme={activeProfile.theme}
          lang={lang}
          config={currentConfig}
          cart={currentCart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateCartQuantity}
        />

        {/* Dynamic Gallery Section */}
        <GallerySection 
          lang={lang} 
          gallery={activeProfile.gallery}
          theme={activeProfile.theme}
        />

        {/* Opening Hours & Location (with Fictional Address Notice) */}
        <HoursAndLocation
          lang={lang}
          config={currentConfig}
          onOpenWhatsAppConfig={() => setIsWhatsAppConfigOpen(true)}
        />

        {/* About & Culinary Heritage */}
        <AboutSection 
          lang={lang} 
          about={activeProfile.about}
          theme={activeProfile.theme}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        config={currentConfig}
        onToggleLang={toggleLanguage}
        onOpenWhatsAppConfig={() => setIsWhatsAppConfigOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* Persistent Floating Bottom Cart Bar when items are selected */}
      <BottomCartBar
        cart={currentCart}
        lang={lang}
        config={currentConfig}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Quick WhatsApp Action */}
      <FloatingWhatsAppButton
        config={currentConfig}
        lang={lang}
        hasCartItems={currentCart.length > 0}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        config={currentConfig}
        lang={lang}
      />

      {/* Order Drawer (Cart, Subtotals, DZD, Checkout via WhatsApp) */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={currentCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        config={currentConfig}
        lang={lang}
      />

      {/* WhatsApp Number Modification Modal */}
      <WhatsAppConfigModal
        isOpen={isWhatsAppConfigOpen}
        onClose={() => setIsWhatsAppConfigOpen(false)}
        config={currentConfig}
        onSaveWhatsAppNumber={handleSaveWhatsAppNumber}
        lang={lang}
      />

      {/* Export / Download Source Code Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lang={lang}
      />

      {/* Reusable Multi-Restaurant Template Guide Modal */}
      <MultiRestaurantModal
        isOpen={isMultiRestaurantGuideOpen}
        onClose={() => setIsMultiRestaurantGuideOpen(false)}
        lang={lang}
        onSelectRestaurant={handleSelectRestaurant}
        currentRestaurantId={activeRestaurantId}
      />
    </div>
  );
}
