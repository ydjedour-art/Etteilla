import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ydformation.lovable.app"),
  title: {
    default: "YD Formation — De la connaissance de soi à la gestion d'entreprise",
    template: "%s | YD Formation",
  },
  description:
    "Organisme de formation et d'accompagnement 100 % à distance : bilan de compétences, orientation, création d'entreprise, gestion et développement, parcours sur-mesure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col bg-surface font-sans text-ink antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
