import type { Metadata } from "next";
import { BlockPageContent } from "@/components/BlockPageContent";
import { getBlockBySlug } from "@/lib/offers";

const block = getBlockBySlug("se-connaitre")!;

export const metadata: Metadata = {
  title: block.title,
  description:
    "Bilan de compétences, orientation professionnelle et soft skills de base : faites le point avant de choisir votre direction, 100 % à distance avec YD Formation.",
};

export default function SeConnaitrePage() {
  return <BlockPageContent block={block} />;
}
