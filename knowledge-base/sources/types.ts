import type { Procedure } from "../schema/procedure.schema";

export interface RawPage {
  url: string;
  html: string;
  fetchedAt: string; // ISO
}

export interface SourceAdapter {
  /** Identifiant court utilisé en CLI (`npm run kb:extract -- <id>`). */
  id: string;
  label: string;
  baseUrl: string;

  /**
   * Liste les URLs de fiches à ingérer pour les démarches prioritaires de cette
   * source (voir knowledge-base/README.md, section "Priorisation"). Nécessite un
   * accès réseau — à calibrer/étendre une fois disponible. Peut aussi lister des
   * pages d'index à parcourir plutôt que des fiches individuelles, selon la source.
   */
  listCandidateUrls(): Promise<string[]>;

  /**
   * Extrait les champs directement lisibles depuis le HTML d'une fiche. Renvoie un
   * `Partial<Procedure>` volontairement incomplet : `mode_possible`, `tags`,
   * `pieges_frequents` et les nuances juridiques ne sont jamais fiables à extraire
   * automatiquement et restent à la charge de la revue humaine (voir README).
   *
   * Les sélecteurs CSS de chaque source sont écrits à partir de la structure connue
   * de ces sites au moment de la conception — ils sont marqués `// TODO calibrer`
   * partout où une vérification contre le HTML réel est nécessaire avant mise en
   * production, cet environnement n'ayant pas d'accès réseau vers ces domaines.
   */
  parse(page: RawPage): Partial<Procedure>;
}
