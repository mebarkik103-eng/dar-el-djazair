/**
 * MODÈLE DE CONFIGURATION POUR NOUVEAU RESTAURANT (TEMPLATE)
 * 
 * Comment l'utiliser pour un nouveau client :
 * 1. Dupliquez ce fichier et renommez-le, par exemple : `monRestaurant.ts`
 * 2. Remplissez les informations ci-dessous (Nom, WhatsApp, Téléphone, Adresse, Horaires, Couleurs, Menu, Photos).
 * 3. Enregistrez-le dans `src/config/restaurantsRegistry.ts`.
 * 4. Dans `src/config/activeRestaurant.ts`, définissez `ACTIVE_RESTAURANT_ID = 'mon-restaurant'`.
 * C'est tout ! Le site adoptera immédiatement la nouvelle identité sans toucher au code de l'interface.
 */

import { RestaurantProfile } from '../../types/restaurant';

export const nouveauClientTemplate: RestaurantProfile = {
  // Identifiant unique (minuscules sans espaces, ex: 'le-palmier', 'pizzeria-roma')
  id: 'nouveau-restaurant',
  slug: 'nouveau-restaurant',

  // 1. Coordonnées et informations générales
  config: {
    nameFr: 'Nom du Restaurant',
    nameAr: 'اسم المطعم',
    taglineFr: 'Spécialités Traditionnelles & Gastronomie',
    taglineAr: 'المأكولات الشهية والأصالة',
    whatsappNumber: '+213 555 00 00 00', // Numéro qui recevra les commandes WhatsApp
    phone: '+213 (0) 21 00 00 00',
    email: 'contact@mon-restaurant.dz',
    addressFr: 'Rue Principale, Alger (Adresse du restaurant)',
    addressAr: 'الشارع الرئيسي، الجزائر العاصمة',
    cityFr: 'Alger, Algérie',
    cityAr: 'الجزائر العاصمة',
    isAddressFictionalNotice: false, // Mettre true si adresse de démo, false en production
    hoursFr: [
      { days: 'Samedi – Jeudi', hours: '11h30 – 23h30', note: 'Service midi & soir' },
      { days: 'Vendredi', hours: '14h30 – 00h00', note: 'Ouverture après la prière' },
    ],
    hoursAr: [
      { days: 'السبت – الخميس', hours: '11:30 – 23:30', note: 'خدمة متواصلة' },
      { days: 'الجمعة', hours: '14:30 – 00:00', note: 'بعد صلاة الجمعة' },
    ],
  },

  // 2. Palette graphique et couleurs (personnalisables)
  theme: {
    primaryColor: '#b45309', // Couleur principale (boutons, titres mis en valeur)
    primaryHover: '#92400e', // Couleur au survol
    primaryLight: '#fef3c7', // Teinte douce pour les badges et surbrillances
    secondaryColor: '#1c1917', // Couleur des textes et fonds sombres
    accentColor: '#d97706', // Couleur d'accentuation
    bodyBg: '#FAF8F5', // Fond général de la page
    cardBg: '#ffffff', // Fond des cartes de plats
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    stylePreset: 'andalusian-warm', // Options : 'andalusian-warm' | 'mediterranean-azure' | 'sahara-gold' | 'emerald-contemporary'
  },

  // 3. Section d'accueil (Hero)
  hero: {
    badgeFr: 'Restaurant Familial & Gastronomique',
    badgeAr: 'مطعم عائلي راقٍ',
    titleFr: 'Des Saveurs Authentiques à Chaque Bouchée',
    titleAr: 'نكهات أصيلة لا تُنسى',
    subtitleFr: 'Bienvenue dans notre établissement où chaque recette est préparée avec passion et des ingrédients frais.',
    subtitleAr: 'مرحباً بكم في مطعمنا حيث تلتقي الجودة العالية بالمذاق الرائع.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    imageAltFr: 'Vue de la salle du restaurant',
    imageAltAr: 'صورة قاعة المطعم',
    overlayBadgeFr: 'Ambiance Chaleureuse',
    overlayBadgeAr: 'أجواء عائلية مريحة',
    overlayTitleFr: 'Le Goût du Fait Maison',
    overlayTitleAr: 'طعم الطبخ المنزلي الأصيل',
    highlights: [
      {
        icon: 'ShieldCheck',
        titleFr: '100% Frais & Halal',
        titleAr: '100% طازج وحلال',
        descFr: 'Ingrédients sélectionnés chaque jour avec soin.',
        descAr: 'مكونات محلية طازجة يومياً.',
      },
      {
        icon: 'Flame',
        titleFr: 'Recettes Artisanales',
        titleAr: 'وصفات تقليدية شهية',
        descFr: 'Une cuisson maîtrisée et des sauces maison.',
        descAr: 'طهي متقن بنكهات أصيلة.',
      },
      {
        icon: 'Compass',
        titleFr: 'Accueil & Convivialité',
        titleAr: 'خدمة راقية واستقبال دافئ',
        descFr: 'Des espaces pensés pour les familles et repas d\'affaires.',
        descAr: 'فضاءات مجهزة لاستقبال العائلات والمناسبات.',
      },
    ],
  },

  // 4. Catégories du Menu
  categories: [
    { id: 'entrees', nameFr: 'Entrées & Salades', nameAr: 'المقبلات والسلطات', icon: 'Flame' },
    { id: 'plats', nameFr: 'Plats Principaux', nameAr: 'الأطباق الرئيسية', icon: 'Sparkles' },
    { id: 'grillades', nameFr: 'Grillades au Feu de Bois', nameAr: 'المشاوي', icon: 'Flame' },
    { id: 'desserts', nameFr: 'Desserts & Douceurs', nameAr: 'التحليات والحلويات', icon: 'Cake' },
    { id: 'boissons', nameFr: 'Boissons & Thés', nameAr: 'المشروبات والشاي', icon: 'Coffee' },
  ],

  // 5. Liste des plats et prix en Dinars Algériens (DZD)
  menuItems: [
    {
      id: 'plat-exemple-1',
      category: 'plats',
      nameFr: 'Plat Signature Maison',
      nameAr: 'الطبق الخاص بالمطعم',
      descriptionFr: 'Description appétissante du plat avec garnitures et mode de préparation.',
      descriptionAr: 'وصف شهي ومفصل للطبق مع المكونات وطريقة التقديم.',
      price: 1800, // Prix en DZD
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      isSpecialty: true,
      isChefPick: true,
      preparationTime: '20 min',
      ingredientsFr: ['Ingrédient 1', 'Ingrédient 2', 'Épices fraîches'],
      ingredientsAr: ['المكون الأول', 'المكون الثاني', 'توابل طازجة'],
    },
    {
      id: 'plat-exemple-2',
      category: 'entrees',
      nameFr: 'Entrée Fraîcheur',
      nameAr: 'مقبلات طازجة',
      descriptionFr: 'Délicieuse entrée préparée le jour même avec huile d\'olive locale.',
      descriptionAr: 'مقبلات لذيذة محضرة يومياً بزيت الزيتون البكر.',
      price: 650, // Prix en DZD
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      isVegetarian: true,
      preparationTime: '10 min',
      ingredientsFr: ['Légumes de saison', 'Huile d\'olive', 'Herbes'],
      ingredientsAr: ['خضار موسمية', 'زيت زيتون', 'أعشاب عطرية'],
    },
  ],

  // 6. Galerie photos
  gallery: [
    {
      id: 'gal-1',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      titleFr: 'Salle de Réception',
      titleAr: 'قاعة الاستقبال الرئيسية',
      tagFr: 'Ambiance',
      tagAr: 'الأجواء',
    },
  ],

  // 7. Section À propos
  about: {
    badgeFr: 'Notre Philosophie',
    badgeAr: 'رؤيتنا وشغفنا',
    titleFr: 'L\'Amour de la Bonne Cuisine',
    titleAr: 'شغف الطهي والجودة',
    p1Fr: 'Histoire et valeurs fondatrices de l\'établissement au service de la gourmandise.',
    p1Ar: 'قصة المطعم والتزامنا اليومي بتقديم أجود وألذ المأكولات.',
    p2Fr: 'Nous sélectionnons avec rigueur chaque ingrédient auprès de producteurs de confiance.',
    p2Ar: 'نختار بكل دقة منتجاتنا من مزارع وموردين محليين موثوقين.',
    quoteFr: '« Bien recevoir et bien nourrir : telle est notre promesse au quotidien. »',
    quoteAr: '«الضيافة الكريمة والمذاق الأصيل هما عهدنا الدائم لكل زبون.»',
    quoteAuthorFr: 'La Direction du Restaurant',
    quoteAuthorAr: 'إدارة المطعم',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    stampBadgeFr: 'Cuisine authentique et service irréprochable.',
    stampBadgeAr: 'طبخ أصيل وخدمة راقية تليق بكم.',
  },
};
