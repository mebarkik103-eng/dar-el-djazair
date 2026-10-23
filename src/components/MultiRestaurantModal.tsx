import React, { useState } from 'react';
import { Language } from '../types/restaurant';
import { AVAILABLE_RESTAURANTS } from '../config/restaurantsRegistry';
import { 
  X, 
  Layers, 
  Copy, 
  Check, 
  FileCode, 
  Sparkles, 
  Palette, 
  Phone, 
  UtensilsCrossed,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface MultiRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectRestaurant?: (id: string) => void;
  currentRestaurantId?: string;
}

export const MultiRestaurantModal: React.FC<MultiRestaurantModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectRestaurant,
  currentRestaurantId,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySnippet = () => {
    const snippet = `// Exemple pour un nouveau client (ex: Restaurant El Kantara Constantine)
import { RestaurantProfile } from '../../types/restaurant';

export const monNouveauRestaurantProfile: RestaurantProfile = {
  id: 'el-kantara-constantine',
  slug: 'el-kantara-constantine',
  config: {
    nameFr: 'El Kantara',
    nameAr: 'مطعم القنطرة',
    taglineFr: 'Gastronomie Constantinoise & Tradition des Ponts',
    taglineAr: 'أصالة المطبخ القسنطيني العريق وعبق الصخر العتيق',
    whatsappNumber: '+213 661 00 11 22',
    phone: '+213 (0) 31 92 00 00',
    email: 'contact@elkantara-constantine.dz',
    addressFr: 'Place des Martyrs, Constantine (Adresse fictive de démonstration)',
    addressAr: 'ساحة الشهداء، قسنطينة (عنوان تجريبي)',
    cityFr: 'Constantine, Algérie',
    cityAr: 'قسنطينة، الجزائر',
    isAddressFictionalNotice: true,
    hoursFr: [{ days: 'Tous les jours', hours: '11h30 – 23h30' }],
    hoursAr: [{ days: 'يومياً', hours: '11:30 – 23:30' }],
  },
  theme: {
    primaryColor: '#7c2d12', // Warm Terracotta / Ocre
    primaryHover: '#581c87',
    primaryLight: '#ffedd5',
    secondaryColor: '#1c1917',
    accentColor: '#d97706',
    bodyBg: '#FAF8F5',
    cardBg: '#ffffff',
    badgeBg: '#ffedd5',
    badgeText: '#7c2d12',
    stylePreset: 'sahara-gold',
  },
  categories: [
    { id: 'entrees', nameFr: 'Entrées Constantinoises', nameAr: 'المقبلات والشوربة', icon: 'Flame' },
    { id: 'plats', nameFr: 'Plats Traditionnels & Chakhchoukha', nameAr: 'شخشوخة وأطباق تقليدية', icon: 'Sparkles' },
    { id: 'douceurs', nameFr: 'Djouzina & Pâtisseries', nameAr: 'جوزية وحلويات قسنطينة', icon: 'Cake' },
  ],
  menuItems: [ /* Vos plats avec prix en DZD */ ],
  gallery: [ /* Vos photos */ ],
  hero: { /* Textes et image d'accueil */ },
  about: { /* Histoire et passion du chef */ }
};`;

    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                {lang === 'ar' ? 'نموذج متعدد المطاعم (White-Label Template)' : 'Modèle Multi-Restaurants Réutilisable'}
              </h3>
              <p className="text-xs text-stone-300">
                {lang === 'ar' ? 'إنشاء نسخ مستقلة لكل عميل مطعم بكل سهولة وسرعة' : 'Créer une version indépendante pour chaque restaurant client sans recréer le site'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          
          {/* Quick Demo Switcher Card */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              {lang === 'ar' ? '1. تجربة التبديل المباشر بين المطاعم الجاهزة:' : '1. Démonstration active des restaurants configurés :'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_RESTAURANTS.map((res) => {
                const isSelected = res.id === currentRestaurantId;
                return (
                  <button
                    key={res.id}
                    onClick={() => {
                      onSelectRestaurant?.(res.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-white border-amber-600 ring-2 ring-amber-600/20 shadow-xs'
                        : 'bg-white/80 border-stone-200 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full mt-1 shrink-0" 
                      style={{ backgroundColor: res.theme.primaryColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <strong className="text-stone-900 font-bold block truncate">
                          {lang === 'ar' ? res.config.nameAr : res.config.nameFr}
                        </strong>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                            {lang === 'ar' ? 'الحالي' : 'Actif'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-500 block">
                        {lang === 'ar' ? res.config.cityAr : res.config.cityFr} • {res.menuItems.length} {lang === 'ar' ? 'أطباق' : 'plats'}
                      </span>
                      <span className="text-[11px] text-stone-400 block truncate mt-0.5">
                        WhatsApp: {res.config.whatsappNumber}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architecture & Isolation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ar' ? '2. عزل تام للبيانات (Isolation)' : '2. Étanchéité et isolation stricte des données'}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {lang === 'ar'
                ? 'بيانات كل مطعم معزولة تماماً: السلة ورقم الواتساب الخاص بالعميل ومشترياته تُخزن بمفتاح خاص برقم تعريف المطعم (Restaurant ID) في التخزين المحلي، فلا يمكن لأي مطعم التأثير على مطعم آخر.'
                : 'Les données de chaque restaurant sont 100% isolées. Le panier, le total et le numéro WhatsApp sont compartimentés par clé de restaurant (ex: restaurant_cart_el-bahia-oran), garantissant qu\'aucun client ne peut modifier ou écraser les données d\'un autre.'}
            </p>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              {lang === 'ar' ? '3. خطوات إنشاء موقع جديد لأي مطعم جزائري في 3 دقائق:' : '3. Comment créer un nouveau site pour un client en 3 étapes :'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">1</div>
                <h4 className="font-bold text-stone-900 text-xs">
                  {lang === 'ar' ? 'نسخ الملف النموذجي' : 'Dupliquer le modèle'}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Copiez <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">src/config/restaurants/nouveauClientTemplate.ts</code> vers <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">monClient.ts</code>.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">2</div>
                <h4 className="font-bold text-stone-900 text-xs">
                  {lang === 'ar' ? 'تخصيص الهوية والأسعار' : 'Personnaliser l\'identité'}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Renseignez le nom, la ville, les couleurs primaires/secondaires, le numéro WhatsApp et vos plats avec prix en DZD.
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">3</div>
                <h4 className="font-bold text-stone-900 text-xs">
                  {lang === 'ar' ? 'النشر أو التعيين كافتراضي' : 'Définir comme actif'}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Dans <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">activeRestaurant.ts</code>, définissez l'ID de votre client comme défaut, ou exportez l'archive ZIP.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Copy Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {lang === 'ar' ? 'مقتطف كود التكوين (TypeScript) :' : 'Extrait de profil type prêt à l\'emploi :'}
              </span>
              <button
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copié !') : (lang === 'ar' ? 'نسخ المقتطف' : 'Copier')}</span>
              </button>
            </div>
            <pre className="p-3 bg-stone-900 text-stone-200 rounded-xl text-[11px] font-mono overflow-x-auto max-h-44 leading-relaxed">
{`// Fichier : src/config/restaurants/monRestaurant.ts
export const monRestaurantProfile: RestaurantProfile = {
  id: 'restaurant-slug',
  config: {
    nameFr: 'Nom du Restaurant',
    nameAr: 'اسم المطعم',
    whatsappNumber: '+213 555 12 34 56',
    addressFr: 'Rue Principale, Alger (Adresse fictive)',
    hoursFr: [{ days: 'Tous les jours', hours: '11h30 – 23h30' }]
  },
  theme: {
    primaryColor: '#0284c7', // Couleur dominante
    primaryLight: '#e0f2fe',
    bodyBg: '#FAF8F5'
  },
  categories: [ ... ],
  menuItems: [ ... ]
};`}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            {lang === 'ar' ? 'ملف القالب موجود في: src/config/restaurants/nouveauClientTemplate.ts' : 'Fichier template disponible dans src/config/restaurants/nouveauClientTemplate.ts'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            {lang === 'ar' ? 'إغلاق النافذة' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};
