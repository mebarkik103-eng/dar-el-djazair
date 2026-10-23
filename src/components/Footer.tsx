import React from 'react';
import { Language, RestaurantConfig } from '../types/restaurant';
import { translations, cleanPhoneForWhatsApp } from '../utils/translations';
import { ArrowUp, MessageCircle, Phone, MapPin, Globe, Download } from 'lucide-react';

interface FooterProps {
  lang: Language;
  config: RestaurantConfig;
  onToggleLang: () => void;
  onOpenWhatsAppConfig: () => void;
  onOpenReservation: () => void;
  onOpenExport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  config,
  onToggleLang,
  onOpenWhatsAppConfig,
  onOpenReservation,
  onOpenExport,
}) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppContact = () => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const message = encodeURIComponent(
      lang === 'ar'
        ? `السلام عليكم، أود التواصل مع مطعم ${config.nameAr}.`
        : `Bonjour ${config.nameFr}, je souhaite des informations.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer id="contact" className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="text-2xl font-serif font-bold text-white tracking-tight block">
              {lang === 'ar' ? config.nameAr : config.nameFr}
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ar' ? config.taglineAr : config.taglineFr}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-700 rounded-lg transition-colors"
              >
                <span>{t.reserveTable}</span>
              </button>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {lang === 'ar' ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">{t.navMenu}</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">{t.navGallery}</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">{t.navHours}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">{t.navAbout}</a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenExport}
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تحميل الكود المصدري (.ZIP)' : 'Télécharger le code source (.ZIP)'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and WhatsApp Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {t.navContact}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? config.addressAr : config.addressFr}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="font-mono">{config.phone}</span>
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono font-medium text-white">{config.whatsappNumber}</span>
                </div>
                <button
                  onClick={onOpenWhatsAppConfig}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                >
                  {lang === 'ar' ? 'تعديل' : 'Modifier'}
                </button>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {t.openingHours}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <span className="text-white block font-medium">
                  {lang === 'ar' ? 'السبت إلى الخميس:' : 'Samedi à Jeudi :'}
                </span>
                <span className="font-mono text-stone-300">11h30 – 23h30</span>
              </div>
              <div>
                <span className="text-white block font-medium">
                  {lang === 'ar' ? 'يوم الجمعة:' : 'Vendredi :'}
                </span>
                <span className="font-mono text-stone-300">14h30 – 00h00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Explicit Fictional Mention & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="space-y-1 text-center md:text-left rtl:md:text-right">
            <p>© {new Date().getFullYear()} {lang === 'ar' ? config.nameAr : config.nameFr}. {t.footerRights}</p>
            <p className="text-[11px] text-stone-500">
              {lang === 'ar' ? 'العنوان وأرقام الهاتف هي بيانات تمثيلية تجريبية نموذجية.' : 'Adresses et numéros de téléphone fournis à titre d\'exemple fictif pour démonstration.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'العربية' : 'Français'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              title={t.scrollTop}
              aria-label={t.scrollTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
