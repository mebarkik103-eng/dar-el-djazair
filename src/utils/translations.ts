import { Language } from '../types/restaurant';

export const translations = {
  fr: {
    // Header
    navMenu: 'La Carte',
    navGallery: 'Galerie',
    navHours: 'Horaires & Accès',
    navAbout: 'Notre Histoire',
    navContact: 'Contact',
    reserveTable: 'Réserver une table',
    myOrder: 'Ma Commande',
    editWhatsApp: 'Paramètres WhatsApp',
    
    // Hero
    heroBadge: 'Héritage Gastronomique Algérien',
    heroTitle: 'L\'Excellence des Saveurs Authentiques d\'Algérie',
    heroSubtitle: 'Une cuisine généreuse et raffinée au cœur d\'Alger, célébrant la richesse des terroirs algériens dans un décor mauresque somptueux.',
    heroCtaMenu: 'Découvrir le Menu',
    heroCtaReserve: 'Réserver une Table',
    heroCtaWhatsApp: 'Discuter sur WhatsApp',
    statFresh: '100% Produits Frais & Halal',
    statRecipes: 'Recettes Traditionnelles Ancestrales',
    statAmbiance: 'Cadre Mauresque d\'Exception',

    // Menu section
    menuTitle: 'Notre Carte & Spécialités',
    menuSubtitle: 'Tous nos plats sont préparés le jour même avec des produits frais du terroir algérien. Prix indiqués en Dinars Algériens (DZD).',
    allCategories: 'Tous les Plats',
    starters: 'Chorbas & Entrées',
    traditional: 'Plats Traditionnels',
    grills: 'Grillades & Poissons',
    desserts: 'Douceurs & Desserts',
    drinks: 'Thés & Boissons',
    searchPlaceholder: 'Rechercher un plat, un ingrédient...',
    filterSpecialty: 'Spécialités',
    filterChefPick: 'Coup de Cœur Chef',
    filterVeg: 'Végétarien',
    noItemsFound: 'Aucun plat ne correspond à votre recherche.',
    resetFilters: 'Réinitialiser les filtres',
    currency: 'DZD',
    addToOrder: 'Ajouter',
    orderOnWhatsApp: 'Commander via WhatsApp',
    viewDetails: 'Détails & Ingrédients',
    specialtyBadge: 'Spécialité Maison',
    chefBadge: 'Choix du Chef',
    vegBadge: 'Végétarien',
    prepTime: 'Temps estimé',
    ingredients: 'Ingrédients',

    // Gallery section
    galleryTitle: 'Immersion & Galerie Photos',
    gallerySubtitle: 'Découvrez l\'atmosphère feutrée de notre maison, nos tables dressées et la splendeur de nos créations culinaires.',
    galleryAll: 'Toutes les photos',
    galleryAmbiance: 'Ambiance & Décor',
    galleryDishes: 'Plats & Spécialités',
    galleryDesserts: 'Douceurs & Thés',

    // Hours & Location
    hoursTitle: 'Horaires d\'Ouverture & Localisation',
    hoursSubtitle: 'Nous vous accueillons tous les jours de la semaine dans une ambiance chaleureuse et familiale.',
    openingHours: 'Horaires de Service',
    addressCard: 'Adresse & Accès',
    fictionalNoticeBadge: 'Adresse de Démonstration',
    fictionalNoticeText: 'Note : Cette adresse et ces coordonnées sont fournies à titre de démonstration pour le site web du restaurant.',
    directions: 'Itinéraire & Plan',
    valetParking: 'Service voiturier disponible en soirée',
    familyWelcoming: 'Espaces dédiés pour les familles et salons privés',
    phoneLabel: 'Téléphone Réservations',
    whatsappLabel: 'WhatsApp Direct',
    emailLabel: 'Courriel',

    // About section
    aboutTitle: 'Une Maison Vouée au Goût d\'Antan',
    aboutP1: 'Né de la passion pour le riche patrimoine culinaire algérien, Dar El Djazaïr réinterprète les grands classiques familiaux avec rigueur, noblesse et générosité.',
    aboutP2: 'De la semoule de blé dur roulée à la main à la torréfaction des épices importées de Biskra et du Grand Sud, chaque recette honore la mémoire de nos mères et grands-mères.',
    aboutChefQuote: '« La cuisine algérienne est un poème d\'arômes, où le safran, la cannelle et la fleur d\'oranger se rencontrent pour unir les convives. »',

    // WhatsApp modal & config
    configWhatsAppTitle: 'Gestion du Contact WhatsApp',
    configWhatsAppDesc: 'Le numéro de contact WhatsApp est directement modifiable ici. Vous pouvez entrer le vrai numéro de votre restaurant pour recevoir les messages en direct.',
    currentNumber: 'Numéro WhatsApp Actuel',
    enterNumber: 'Nouveau numéro (avec indicatif pays, ex: +213...)',
    saveNumber: 'Enregistrer le Numéro',
    resetDefault: 'Rétablir le numéro exemple (+213 555 12 34 56)',
    testWhatsAppBtn: 'Tester l\'ouverture de WhatsApp',
    numberSavedAlert: 'Numéro WhatsApp mis à jour avec succès !',

    // Reservation modal
    resModalTitle: 'Réserver une Table à Dar El Djazaïr',
    resModalDesc: 'Confirmez votre venue en quelques secondes. Vous pouvez aussi envoyer votre demande de réservation directement sur WhatsApp.',
    formName: 'Nom complet',
    formPhone: 'Numéro de téléphone algérien',
    formGuests: 'Nombre de convives',
    formDate: 'Date souhaitée',
    formTime: 'Heure souhaitée',
    formArea: 'Espace préféré',
    areaIndoor: 'Salle Principale (Sous les arches)',
    areaPatio: 'Terrasse Intérieure Andalouse',
    areaLounge: 'Salon Mauresque Privé',
    formNotes: 'Demandes particulières (anniversaire, chaise haute, etc.)',
    submitRes: 'Confirmer la Réservation',
    sendResWhatsApp: 'Envoyer la Réservation par WhatsApp',
    resSuccessTitle: 'Demande de Réservation Reçue !',
    resSuccessDesc: 'Nous avons bien enregistré votre souhait de réservation. Notre équipe vous contactera sous peu pour confirmer votre table.',
    close: 'Fermer',

    // Order Drawer
    orderTitle: 'Votre Sélection / Commande',
    orderEmpty: 'Votre panier est actuellement vide. Choisissez des plats parmi notre carte.',
    emptyCartWarning: 'Votre panier est vide. Veuillez ajouter au moins un plat pour commander via WhatsApp.',
    totalAmount: 'Total de la commande',
    unitPrice: 'Prix unitaire',
    subtotal: 'Sous-total',
    inCart: 'au panier',
    viewCart: 'Voir mon panier',
    orderWhatsAppDirect: 'Commander sur WhatsApp',
    orderWhatsAppHint: 'Un message pré-rempli avec vos plats, quantités, prix unitaires et le montant total en DZD sera envoyé sur WhatsApp.',
    clearCart: 'Vider le panier',

    // Footer
    footerRights: 'Tous droits réservés. Restaurant gastronomique algérien.',
    footerLegal: 'Mentions Légales & Fictivité des Coordonnées',
    footerMadeFor: 'Conçu avec passion pour la gastronomie algérienne.',
    scrollTop: 'Haut de page',
  },

  ar: {
    // Header
    navMenu: 'قائمة الطعام',
    navGallery: 'معرض الصور',
    navHours: 'المواعيد والموقع',
    navAbout: 'قصتنا',
    navContact: 'تواصل معنا',
    reserveTable: 'حجز طاولة',
    myOrder: 'طلبيتي',
    editWhatsApp: 'إعدادات واتساب',
    
    // Hero
    heroBadge: 'أصالة الطبخ الجزائري العريق',
    heroTitle: 'فخامة النكهات الجزائرية الأصيلة',
    heroSubtitle: 'تجربة طعام سخية وراقية في قلب الجزائر العاصمة، نحتفي بروعة المطبخ الجزائري في ديكور أندلسي وموريسكي فريد.',
    heroCtaMenu: 'استكشف القائمة',
    heroCtaReserve: 'احجز طاولة الآن',
    heroCtaWhatsApp: 'تواصل عبر واتساب',
    statFresh: '100% مكونات طازجة وحلال',
    statRecipes: 'وصفات أجداد متوارثة بأصالة',
    statAmbiance: 'أجواء عائلية وأندلسية ساحرة',

    // Menu section
    menuTitle: 'قائمة الأطباق والمأكولات',
    menuSubtitle: 'جميع أطباقنا محضرة يومياً بأجود المكونات المحلية الطازجة. الأسعار موضحة بالدينار الجزائري (د.ج).',
    allCategories: 'جميع الأطباق',
    starters: 'شربات ومقبلات',
    traditional: 'أطباق تقليدية',
    grills: 'مشاوي وأسماك',
    desserts: 'حلويات تقليدية',
    drinks: 'شاي ومشروبات',
    searchPlaceholder: 'ابحث عن طبق أو مكوّن...',
    filterSpecialty: 'أطباق خاصة',
    filterChefPick: 'اختيار الشيف',
    filterVeg: 'نباتي',
    noItemsFound: 'لم يتم العثور على أي طبق مطابق لبحثك.',
    resetFilters: 'إعادة ضبط التصفية',
    currency: 'د.ج',
    addToOrder: 'إضافة',
    orderOnWhatsApp: 'اطلب عبر واتساب',
    viewDetails: 'التفاصيل والمكونات',
    specialtyBadge: 'تخصص البيت',
    chefBadge: 'موصى به من الشيف',
    vegBadge: 'طبق نباتي',
    prepTime: 'وقت التحضير',
    ingredients: 'المكونات',

    // Gallery section
    galleryTitle: 'معرض الصور والأجواء',
    gallerySubtitle: 'اكتشف روعة صالاتنا الأندلسية، طاولاتنا المجهزة وأطباقنا المحضرة بكل فخامة وإتقان.',
    galleryAll: 'كل الصور',
    galleryAmbiance: 'الديكور والأجواء',
    galleryDishes: 'الأطباق الرئيسية',
    galleryDesserts: 'الحلويات والشاي',

    // Hours & Location
    hoursTitle: 'أوقات العمل والموقع الجغرافي',
    hoursSubtitle: 'نسعد باستقبالكم طيلة أيام الأسبوع في أجواء عائلية مريحة وراقية.',
    openingHours: 'أوقات الاستقبال والخدمة',
    addressCard: 'العنوان وطريقة الوصول',
    fictionalNoticeBadge: 'عنوان نموذجي تجريبي',
    fictionalNoticeText: 'تنبيه: هذا العنوان والأرقام هي بيانات نموذجية تمثيلية لتوضيح عمل موقع المطعم وليست حقيقية.',
    directions: 'المسار والاتجاهات',
    valetParking: 'خدمة ركن السيارات متوفرة في المساء',
    familyWelcoming: 'صالات وقاعات خاصة مهيأة للعائلات',
    phoneLabel: 'هاتف الحجوزات',
    whatsappLabel: 'واتساب مباشر',
    emailLabel: 'البريد الإلكتروني',

    // About section
    aboutTitle: 'دار مكرسة لأصالة المذاق الجزائري',
    aboutP1: 'انطلاقاً من عشقنا للتراث الغذائي الجزائري العريق، تقدم دار الجزائر أرقى الأطباق التقليدية بروح معاصرة مع المحافظة التامة على النكهة الحقيقية.',
    aboutP2: 'من حبات السميد المفتولة باليد، إلى توابل بسكرة والصحراء الكبرى المنقاة بعناية، كل وجبة هي تكريم حي لأمهاتنا وجداتنا.',
    aboutChefQuote: '«الطبخ الجزائري قصيدة من العطور الزكية، حيث يلتقي الزعفران والقرفة وماء الزهر ليجمع العائلات على مائدة المودة.»',

    // WhatsApp modal & config
    configWhatsAppTitle: 'تعديل رقم واتساب للمطعم',
    configWhatsAppDesc: 'يمكنك تعديل وتحديث رقم واتساب المستخدم في الموقع في أي وقت. ضع رقم هاتفك أو رقم المطعم لتصلك الرسائل والطلبات مباشرة.',
    currentNumber: 'الرقم الحالي المعتمد',
    enterNumber: 'الرقم الجديد مع مفتاح الدولة (مثال: 213555123456+)',
    saveNumber: 'حفظ الرقم الجديد',
    resetDefault: 'استعادة الرقم النموذجي التجريبي (+213 555 12 34 56)',
    testWhatsAppBtn: 'تجربة فتح محادثة واتساب',
    numberSavedAlert: 'تم حفظ رقم واتساب الجديد بنجاح!',

    // Reservation modal
    resModalTitle: 'حجز طاولة في دار الجزائر',
    resModalDesc: 'أكّد حجزك في ثوانٍ معدودة، أو أرسل تفاصيل الحجز بضغطة زر واحدة مباشرة عبر تطبيق واتساب.',
    formName: 'الاسم الكامل',
    formPhone: 'رقم الهاتف الجزائري',
    formGuests: 'عدد الأشخاص',
    formDate: 'تاريخ الحجز المطلوب',
    formTime: 'التوقيت المفضل',
    formArea: 'المكان المفضل',
    areaIndoor: 'القاعة الرئيسية (تحت الأقواس)',
    areaPatio: 'الفناء الأندلسي الداخلي',
    areaLounge: 'الصالون الموريسكي الخاص',
    formNotes: 'ملاحظات إضافية (عيد ميلاد، كرسي أطفال، إلخ)',
    submitRes: 'تأكيد الحجز',
    sendResWhatsApp: 'إرسال الحجز عبر واتساب',
    resSuccessTitle: 'تم استلام طلب الحجز بنجاح!',
    resSuccessDesc: 'شكراً لثقتكم. تم تسجيل بيانات طلبكم وسيتصل بكم فريق الاستقبال لتأكيد الطاولة في أقرب وقت.',
    close: 'إغلاق',

    // Order Drawer
    orderTitle: 'سلة الطلبات المختارة',
    orderEmpty: 'السلة فارغة حالياً. تفضل باختيار أطباقك المفضلة من قائمتنا.',
    emptyCartWarning: 'السلة فارغة. يرجى إضافة طبق واحد على الأقل لتتمكن من الطلب عبر واتساب.',
    totalAmount: 'المجموع الإجمالي للطلبية',
    unitPrice: 'سعر الوحدة',
    subtotal: 'المجموع الجزئي',
    inCart: 'في السلة',
    viewCart: 'عرض السلة',
    orderWhatsAppDirect: 'طلب الآن عبر واتساب',
    orderWhatsAppHint: 'سيتم توليد رسالة واتساب منسقة ومفصلة بالأسماء والكميات والأسعار بالدينار الجزائري.',
    clearCart: 'تفريغ السلة',

    // Footer
    footerRights: 'جميع الحقوق محفوظة. مطعم دار الجزائر للمأكولات الراقية.',
    footerLegal: 'إشعار قانوني: معلومات الاتصال تجريبية لأغراض العرض',
    footerMadeFor: 'صُمم خصيصاً بكل فخر للاحتفاء بفن الطبخ الجزائري الأصيل.',
    scrollTop: 'الرجوع للأعلى',
  }
};

export function formatDZD(amount: number, lang: Language): string {
  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ' : 'fr-FR').format(amount);
  return lang === 'ar' ? `${formattedNumber} د.ج` : `${formattedNumber} DZD`;
}

export function cleanPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}
