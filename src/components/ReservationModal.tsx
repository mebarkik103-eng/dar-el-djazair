import React, { useState } from 'react';
import { Language, RestaurantConfig, ReservationData } from '../types/restaurant';
import { translations, cleanPhoneForWhatsApp } from '../utils/translations';
import { Calendar, Users, Clock, MapPin, MessageCircle, CheckCircle2, X, Sparkles } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  lang: Language;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  config,
  lang,
}) => {
  const t = translations[lang];

  // Form state
  const [formData, setFormData] = useState<ReservationData>({
    fullName: '',
    phone: '',
    guestsCount: 2,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    seatingArea: 'indoor',
    specialRequests: '',
  });

  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ReservationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getAreaLabel = (areaKey: string) => {
    if (areaKey === 'patio') return t.areaPatio;
    if (areaKey === 'moorish_lounge') return t.areaLounge;
    return t.areaIndoor;
  };

  const handleSendViaWhatsApp = () => {
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const areaName = getAreaLabel(formData.seatingArea);

    const message = encodeURIComponent(
      lang === 'ar'
        ? `*طلب حجز طاولة جديدة - مطعم ${config.nameAr}*\n\n` +
          `• الاسم: ${formData.fullName || 'زبون محترم'}\n` +
          `• رقم الهاتف: ${formData.phone || 'غير محدد'}\n` +
          `• عدد الأشخاص: ${formData.guestsCount} أشخاص\n` +
          `• التاريخ: ${formData.date}\n` +
          `• التوقيت: ${formData.time}\n` +
          `• الصالة المفضلة: ${areaName}\n` +
          (formData.specialRequests ? `• ملاحظات خاصة: ${formData.specialRequests}\n` : '') +
          `\nيرجى تأكيد إمكانية الحجز، شكراً جزيلاً.`
        : `*Demande de Réservation - ${config.nameFr}*\n\n` +
          `• Nom : ${formData.fullName || 'Client'}\n` +
          `• Téléphone : ${formData.phone || 'Non renseigné'}\n` +
          `• Nombre de personnes : ${formData.guestsCount}\n` +
          `• Date : ${formData.date}\n` +
          `• Heure : ${formData.time}\n` +
          `• Espace : ${areaName}\n` +
          (formData.specialRequests ? `• Note : ${formData.specialRequests}\n` : '') +
          `\nMerci de bien vouloir me confirmer la disponibilité de cette table.`
    );

    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    setIsSubmittedSuccess(true);
  };

  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-700/80 rounded-xl text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">
                {t.resModalTitle}
              </h3>
              <p className="text-xs text-stone-300">
                {lang === 'ar' ? 'خدمة الاستقبال والتأكيد الفوري' : 'Confirmation rapide sans attente'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmittedSuccess ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-serif font-bold text-stone-900">
                {t.resSuccessTitle}
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                {t.resSuccessDesc}
              </p>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1 text-left rtl:text-right max-w-sm mx-auto mt-4">
                <p><strong>{t.formName}:</strong> {formData.fullName || '---'}</p>
                <p><strong>{t.formGuests}:</strong> {formData.guestsCount} {lang === 'ar' ? 'أشخاص' : 'personnes'}</p>
                <p><strong>{t.formDate}:</strong> {formData.date} à {formData.time}</p>
                <p><strong>{t.formArea}:</strong> {getAreaLabel(formData.seatingArea)}</p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    setIsSubmittedSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitInternal} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.resModalDesc}
              </p>

              {/* Name & Phone in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.formName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: كريم بن علي' : 'Ex: Karim Benali'}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.formPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="05 / 06 / 07..."
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
                  />
                </div>
              </div>

              {/* Guests & Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.formGuests}
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => handleInputChange('guestsCount', parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {lang === 'ar' ? (num === 1 ? 'شخص' : 'أشخاص') : (num === 1 ? 'personne' : 'personnes')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.formDate}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.formTime}
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                  >
                    {['12:00', '12:30', '13:00', '13:30', '14:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area preference */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">
                  {t.formArea}
                </label>
                <select
                  value={formData.seatingArea}
                  onChange={(e) => handleInputChange('seatingArea', e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                >
                  <option value="indoor">{t.areaIndoor}</option>
                  <option value="patio">{t.areaPatio}</option>
                  <option value="moorish_lounge">{t.areaLounge}</option>
                </select>
              </div>

              {/* Special Notes */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">
                  {t.formNotes}
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder={lang === 'ar' ? 'أي طلبات إضافية...' : 'Ex : table près de la fontaine, chaise pour enfant...'}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                />
              </div>

              {/* Submission CTA buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.submitRes}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
                  <span>{t.sendResWhatsApp}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
