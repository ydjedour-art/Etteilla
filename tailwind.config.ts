import type { Config } from "tailwindcss";

// Charte IZY/D v3 — sombre par défaut (teal + lime), clair rose pétant à la
// bascule. Toutes les couleurs pointent vers des variables CSS pilotées par
// [data-theme] sur <html> (voir src/app/globals.css) : aucune classe dark:
// nulle part dans l'app, le thème change en repeignant les variables.
//
// Les noms de tokens existants (ink, surface, primary, accent, attention,
// critical, flash...) sont conservés pour ne rien casser dans les ~90
// fichiers qui les utilisent déjà — seule leur valeur change. `warning` et
// `danger` sont les nouveaux noms de la spec, ajoutés en alias des mêmes
// variables (`attention`/`critical` restent valides).
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface-2)",
        card: "var(--surface)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--on-accent)",
        },
        ink: {
          DEFAULT: "var(--text)",
          soft: "var(--muted)",
        },
        flash: "var(--accent)",
        success: "var(--success)",
        attention: "var(--warning)",
        warning: "var(--warning)",
        critical: "var(--danger)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
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
