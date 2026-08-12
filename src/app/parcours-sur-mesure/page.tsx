import type { Metadata } from "next";
import { BlockPageContent } from "@/components/BlockPageContent";
import { getBlockBySlug } from "@/lib/offers";

const block = getBlockBySlug("parcours-sur-mesure")!;

export const metadata: Metadata = {
  title: block.title,
  description:
    "Parcours combinés de l'idée à la gestion, modules à la carte et coaching individuel : un accompagnement sur-mesure avec YD Formation à Marseille.",
};

export default function ParcoursSurMesurePage() {
  return <BlockPageContent block={block} />;
}
