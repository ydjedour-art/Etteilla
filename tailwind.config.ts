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
        primary: {
          DEFAULT: "#2F6B5E",
          light: "#E8F2EE",
          dark: "#234F45",
        },
        surface: "#FBFAF7",
        ink: {
          DEFAULT: "#1F2A27",
          soft: "#5B6B66",
        },
        accent: "#3E7CB1",
        attention: "#C98A3B",
        critical: "#B3543F",
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
