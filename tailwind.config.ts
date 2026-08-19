import type { Config } from "tailwindcss";

// Charte graphique IZY/D — empruntée à YD Formation (bleu Klein + jaune
// citron + rose flash, Plus Jakarta Sans / Source Sans 3), déclinée pour un
// ton d'impact plus fort et moins institutionnel que la V1 "confiance
// officielle". Voir docs/05-design-system.md.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bleu Klein — couleur de marque n°1 : sections héros/CTA pleines,
        // liens, boutons secondaires.
        primary: {
          DEFAULT: "#002FA7",
          light: "#E8ECFB",
          dark: "#001E6C",
        },
        // Jaune citron — couleur de marque n°2, réservée à l'action : bouton
        // principal, mise en évidence d'un mot clé (.underline-accent).
        // Toujours du texte foncé dessus, jamais blanc.
        accent: {
          DEFAULT: "#FFE500",
          foreground: "#001E6C",
        },
        // Rose flash — troisième ton, réservé aux points "wow" : halos des
        // sections bleues, badges d'incitation.
        flash: "#FF3EA5",
        surface: "#F7F8FC",
        ink: {
          DEFAULT: "#0B1633",
          soft: "#5B6480",
        },
        attention: "#B45309",
        success: "#2E7D4F",
        critical: "#DC2626",
      },
      fontFamily: {
        // Corps de texte.
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"],
        // Titres — sans-serif géométrique très typé, gras, tracking serré
        // (voir globals.css h1-h4). Remplace l'ancien empilement serif
        // "confiance officielle" : IZY/D est un produit grand public, pas un
        // service institutionnel.
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      maxWidth: {
        content: "680px",
        marketing: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
