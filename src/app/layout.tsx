import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// UI, titres, corps → Space Grotesk. Chiffres/prix/labels/eyebrows → Space
// Mono (voir globals.css, .font-mono utilisé explicitement à ces endroits).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IZY/D — On s'occupe de ton administratif.",
  description: "CAF, impôts, URSSAF, titre de séjour : IZY/D avance à ta place.",
};

// Thème sombre par défaut, mémorisé (localStorage), appliqué avant le
// premier paint pour ne jamais flasher en clair — voir
// src/components/ThemeToggle.tsx pour la bascule côté client.
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
    <html lang="fr" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
