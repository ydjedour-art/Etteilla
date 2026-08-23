import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

// Barlow Condensed (900, display/titres) + Inter (corps) — la paire de la
// maquette de référence. --font-mono reste un empilement système (voir
// globals.css) : la référence ne charge pas de police mono, elle compte sur
// la pile par défaut du navigateur pour les petits labels "// LABEL".
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IZY/D — On s'occupe de ton administratif.",
  description: "CAF, impôts, URSSAF, titre de séjour : IZY/D avance à ta place.",
};

// Sombre par défaut, mémorisé (localStorage), appliqué avant le premier
// paint pour ne jamais flasher dans le mauvais thème — voir
// src/components/ThemeToggle.tsx pour la bascule côté client (clair en
// option, dérivé de la seule section claire de la maquette de référence).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("izyd-theme");
    var theme = stored === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans text-ink antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
