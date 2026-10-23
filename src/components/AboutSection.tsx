import React from 'react';
import { Language, AboutConfig, RestaurantTheme } from '../types/restaurant';
import { translations } from '../utils/translations';
import { Quote, History, Award } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
  about?: AboutConfig;
  theme?: RestaurantTheme;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, about, theme }) => {
  const t = translations[lang];

  const primaryColor = theme?.primaryColor || '#92400e';
  const primaryLight = theme?.primaryLight || '#fef3c7';

  const badgeText = lang === 'ar' ? (about?.badgeAr || 'أصالتنا وتاريخنا') : (about?.badgeFr || 'Mémoire & Passion');
  const titleText = lang === 'ar' ? (about?.titleAr || t.aboutTitle) : (about?.titleFr || t.aboutTitle);
  const p1Text = lang === 'ar' ? (about?.p1Ar || t.aboutP1) : (about?.p1Fr || t.aboutP1);
  const p2Text = lang === 'ar' ? (about?.p2Ar || t.aboutP2) : (about?.p2Fr || t.aboutP2);
  const quoteText = lang === 'ar' ? (about?.quoteAr || t.aboutChefQuote) : (about?.quoteFr || t.aboutChefQuote);
  const authorText = lang === 'ar' ? (about?.quoteAuthorAr || 'فريق الطهاة بالمطعم') : (about?.quoteAuthorFr || 'La brigade culinaire');
  const stampText = lang === 'ar' 
    ? (about?.stampBadgeAr || 'حفظ الموروث الغذائي العريق للأسر بأعلى معايير الضيافة والخدمة.') 
    : (about?.stampBadgeFr || 'Fiers ambassadeurs de la richesse et de l\'authenticité de la table.');
  const imageSrc = about?.image || '/src/assets/images/restaurant_tea_pastries_1792571416017.jpg';

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 aspect-[4/3] bg-stone-100">
              <img
                src={imageSrc}
                alt={titleText}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Cultural accolade stamp */}
            <div 
              className="mt-4 p-4 rounded-xl border flex items-center gap-3"
              style={{ backgroundColor: primaryLight, borderColor: `${primaryColor}40` }}
            >
              <Award className="w-6 h-6 shrink-0" style={{ color: primaryColor }} />
              <p className="text-xs text-stone-700 leading-snug">
                {stampText}
              </p>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div 
              className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <History className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              {titleText}
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>{p1Text}</p>
              <p>{p2Text}</p>
            </div>

            {/* Chef quote */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 relative">
              <Quote 
                className="w-8 h-8 absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-30" 
                style={{ color: primaryColor }}
              />
              <p className="text-sm sm:text-base italic font-serif text-stone-800 leading-relaxed">
                {quoteText}
              </p>
              <span 
                className="block mt-3 text-xs font-semibold"
                style={{ color: primaryColor }}
              >
                — {authorText}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
