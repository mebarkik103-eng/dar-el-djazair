import React, { useState } from 'react';
import { Language, CartItem, RestaurantConfig } from '../types/restaurant';
import { translations, formatDZD, cleanPhoneForWhatsApp } from '../utils/translations';
import { DishImage } from './DishImage';
import { ShoppingBag, Plus, Minus, Trash2, X, MessageCircle, AlertCircle, Check } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  config: RestaurantConfig;
  lang: Language;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  config,
  lang,
}) => {
  const t = translations[lang];
  const [emptyWarning, setEmptyWarning] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutViaWhatsApp = () => {
    if (cart.length === 0) {
      setEmptyWarning(true);
      setTimeout(() => setEmptyWarning(false), 3500);
      return;
    }

    const rawNumber = cleanPhoneForWhatsApp(config.whatsappNumber);
    const orderItemsText = cart
      .map((entry) => {
        const dishName = lang === 'ar' ? entry.item.nameAr : entry.item.nameFr;
        const unitPriceStr = formatDZD(entry.item.price, lang);
        const subtotalStr = formatDZD(entry.item.price * entry.quantity, lang);
        return lang === 'ar'
          ? `• ${entry.quantity}x ${dishName} | سعر الوحدة: ${unitPriceStr} | المجموع الجزئي: ${subtotalStr}`
          : `• ${entry.quantity}x ${dishName} (Prix unitaire : ${unitPriceStr}) — Sous-total : ${subtotalStr}`;
      })
      .join('\n');

    const totalStr = formatDZD(totalAmount, lang);

    const message = encodeURIComponent(
      lang === 'ar'
        ? `*طلب وجبات جديد من موقع ${config.nameAr}*\n\n` +
          `قائمة الأطباق المختارة:\n${orderItemsText}\n\n` +
          `*المجموع الإجمالي للطلبية: ${totalStr}*\n\n` +
          `رقم واتساب المطعم: ${config.whatsappNumber}\n` +
          `يرجى تأكيد استلام الطلب وتحديد الوقت المتوقع للجاهزية. شكراً لكم!`
        : `*Nouvelle Commande - ${config.nameFr}*\n\n` +
          `Détail des plats sélectionnés :\n${orderItemsText}\n\n` +
          `*Montant Total de la commande : ${totalStr}*\n\n` +
          `Contact restaurant : ${config.whatsappNumber}\n` +
          `Merci de bien vouloir me confirmer la prise en compte de la commande et le délai estimé.`
    );

    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-700/80 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold">
                {t.orderTitle}
              </h3>
              <span className="text-xs text-stone-300">
                {totalCount} {lang === 'ar' ? 'طبق في السلة' : 'plat(s) dans le panier'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {emptyWarning && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{t.emptyCartWarning}</span>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                {t.orderEmpty}
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                <span>{lang === 'ar' ? 'استعراض قائمة الطعام' : 'Découvrir la carte'}</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {cart.map((cartItem) => {
                const title = lang === 'ar' ? cartItem.item.nameAr : cartItem.item.nameFr;
                const unitPrice = cartItem.item.price;
                const subtotal = unitPrice * cartItem.quantity;

                return (
                  <div key={cartItem.item.id} className="py-4 flex gap-3.5 items-center">
                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                      <DishImage
                        src={cartItem.item.image}
                        alt={title}
                        dishName={title}
                      />
                    </div>

                    {/* Dish Info & Unit Price */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {title}
                      </h4>
                      
                      <div className="text-xs text-stone-500 mt-0.5 space-y-0.5">
                        <p className="font-mono tabular-nums">
                          <span className="text-stone-400">{t.unitPrice} : </span>
                          <span className="font-medium text-stone-700">{formatDZD(unitPrice, lang)}</span>
                        </p>
                        <p className="font-mono tabular-nums text-amber-900 font-semibold">
                          <span className="text-stone-400 font-normal">{t.subtotal} : </span>
                          <span>{formatDZD(subtotal, lang)}</span>
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono px-2 tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <div className="text-right shrink-0">
                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50"
                        title={lang === 'ar' ? 'حذف من السلة' : 'Retirer du panier'}
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer Checkout Area (Always visible as required) */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-700">{t.totalAmount}</span>
            <span className="text-xl font-bold font-mono text-stone-900 tabular-nums">
              {formatDZD(totalAmount, lang)}
            </span>
          </div>

          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t.orderWhatsAppHint}
          </p>

          {/* Commander sur WhatsApp Button */}
          <button
            onClick={handleCheckoutViaWhatsApp}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg shadow-sm transition-all ${
              cart.length > 0
                ? 'text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] cursor-pointer'
                : 'text-stone-400 bg-stone-200 hover:bg-stone-300 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4 h-4 fill-current opacity-80" />
            <span>{t.orderWhatsAppDirect}</span>
          </button>

          <div className="flex justify-between items-center text-xs pt-1">
            {cart.length > 0 ? (
              <button
                onClick={onClearCart}
                className="text-stone-500 hover:text-red-700 transition-colors"
              >
                {t.clearCart}
              </button>
            ) : (
              <span className="text-stone-400">{lang === 'ar' ? 'السلة فارغة' : 'Panier vide'}</span>
            )}
            <button
              onClick={onClose}
              className="text-stone-700 hover:text-stone-900 font-medium"
            >
              {lang === 'ar' ? 'متابعة التصفح' : 'Continuer mes choix'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
