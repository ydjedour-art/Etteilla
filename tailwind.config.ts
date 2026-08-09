import type { Config } from "tailwindcss";

// Palette et échelle typographique alignées sur docs/05-design-system.md
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "confiance officielle" : bleu marine institutionnel (marque/CTA),
        // bleu plus clair en accent, or discret pour l'attention, vert pour le
        // succès — inspirée des codes visuels des services officiels et des
        // marques de confiance (assurance, immigration). Voir docs/05-design-system.md.
        primary: {
          DEFAULT: "#0F2C59",
          light: "#E8EDF6",
          dark: "#081A38",
        },
        surface: "#F7F7F5",
        ink: {
          DEFAULT: "#14181F",
          soft: "#5B6270",
        },
        accent: "#1D5FD6",
        attention: "#9C6B00",
        success: "#0F7A4C",
        critical: "#B91C1C",
        gold: "#B8860B",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        // Empilement serif natif (pas de dépendance réseau à une webfont) pour les
        // titres — registre plus "éditorial / officiel" que le sans-serif seul.
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
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
