import type { Config } from "tailwindcss";

// Charte IZY/D v5 — "Signal" : identité sombre/brutaliste inspirée d'une
// maquette de référence (rouge signal, cyan, jaune néon, Barlow Condensed,
// coins nets). Sombre par défaut, clair disponible en option (dérivé de la
// seule section claire de la référence). Toutes les couleurs pointent vers
// des variables CSS pilotées par [data-theme] sur <html> (voir
// src/app/globals.css) : aucune classe dark: nulle part dans l'app, le
// thème change en repeignant les variables.
//
// Les noms de tokens existants (ink, surface, primary, accent, attention,
// critical, flash...) sont conservés pour ne rien casser dans les ~90
// fichiers qui les utilisent déjà — seule leur valeur change. `cyan` et
// `yellow` sont nouveaux (la référence utilise trois accents, pas un seul).
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
        cyan: "var(--cyan)",
        yellow: "var(--yellow)",
        vivid: {
          foreground: "var(--on-vivid)",
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
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        // La référence est intégralement à coins nets (les seuls
        // rounded-full de sa maquette sont de petits points de statut,
        // laissés tels quels ailleurs dans le code). Aplatir ces tokens
        // suffit à passer toutes les cartes/boutons/sections en net sans
        // toucher ~90 fichiers un par un.
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        pill: "0px",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.4, 0, 0.2, 1)",
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
