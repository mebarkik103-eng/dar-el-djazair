import React from 'react';
import { Language, RestaurantConfig } from '../types/restaurant';
import { translations, cleanPhoneForWhatsApp } from '../utils/translations';
import { Clock, MapPin, Phone, MessageCircle, AlertCircle, Car, Users2, Mail, ExternalLink } from 'lucide-react';

interface HoursAndLocationProps {
  lang: Language;
  config: RestaurantConfig;
  onOpenWhatsAppConfig: () => void;
}

export const HoursAndLocation: React.FC<HoursAndLocationProps> = ({
  lang,
  config,
  onOpenWhatsAppConfig,
}) => {
  const t = translations[lang];

  const handleWhatsAppContact = () => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const message = encodeURIComponent(
      lang === 'ar'
        ? `السلام عليكم، أود التواصل مع إدارة مطعم ${config.nameAr}.`
        : `Bonjour ${config.nameFr}, je souhaite des informations concernant votre restaurant.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const hoursList = lang === 'ar' ? config.hoursAr : config.hoursFr;
  const addressText = lang === 'ar' ? config.addressAr : config.addressFr;
  const cityText = lang === 'ar' ? config.cityAr : config.cityFr;

  return (
    <section id="hours" className="py-16 sm:py-24 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            {lang === 'ar' ? 'أهلاً وسهلاً بكم' : 'Accueil & Disponibilité'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.hoursTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.hoursSubtitle}
          </p>
        </div>

        {/* Fictional Address Explicit Disclaimer Callout (as explicitly demanded in instructions) */}
        <div className="mb-10 p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5 max-w-3xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              {t.fictionalNoticeBadge}
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {t.fictionalNoticeText}
            </p>
          </div>
        </div>

        {/* 2-Column Content Grid: Left Hours & Services, Right Location & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Horaires d'Ouverture */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 border border-stone-200/90 shadow-2xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {t.openingHours}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'ar' ? 'خدمة مائدة متواصلة' : 'Service continu sur réservation et sans rendez-vous'}
                </p>
              </div>
            </div>

            {/* Schedule List */}
            <div className="divide-y divide-stone-100">
              {hoursList.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-semibold text-stone-900 text-sm sm:text-base block">
                      {item.days}
                    </span>
                    {item.note && (
                      <span className="text-xs text-stone-500">{item.note}</span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-amber-800 text-sm sm:text-base tabular-nums">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Comfort Amenities */}
            <div className="pt-4 border-t border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                <Users2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{t.familyWelcoming}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                <Car className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{t.valetParking}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Adresse & Contact WhatsApp Direct */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 border border-stone-200/90 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    {t.addressCard}
                  </h3>
                  <p className="text-xs text-stone-500">{cityText}</p>
                </div>
              </div>

              {/* Address details */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                <p className="text-sm font-semibold text-stone-900 leading-snug">
                  {addressText}
                </p>
                <p className="text-xs text-stone-600">
                  {lang === 'ar'
                    ? 'في قلب الجزائر العاصمة، بالقرب من ساحة البريد المركزي وشارع ديدوش مراد التاريخي.'
                    : 'À proximité de la Grande Poste et des transports urbains du centre-ville d\'Alger.'}
                </p>
              </div>

              {/* Contact numbers */}
              <div className="space-y-3">
                {/* WhatsApp row with interactive modification button */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0 fill-emerald-600/20" />
                    <div>
                      <span className="text-xs text-stone-600 block">{t.whatsappLabel}</span>
                      <strong className="font-mono text-sm sm:text-base text-stone-900 font-bold">
                        {config.whatsappNumber}
                      </strong>
                    </div>
                  </div>
                  <button
                    onClick={onOpenWhatsAppConfig}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline px-2 py-1"
                  >
                    {lang === 'ar' ? 'تعديل الرقم' : 'Modifier'}
                  </button>
                </div>

                {/* Phone row */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <Phone className="w-5 h-5 text-stone-600 shrink-0" />
                  <div>
                    <span className="text-xs text-stone-500 block">{t.phoneLabel}</span>
                    <span className="font-mono text-sm sm:text-base text-stone-800 font-medium">
                      {config.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppContact}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>{lang === 'ar' ? 'مراسلة المطعم عبر واتساب' : 'Contacter sur WhatsApp'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
