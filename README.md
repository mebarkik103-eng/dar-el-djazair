# Dar El Djazaïr — Restaurant Gastronomique Algérien

Site web complet, moderne et bilingue (Français & Arabe) pour le restaurant **Dar El Djazaïr** à Alger Centre.

---

## 🌟 Fonctionnalités incluses

- **Vitrine & Ambiance** : Page d'accueil aux inspirations architecturales et culinaires algériennes (arches mauresques, zellige subtil, teintes chaudes).
- **Carte & Menu en Dinars Algériens (DZD / د.ج)** :
  - Catégories : *Chorbas & Entrées*, *Plats Traditionnels*, *Grillades & Poissons*, *Douceurs & Desserts*, *Thés & Boissons*.
  - Recherche instantanée par nom ou ingrédient.
  - Filtres diététiques rapides (*Spécialités*, *Coup de cœur du Chef*, *Végétarien*).
  - Modal détaillée pour chaque plat avec ingrédients et temps de préparation.
- **Photos des plats & Fallback automatique** :
  - Chaque plat dispose d'une photo réaliste et dédiée.
  - Composant `DishImage` avec protection anti-erreur (fallback esthétique immédiat si le réseau bloque une image externe).
- **Sélecteur de quantité & Panier d'achat** :
  - Boutons `+` et `-` directement sur les fiches des plats.
  - Panier interactif affichant le prix unitaire, la quantité, le sous-total de chaque ligne et le montant total calculé en DZD.
  - Barre récapitulative flottante au bas de l'écran.
  - Sauvegarde locale du panier (`localStorage`).
- **Commande directe sur WhatsApp** :
  - Génération automatique d'un message prérempli avec la liste exacte des plats, quantités, prix unitaires et total en DZD.
  - Sécurité anti-panier vide avec message explicatif.
- **Réservation de table** :
  - Formulaire complet (date, heure, nombre de convives, choix de la salle ou salon).
  - Envoi direct de la demande sur WhatsApp en un clic.
- **Gestionnaire de numéro WhatsApp** :
  - Numéro modifiable en direct depuis l'interface et sauvegardé localement.
- **Interface bilingue FR / AR** :
  - Bascule instantanée entre le Français et l'Arabe avec adaptation automatique de la direction du texte (RTL / LTR) et de la typographie (*Cairo* / *Playfair Display*).

---

## 🚀 Démarrage rapide en local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm, pnpm ou yarn

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement du serveur de développement
```bash
npm run dev
```
Le site sera accessible dans votre navigateur à l'adresse : `http://localhost:3000` (ou l'URL indiquée dans le terminal).

### 3. Compilation pour la production (Hébergement)
Pour créer le dossier optimisé prêt pour la mise en ligne (Vercel, Netlify, Cloudflare Pages, etc.) :
```bash
npm run build
```
Les fichiers générés se trouveront dans le dossier `dist/`.

---

## 📁 Structure du Projet

```text
├── index.html                   # Point d'entrée HTML, balises SEO & polices Google
├── package.json                 # Dépendances et scripts de build
├── vite.config.ts               # Configuration Vite & Tailwind CSS
├── tsconfig.json                # Configuration TypeScript
├── src/
│   ├── main.tsx                 # Point de montage React
│   ├── App.tsx                  # Composant racine, états globaux (panier, langue, config)
│   ├── index.css                # Styles globaux & configuration typographique FR/AR
│   ├── types/
│   │   └── restaurant.ts        # Définitions TypeScript (plats, panier, config)
│   ├── data/
│   │   └── restaurantData.ts    # Données des plats, prix en DZD, horaires, galerie
│   ├── utils/
│   │   └── translations.ts      # Dictionnaire bilingue Français & Arabe
│   ├── components/
│   │   ├── Header.tsx           # En-tête de navigation responsive & sélecteur de langue
│   │   ├── Hero.tsx             # Section d'accueil principale avec visuel
│   │   ├── MenuSection.tsx      # Carte des menus avec sélecteur de quantité +/-
│   │   ├── DishImage.tsx        # Composant image sécurisé avec fallback automatique
│   │   ├── OrderDrawer.tsx      # Tiroir latéral du panier & commande WhatsApp
│   │   ├── BottomCartBar.tsx    # Barre flottante de résumé du panier
│   │   ├── GallerySection.tsx   # Galerie photos avec visionneuse (Lightbox)
│   │   ├── HoursAndLocation.tsx # Horaires d'ouverture, coordonnées et adresse
│   │   ├── AboutSection.tsx     # Présentation du patrimoine culinaire
│   │   ├── ReservationModal.tsx # Formulaire de réservation de table
│   │   ├── WhatsAppConfigModal.tsx # Modal de personnalisation du numéro WhatsApp
│   │   ├── FloatingWhatsAppButton.tsx # Bouton d'accès rapide WhatsApp
│   │   └── Footer.tsx           # Pied de page avec liens utiles & mentions
│   └── assets/
│       └── images/              # Photographies haute définition générées
```

---

## ⚙️ Personnalisation

- **Modifier les plats ou les prix** : Éditez simplement le fichier `src/data/restaurantData.ts`. Les prix sont exprimés en entiers de dinars algériens (ex: `2400` pour 2 400 DZD).
- **Modifier les textes ou traductions** : Modifiez `src/utils/translations.ts`.
- **Changer le numéro WhatsApp par défaut** : Modifiez le champ `whatsappNumber` dans l'objet `DEFAULT_CONFIG` du fichier `src/data/restaurantData.ts` ou utilisez le bouton *Paramètres WhatsApp* directement sur le site.
