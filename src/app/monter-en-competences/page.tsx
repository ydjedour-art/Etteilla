import type { Metadata } from "next";
import { BlockPageContent } from "@/components/BlockPageContent";
import { getBlockBySlug } from "@/lib/offers";

const block = getBlockBySlug("monter-en-competences")!;

export const metadata: Metadata = {
  title: block.title,
  description:
    "Soft skills avancées, compétences métier et intelligence artificielle : renforcez les compétences qui font la différence, 100 % à distance avec YD Formation.",
};

export default function MonterEnCompetencesPage() {
  return <BlockPageContent block={block} />;
}
