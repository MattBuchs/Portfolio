# 🌟 Portfolio Matt Buchs

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> Portfolio moderne et performant d'un développeur web Full Stack, développé avec Next.js 16 et les dernières technologies web.

## 🚀 Démo

Visitez le site en production : [matt-buchs.me](https://matt-buchs.me)

## ✨ Fonctionnalités

-   🎨 **Design moderne et responsive** - Interface élégante qui s'adapte à tous les écrans
-   ⚡ **Performance optimale** - Next.js App Router avec génération statique
-   🎭 **Animations fluides** - Transitions et animations avec Framer Motion
-   📱 **Navigation intuitive** - Menu responsive avec animations personnalisées
-   🎯 **SEO optimisé** - Métadonnées dynamiques et structured data pour un meilleur référencement
-   📧 **Formulaire de contact** - Envoi d'emails via EmailJS avec validation
-   🎨 **Mode sombre** - Interface adaptée avec Tailwind CSS v4
-   🖼️ **Galerie de projets** - Présentation détaillée des réalisations
-   🔄 **Transitions de page** - Navigation fluide entre les sections

## 🛠️ Technologies utilisées

### Frontend

-   **Next.js 16.1.1** - Framework React avec App Router
-   **React 19.2.3** - Bibliothèque UI
-   **Tailwind CSS 4** - Framework CSS utility-first
-   **Framer Motion** - Animations et transitions
-   **Lucide React** - Icônes modernes

### Outils & Services

-   **EmailJS** - Service d'envoi d'emails
-   **Email Validator** - Validation des adresses email
-   **Next.js Image** - Optimisation automatique des images
-   **Next Font** - Optimisation des polices (Great Vibes, Geist)

### SEO & Performance

-   Génération statique avec `generateStaticParams`
-   Métadonnées dynamiques avec `generateMetadata`
-   Schema.org structured data (JSON-LD)
-   Open Graph et Twitter Cards
-   Sitemap automatique

## 📂 Structure du projet

```
matt-buchs.me/
├── src/
│   ├── app/                   # App Router Next.js
│   │   ├── (public)/          # Routes publiques groupées
│   │   │   ├── contact/       # Page de contact
│   │   │   ├── projects/      # Liste et détails des projets
│   │   │   └── ...            # Autres pages légales
│   │   ├── globals.css        # Styles globaux + Tailwind v4
│   │   ├── layout.js          # Layout principal avec métadonnées
│   │   └── page.js            # Page d'accueil
│   ├── components/            # Composants réutilisables
│   │   ├── Header/            # Navigation et header
│   │   ├── Home/              # Composants de la page d'accueil
│   │   ├── projects/          # Composants projets
│   │   ├── utils/             # Composants utilitaires
│   │   └── Footer.jsx         # Footer du site
│   ├── hook/                  # Hooks personnalisés
│   │   └── useScreenSize.jsx  # Hook pour gérer la taille d'écran
│   └── lib/                   # Bibliothèques et données
│       └── projects.js        # Données des projets
├── public/                    # Assets statiques
│   └── img/                   # Images du site
│   └── files/                 # Fichiers du site
├── next.config.mjs            # Configuration Next.js
└── package.json               # Dépendances du projet
```

## 🎨 Caractéristiques techniques

### Tailwind CSS v4

-   Utilisation des variables CSS natives
-   Classes personnalisées (drop-shadow, animations, fonts)

### Composants clés

-   **Server Components** par défaut pour de meilleures performances
-   **Client Components** pour l'interactivité (animations, hooks)
-   **Métadonnées dynamiques** pour chaque page
-   **Images optimisées** avec next/image

### Animations

-   Framer Motion pour les transitions de page
-   Animations personnalisées
-   Hover effects sur les éléments interactifs

## 🌐 Déploiement

Le site est hébergé sur Vercel

## 📝 License

Ce projet est sous licence privée. Tous droits réservés © 2026 Matt Buchs

## 👨‍💻 Auteur

**Matt Buchs**

-   Site web : [matt-buchs.me](https://matt-buchs.me)
-   GitHub : [@MattBuchs](https://github.com/MattBuchs)
-   LinkedIn : [Matt Buchs](https://www.linkedin.com/in/matt-buchs/)

## 🤝 Contribution

Ce projet est personnel, mais les suggestions et retours sont les bienvenus !

## 📧 Contact

Pour toute question ou demande de collaboration, n'hésitez pas à me contacter via :

-   Le [formulaire de contact](https://matt-buchs.me/contact) du site
-   Email : mattbuchs25@gmail.com

---

⭐ N'hésitez pas à star ce projet si vous l'avez trouvé intéressant !
