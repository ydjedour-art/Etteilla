# YD Formation

Site vitrine de **YD Formation**, organisme de formation et d'accompagnement
basé à Marseille. Le site couvre un parcours complet, de la connaissance de
soi à la gestion d'entreprise, organisé en cinq grands blocs d'offres :

1. **Se connaître & trouver sa voie** — bilan de compétences, orientation,
   soft skills de base.
2. **Se former & monter en compétences** — soft skills avancées,
   compétences métier, intelligence artificielle.
3. **Créer son entreprise** — formation création d'entreprise (RS6996),
   fondamentaux, outils digitaux de démarrage.
4. **Gérer & développer son entreprise** — gestion quotidienne,
   développement commercial, transition numérique & IA, RGPD.
5. **Accompagnement & parcours sur-mesure** — parcours combinés, modules à
   la carte, coaching individuel.

## 🖥️ Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Contenu statique,
sans back-end : les données des offres et du blog vivent dans
`src/lib/offers.ts` et `src/lib/blog.ts`.

```bash
npm install
npm run dev
# http://localhost:3000
```

## 🗺️ Pages principales

- `/` — Page d'accueil (hero, 5 blocs, pourquoi nous, blog, contact)
- `/offres` — Vue d'ensemble scannable des 5 blocs
- `/se-connaitre`, `/monter-en-competences`, `/creer-son-entreprise`,
  `/gerer-son-entreprise`, `/parcours-sur-mesure` — pages de chaque bloc
- `/offres/bilan-de-competences`, `/offres/creation-entreprise`,
  `/offres/rgpd-dpo` — pages de détail des formations phares
- `/blog`, `/blog/[slug]` — articles
- `/contact` — coordonnées + formulaire (ouvre un email pré-rempli)
- `/mentions-legales`, `/politique-de-confidentialite`

## 🚩 Feature flag CPF

Toute mention du Compte Personnel de Formation (CPF) est masquée par défaut
et contrôlée par un seul flag, `FEATURES.cpf` dans
[`src/lib/features.ts`](src/lib/features.ts). Passez-le à `true` pour
réactiver les badges et mentions CPF sur le site.

### 📸 Ajouter de vraies photos

La page d'accueil réserve un emplacement photo (fond dégradé, classe
`.official-photo-placeholder` dans `src/app/globals.css`). Pour le
remplacer par une vraie photo :

1. Dépose ton fichier dans `public/photos/` (ex. `public/photos/hero.jpg`).
2. Dans `src/app/page.tsx`, remplace le `<div className="official-photo-placeholder" ... />`
   par :
   ```tsx
   <img src="/photos/hero.jpg" alt="…" className="h-full w-full rounded-2xl object-cover shadow-xl" />
   ```
3. Redéploie.

## 📁 Dossiers hérités

`docs/`, `prisma/` et `knowledge-base/` documentaient un précédent projet
exploré dans ce dépôt (« Sérénio », assistant administratif). Ils ne sont
pas utilisés par le site YD Formation et sont conservés à titre
d'historique ; ils peuvent être supprimés sans impact sur le site.
