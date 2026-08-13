import type { Metadata } from "next";
import { BlockPageContent } from "@/components/BlockPageContent";
import { getBlockBySlug } from "@/lib/offers";

const block = getBlockBySlug("gerer-son-entreprise")!;

export const metadata: Metadata = {
  title: block.title,
  description:
    "Gestion quotidienne, développement commercial, transition numérique et RGPD : pilotez et développez votre entreprise 100 % à distance avec YD Formation.",
};

export default function GererSonEntreprisePage() {
  return <BlockPageContent block={block} />;
}
