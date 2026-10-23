export type Language = 'fr' | 'ar';

export type MenuCategory = string;

export interface RestaurantTheme {
  primaryColor: string; // e.g. '#92400e' or '#0369a1'
  primaryHover: string; // e.g. '#78350f' or '#075985'
  primaryLight: string; // e.g. '#fef3c7' or '#e0f2fe'
  secondaryColor: string;
  accentColor: string;
  bodyBg: string; // e.g. '#FAF8F5' or '#F8FAFC'
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  stylePreset: 'andalusian-warm' | 'mediterranean-azure' | 'sahara-gold' | 'emerald-contemporary';
}

export interface RestaurantCategory {
  id: string;
  nameFr: string;
  nameAr: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  category: string;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  price: number; // in Algerian Dinars (DZD)
  image: string;
  isSpecialty?: boolean;
  isChefPick?: boolean;
  isVegetarian?: boolean;
  preparationTime?: string;
  ingredientsFr?: string[];
  ingredientsAr?: string[];
}

export interface RestaurantConfig {
  nameFr: string;
  nameAr: string;
  taglineFr: string;
  taglineAr: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  addressFr: string;
  addressAr: string;
  cityFr: string;
  cityAr: string;
  isAddressFictionalNotice: boolean;
  hoursFr: { days: string; hours: string; note?: string }[];
  hoursAr: { days: string; hours: string; note?: string }[];
}

export interface HeroConfig {
  badgeFr: string;
  badgeAr: string;
  titleFr: string;
  titleAr: string;
  subtitleFr: string;
  subtitleAr: string;
  image: string;
  imageAltFr?: string;
  imageAltAr?: string;
  overlayBadgeFr?: string;
  overlayBadgeAr?: string;
  overlayTitleFr?: string;
  overlayTitleAr?: string;
  highlights: {
    icon: string;
    titleFr: string;
    titleAr: string;
    descFr: string;
    descAr: string;
  }[];
}

export interface AboutConfig {
  badgeFr: string;
  badgeAr: string;
  titleFr: string;
  titleAr: string;
  p1Fr: string;
  p1Ar: string;
  p2Fr: string;
  p2Ar: string;
  quoteFr: string;
  quoteAr: string;
  quoteAuthorFr: string;
  quoteAuthorAr: string;
  image: string;
  stampBadgeFr: string;
  stampBadgeAr: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  titleFr: string;
  titleAr: string;
  tagFr: string;
  tagAr: string;
}

export interface RestaurantProfile {
  id: string;
  slug: string;
  config: RestaurantConfig;
  theme: RestaurantTheme;
  categories: RestaurantCategory[];
  menuItems: MenuItem[];
  gallery: GalleryItem[];
  hero: HeroConfig;
  about: AboutConfig;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  note?: string;
}

export interface ReservationData {
  fullName: string;
  phone: string;
  guestsCount: number;
  date: string;
  time: string;
  seatingArea: 'indoor' | 'patio' | 'moorish_lounge';
  specialRequests?: string;
}
