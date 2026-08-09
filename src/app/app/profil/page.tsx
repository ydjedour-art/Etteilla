"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const ACTE_TIERS = [
  {
    name: "Identification + checklist",
    price: "Gratuit",
    description: "On identifie la démarche et on liste les pièces nécessaires.",
  },
  {
    name: "Guidé simple (pilotage)",
    price: "29–49 €",
    description: "On vous pilote pas à pas jusqu'au bout.",
  },
  {
    name: "Standard / hybride",
    price: "59–99 €",
    description: "Préparation complète, vous validez, on transmet.",
  },
  {
    name: "Complexe / sensible",
    price: "129–249 €",
    description: "Titre de séjour, litiges, dossiers multi-organismes...",
  },
];

export default function ProfilPage() {
  const router = useRouter();
  const { state, setSubscription, exportData, resetAccount } = useAppStore();
  const { user } = state;
  const subscribed = user.subscription === "serenite";

  function handleDelete() {
    const confirmed = window.confirm(
      "Supprimer votre compte et toutes vos données Sérénio ? Cette action est irréversible."
    );
    if (!confirmed) return;
    resetAccount();
    router.push("/");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Profil</h1>
        <p className="mt-1 text-ink-soft">
          {user.firstName} · {user.status}
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-ink">Abonnement Sérénité</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Chaque démarche reste payable à l&apos;acte (voir tarifs ci-dessous). L&apos;abonnement
          ajoute la surveillance continue de vos échéances et des tarifs préférentiels.
        </p>
        <div
          className={`mt-3 rounded-2xl border p-5 ${
            subscribed ? "border-primary bg-primary-light" : "border-ink/10 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-ink">Sérénité</p>
            <p className="text-sm font-medium text-ink-soft">à partir de 14,90 €/mois</p>
          </div>
          <ul className="mt-2 space-y-1 text-sm text-ink-soft">
            <li>• Surveillance des échéances et alertes anticipées</li>
            <li>• Priorité de traitement sur vos dossiers</li>
            <li>• Tarifs préférentiels sur les actes payants</li>
            <li>• 1 à 2 actes guidés inclus selon la formule</li>
          </ul>
          <button
            type="button"
            onClick={() => setSubscription(subscribed ? "aucun" : "serenite")}
            className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-medium transition-colors min-h-[44px] ${
              subscribed
                ? "bg-transparent text-critical hover:bg-critical/10"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            {subscribed ? "Résilier l'abonnement" : "S'abonner à Sérénité"}
          </button>
          {subscribed && (
            <span className="ml-3 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
              Actif
            </span>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Tarifs à l&apos;acte</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Le prix dépend de la complexité de la démarche, pas d&apos;un forfait fixe.
        </p>
        <div className="mt-3 space-y-3">
          {ACTE_TIERS.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-ink/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{tier.name}</p>
                <p className="text-sm font-semibold text-primary">{tier.price}</p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Vos données</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Conformément au RGPD, vous pouvez exporter ou supprimer vos données à tout
          moment (voir docs/08-securite-rgpd.md).
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportData}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-light px-5 py-3 text-base font-medium text-primary transition-colors hover:bg-primary-light/70 min-h-[44px]"
          >
            Exporter mes données
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-5 py-3 text-base font-medium text-critical transition-colors hover:bg-critical/10 min-h-[44px]"
          >
            Supprimer mon compte
          </button>
        </div>
      </section>
    </div>
  );
}
