import React from 'react';
import { Language, RestaurantConfig, HeroConfig, RestaurantTheme } from '../types/restaurant';
import { translations, cleanPhoneForWhatsApp } from '../utils/translations';
import { 
  UtensilsCrossed, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Compass, 
  Fish, 
  Award, 
  Clock 
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  config: RestaurantConfig;
  hero?: HeroConfig;
  theme?: RestaurantTheme;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  lang, 
  config, 
  hero, 
  theme, 
  onOpenReservation 
}) => {
  const t = translations[lang];

  const handleWhatsAppContact = () => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const message = encodeURIComponent(
      lang === 'ar'
        ? `السلام عليكم ورحمة الله، أود الاستفسار بخصوص مطعم ${config.nameAr} أو طلب معلومات إضافية.`
        : `Bonjour ${config.nameFr}, je souhaite avoir des renseignements ou réserver une table.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  // Dynamic values with fallback
  const heroBadge = lang === 'ar' ? (hero?.badgeAr || t.heroBadge) : (hero?.badgeFr || t.heroBadge);
  const heroTitle = lang === 'ar' ? (hero?.titleAr || t.heroTitle) : (hero?.titleFr || t.heroTitle);
  const heroSubtitle = lang === 'ar' ? (hero?.subtitleAr || t.heroSubtitle) : (hero?.subtitleFr || t.heroSubtitle);
  const heroImage = hero?.image || '/src/assets/images/hero_algerian_restaurant_1792571414205.jpg';
  const overlayBadge = lang === 'ar' ? (hero?.overlayBadgeAr || 'أجواء عريقة وعصرية') : (hero?.overlayBadgeFr || 'Ambiance Exceptionnelle');
  const overlayTitle = lang === 'ar' ? (hero?.overlayTitleAr || 'فخامة الضيافة الجزائرية') : (hero?.overlayTitleFr || 'L\'Élégance de la Grande Table');
  const cityText = lang === 'ar' ? config.cityAr : config.cityFr;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fish': return <Fish className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'ShieldCheck':
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const highlights = hero?.highlights && hero.highlights.length > 0 
    ? hero.highlights 
    : [
        {
          icon: 'ShieldCheck',
          titleFr: t.statFresh,
          titleAr: t.statFresh,
          descFr: 'Viandes locales d\'exception, légumes du jour et épices pures de nos terroirs.',
          descAr: 'لحوم جزائرية محلية منتقاة وخضار طازجة يومية بدون أي مواد حافظة.',
        },
        {
          icon: 'Flame',
          titleFr: t.statRecipes,
          titleAr: t.statRecipes,
          descFr: 'Pâtes faites main, couscous roulé à l\'ancienne et cuissons lentes au feu de braise.',
          descAr: 'رشتة وكسكسي وشخشوخة مفتولة على الطريقة اليدوية الأصيلة المتوارثة.',
        },
        {
          icon: 'Compass',
          titleFr: t.statAmbiance,
          titleAr: t.statAmbiance,
          descFr: 'Salons intimistes, décor zellige et service raffiné pour familles et événements.',
          descAr: 'أقواس أندلسية راقية وصالونات مهيأة للعائلات مع شاي النعناع بالصينية التقليدية.',
        },
      ];

  const primaryColor = theme?.primaryColor || '#92400e';
  const primaryLight = theme?.primaryLight || '#fef3c7';

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 sm:pt-10 pb-16 lg:pb-24 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Architectural Kicker (unboxed clean text, no pill spam) */}
            <div 
              className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{heroBadge}</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span className="text-stone-500 font-normal">{cityText}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-stone-900 leading-[1.15] tracking-tight [text-wrap:balance]">
              {heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              {heroSubtitle}
            </p>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-stone-950 hover:opacity-90 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
                style={{ backgroundColor: primaryColor }}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{t.heroCtaMenu}</span>
              </a>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-2xs transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{t.heroCtaReserve}</span>
              </button>

              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
                title={`WhatsApp: ${config.whatsappNumber}`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>{t.heroCtaWhatsApp}</span>
              </button>
            </div>

            {/* Live WhatsApp number indicator badge */}
            <div className="pt-1 flex items-center gap-2 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>{lang === 'ar' ? 'واتساب متاح للمحادثة الفورية والحجز:' : 'WhatsApp direct disponible:'}</span>
              <strong className="font-mono text-stone-800 font-semibold">{config.whatsappNumber}</strong>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/90 aspect-[4/3] lg:aspect-auto lg:h-[480px] bg-stone-100">
              <img
                src={heroImage}
                alt={lang === 'ar' ? (hero?.imageAltAr || config.nameAr) : (hero?.imageAltFr || config.nameFr)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay Label Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-auto flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    {overlayBadge}
                  </p>
                  <p className="text-lg font-serif font-bold text-white leading-snug">
                    {overlayTitle}
                  </p>
                </div>
                <div className="shrink-0 text-right bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
                  <span className="text-stone-300 block">{lang === 'ar' ? 'خدمة يومية' : 'Service 7j/7'}</span>
                  <span className="font-semibold text-amber-200">{cityText}</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative geometric backdrop */}
            <div 
              className="absolute -top-4 -right-4 -z-10 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-50"
              style={{ backgroundColor: primaryLight }}
            />
          </div>
        </div>

        {/* 3-Point Architectural Trust Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div 
                className="p-2.5 rounded-lg border shrink-0"
                style={{ 
                  backgroundColor: primaryLight, 
                  borderColor: `${primaryColor}30`, 
                  color: primaryColor 
                }}
              >
                {renderIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900">
                  {lang === 'ar' ? item.titleAr : item.titleFr}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {lang === 'ar' ? item.descAr : item.descFr}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
