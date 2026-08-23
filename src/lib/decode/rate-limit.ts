// Rate-limiting en mémoire, par IP — /api/decode appelle une API payante,
// donc on borne le débit même sans infra dédiée (pas de Redis pour un
// prototype single-instance). Se réinitialise à chaque redéploiement, ce
// qui est acceptable ici : l'objectif est d'éviter un abus ponctuel, pas
// une garantie distribuée.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

const hits = new Map<string, number[]>();

/** true si la requête est autorisée (et l'enregistre), false si la limite
 * est dépassée pour cette clé sur la fenêtre glissante. */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Nettoyage occasionnel pour ne pas laisser grossir la Map indéfiniment.
  if (hits.size > 5000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  return true;
}
