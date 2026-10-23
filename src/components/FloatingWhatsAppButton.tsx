import React from 'react';
import { Language, RestaurantConfig } from '../types/restaurant';
import { cleanPhoneForWhatsApp } from '../utils/translations';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  config: RestaurantConfig;
  lang: Language;
  hasCartItems?: boolean;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ config, lang, hasCartItems }) => {
  const handleOpenWhatsApp = () => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const message = encodeURIComponent(
      lang === 'ar'
        ? `السلام عليكم، أود التواصل مع مطعم ${config.nameAr}.`
        : `Bonjour ${config.nameFr}, je souhaite des informations.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`fixed ${hasCartItems ? 'bottom-24 sm:bottom-22' : 'bottom-5'} right-5 rtl:right-auto rtl:left-5 z-30 group transition-all duration-300`}>
      <button
        onClick={handleOpenWhatsApp}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
          {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}
        </span>
      </button>
    </div>
  );
};
