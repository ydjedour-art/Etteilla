import { Button } from "@/components/Button";
import { getCurrentUser } from "@/lib/data";

const PLANS = [
  {
    name: "Vigilance",
    price: "Gratuit",
    description: "Rappels, checklist, coffre-fort et assistant.",
  },
  {
    name: "Essentiel",
    price: "9,90€/mois",
    description: "AdminZen pré-remplit vos dossiers, prêts à envoyer en un clic.",
  },
  {
    name: "Sérénité",
    price: "19,90€/mois",
    description: "AdminZen soumet et suit vos démarches de bout en bout pour vous.",
  },
] as const;

export default async function ProfilPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Profil</h1>
        <p className="mt-1 text-ink-soft">{user.firstName} · {user.status}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-ink">Votre formule</h2>
        <div className="mt-3 space-y-3">
          {PLANS.map((plan) => {
            const active = plan.name === user.plan;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 ${
                  active
                    ? "border-primary bg-primary-light"
                    : "border-ink/10 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{plan.name}</p>
                  <p className="text-sm font-medium text-ink-soft">{plan.price}</p>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{plan.description}</p>
                {active && (
                  <span className="mt-3 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    Formule actuelle
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink">Vos données</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Conformément au RGPD, vous pouvez exporter ou supprimer vos données à tout
          moment (voir docs/08-securite-rgpd.md).
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button variant="secondary" type="button">
            Exporter mes données
          </Button>
          <Button variant="ghost" type="button" className="!text-critical">
            Supprimer mon compte
          </Button>
        </div>
      </section>
    </div>
  );
}
