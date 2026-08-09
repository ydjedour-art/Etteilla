import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdminZen — On s'occupe de ton administratif. Toi, tu vis.",
  description:
    "AdminZen est un filet de sécurité mental contre l'administratif français : CAF, impôts, URSSAF, titre de séjour... On s'en occupe pour vous.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
