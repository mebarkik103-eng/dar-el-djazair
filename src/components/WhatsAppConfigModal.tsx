import React, { useState } from 'react';
import { Language, RestaurantConfig } from '../types/restaurant';
import { translations, cleanPhoneForWhatsApp } from '../utils/translations';
import { DEFAULT_CONFIG } from '../data/restaurantData';
import { MessageCircle, Check, X, RefreshCw, ExternalLink, HelpCircle } from 'lucide-react';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  onSaveWhatsAppNumber: (newNumber: string) => void;
  lang: Language;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveWhatsAppNumber,
  lang,
}) => {
  const t = translations[lang];
  const [phoneNumberInput, setPhoneNumberInput] = useState(config.whatsappNumber);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumberInput.trim()) return;
    onSaveWhatsAppNumber(phoneNumberInput.trim());
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 1200);
  };

  const handleResetDefault = () => {
    setPhoneNumberInput(DEFAULT_CONFIG.whatsappNumber);
    onSaveWhatsAppNumber(DEFAULT_CONFIG.whatsappNumber);
  };

  const handleTestWhatsApp = () => {
    const rawNumber = cleanPhoneForWhatsApp(phoneNumberInput);
    const testMsg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً، هذه رسالة اختبار للرابط المباشر من موقع مطعم ${config.nameAr}.`
        : `Bonjour, ceci est un test de contact direct depuis le site web du restaurant ${config.nameFr}.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${testMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif">
                {t.configWhatsAppTitle}
              </h3>
              <p className="text-xs text-stone-300">
                {lang === 'ar' ? 'تخصيص رقم الاتصال الفوري' : 'Personnalisation du contact direct'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t.configWhatsAppDesc}
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              {t.enterNumber}
            </label>
            <div className="relative">
              <input
                type="text"
                value={phoneNumberInput}
                onChange={(e) => setPhoneNumberInput(e.target.value)}
                placeholder="+213 555 12 34 56"
                className="w-full px-3.5 py-2.5 text-sm font-mono bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                required
              />
            </div>
            <span className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ar' ? 'يتم حفظ هذا الرقم محلياً في متصفحك.' : 'Ce numéro est stocké localement et utilisé pour tous les boutons WhatsApp du site.'}</span>
            </span>
          </div>

          {/* Test Link Button */}
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between text-xs">
            <span className="text-stone-600">
              {lang === 'ar' ? 'معاينة الرابط:' : 'Aperçu du lien :'}
            </span>
            <button
              type="button"
              onClick={handleTestWhatsApp}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              <span>{t.testWhatsAppBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feedback message */}
          {showSavedFeedback && (
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{t.numberSavedAlert}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveNumber}</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefault}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              title="Réinitialiser"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'إعادة ضبط' : 'Par défaut'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
