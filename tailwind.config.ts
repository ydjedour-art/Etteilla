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
        // Rose bonbon (marque/CTA), bleu Klein (accent), jaune citron (attention),
        // sur une base grise neutre — palette "dynamique" (docs/05-design-system.md).
        primary: {
          DEFAULT: "#DB2777",
          light: "#FCE7F3",
          dark: "#9D174D",
        },
        surface: "#F5F5F8",
        ink: {
          DEFAULT: "#201F26",
          soft: "#6B6975",
        },
        accent: "#002FA7",
        attention: "#B58900",
        critical: "#D93025",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
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
