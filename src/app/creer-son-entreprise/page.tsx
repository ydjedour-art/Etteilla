import type { Metadata } from "next";
import { BlockPageContent } from "@/components/BlockPageContent";
import { getBlockBySlug } from "@/lib/offers";

const block = getBlockBySlug("creer-son-entreprise")!;

export const metadata: Metadata = {
  title: block.title,
  description:
    "Formation création d'entreprise (RS6996), fondamentaux du business model et outils digitaux de démarrage : structurez votre projet 100 % à distance avec YD Formation.",
};

export default function CreerSonEntreprisePage() {
  return <BlockPageContent block={block} />;
}
