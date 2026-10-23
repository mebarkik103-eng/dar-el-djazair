import React from 'react';
import { Language, CartItem, RestaurantConfig } from '../types/restaurant';
import { translations, formatDZD, cleanPhoneForWhatsApp } from '../utils/translations';
import { ShoppingBag, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface BottomCartBarProps {
  cart: CartItem[];
  lang: Language;
  config: RestaurantConfig;
  onOpenCart: () => void;
}

export const BottomCartBar: React.FC<BottomCartBarProps> = ({
  cart,
  lang,
  config,
  onOpenCart,
}) => {
  const t = translations[lang];

  if (cart.length === 0) return null;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleQuickWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const orderItemsText = cart
      .map((entry) => {
        const dishName = lang === 'ar' ? entry.item.nameAr : entry.item.nameFr;
        const unitPriceStr = formatDZD(entry.item.price, lang);
        const subtotalStr = formatDZD(entry.item.price * entry.quantity, lang);
        return lang === 'ar'
          ? `• ${entry.quantity}x ${dishName} | سعر الوحدة: ${unitPriceStr} | المجموع: ${subtotalStr}`
          : `• ${entry.quantity}x ${dishName} (Prix unitaire : ${unitPriceStr}) — Sous-total : ${subtotalStr}`;
      })
      .join('\n');

    const totalStr = formatDZD(totalAmount, lang);

    const message = encodeURIComponent(
      lang === 'ar'
        ? `*طلب وجبات جديد من موقع ${config.nameAr}*\n\n` +
          `قائمة الأطباق المختارة:\n${orderItemsText}\n\n` +
          `*المجموع الإجمالي للطلبية: ${totalStr}*\n\n` +
          `يرجى تأكيد استلام الطلب وتحديد الوقت المتوقع للجاهزية. شكراً لكم!`
        : `*Nouvelle Commande - ${config.nameFr}*\n\n` +
          `Détail des plats sélectionnés :\n${orderItemsText}\n\n` +
          `*Montant Total de la commande : ${totalStr}*\n\n` +
          `Merci de bien vouloir me confirmer la prise en compte de la commande et le délai estimé.`
    );

    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div 
        onClick={onOpenCart}
        className="bg-stone-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-amber-600/30 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-900 transition-all hover:scale-[1.01]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative p-2.5 bg-amber-800 rounded-xl shrink-0">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-stone-900 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-mono">
              {totalCount}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-300 font-medium truncate">
                {totalCount} {lang === 'ar' ? 'أطباق مختارة' : 'plat(s) sélectionné(s)'}
              </span>
            </div>
            <span className="text-base sm:text-lg font-bold font-mono text-amber-300 tabular-nums block">
              {formatDZD(totalAmount, lang)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleQuickWhatsAppOrder}
            className="p-2.5 sm:px-3 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            title={t.orderWhatsAppDirect}
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span className="hidden sm:inline whitespace-nowrap">{lang === 'ar' ? 'طلب واتساب' : 'WhatsApp'}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>{t.viewCart}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
