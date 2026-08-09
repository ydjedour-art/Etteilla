import { ameli } from "./ameli";
import { ants } from "./ants";
import { caf } from "./caf";
import { dataGouv } from "./data-gouv";
import { impots } from "./impots";
import { servicePublic } from "./service-public";
import type { SourceAdapter } from "./types";

export const sources: SourceAdapter[] = [servicePublic, ants, ameli, caf, impots, dataGouv];

export function findSource(id: string): SourceAdapter | undefined {
  return sources.find((s) => s.id === id);
}

export * from "./types";
