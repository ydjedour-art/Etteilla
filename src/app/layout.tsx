import type { Metadata } from "next";
import "./globals.css";

// Typo système façon SF Pro (-apple-system) — voir globals.css
// (--font-sans / --font-mono) et tailwind.config.ts. Pas de next/font ici :
// un empilement système n'a rien à charger, et c'est la police réelle
// d'Apple.com (jamais une webfont).

export const metadata: Metadata = {
  title: "IZY/D — On s'occupe de ton administratif.",
  description: "CAF, impôts, URSSAF, titre de séjour : IZY/D avance à ta place.",
};

// Clair par défaut, mémorisé (localStorage), appliqué avant le premier
// paint pour ne jamais flasher dans le mauvais thème — voir
// src/components/ThemeToggle.tsx pour la bascule côté client (sombre en
// option).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("izyd-theme");
    var theme = stored === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
