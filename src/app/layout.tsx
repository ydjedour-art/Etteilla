import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IZY/D — On s'occupe de ton administratif. Toi, tu vis.",
  description:
    "CAF, impôts, URSSAF, titre de séjour : IZY/D prend en charge tes démarches administratives à ta place. 3 formules, ou à la carte.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Source+Sans+3:wght@400;600&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
