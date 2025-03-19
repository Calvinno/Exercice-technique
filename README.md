Ceci est un projet [Next.js](https://nextjs.org) initialisé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Présentation du projet

Cette application est un outil de gestion des tâches développé avec Next.js et Tailwind CSS. Elle permet aux utilisateurs de gérer leurs tâches efficacement grâce aux fonctionnalités suivantes :

Affichage des tâches sous forme de tableau avec :
- Statut (Terminée / Non terminée)
- Titre
- Date de création
- Actions (Modifier / Supprimer)
- Ajout d’une nouvelle tâche via un champ de texte et un bouton "Ajouter"
- Modification d’une tâche en mode édition inline
- Suppression d’une tâche avec un bouton "Supprimer"

Filtrage des tâches :
- Afficher toutes les tâches
- Afficher uniquement les tâches terminées
- Afficher uniquement les tâches non terminées

## Démarrer le projet

Tout d'abord, lancez le serveur de développement :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ouvrez http://localhost:3000 dans votre navigateur pour voir le résultat.

Vous pouvez commencer à modifier la page en éditant app/page.tsx. La page se mettra automatiquement à jour lorsque vous modifiez le fichier.

Ce projet utilise next/font pour optimiser et charger automatiquement Geist, une nouvelle famille de polices développée par Vercel.


