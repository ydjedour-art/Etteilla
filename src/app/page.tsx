import { Button } from "@/components/Button";

const FORMALITES = [
  "CAF",
  "Impôts",
  "URSSAF",
  "Titre de séjour",
  "CPAM",
  "Mutuelle",
];

const STEPS = [
  {
    title: "Racontez votre situation",
    description:
      "En 2 minutes, sans jargon : votre statut, votre famille, ce qui vient de changer.",
  },
  {
    title: "On détecte ce qui vous concerne",
    description:
      "AdminZen repère les démarches pertinentes et prépare les dossiers à votre place.",
  },
  {
    title: "Vous validez, on s'occupe du reste",
    description:
      "Un tap pour valider. On suit, on relance, on vous prévient uniquement si besoin.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <header className="mx-auto flex max-w-marketing items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold text-primary">🌿 AdminZen</span>
        <Button href="/onboarding" variant="ghost">
          Se connecter
        </Button>
      </header>

      <section className="hero-glow mx-auto max-w-marketing px-6 py-16 text-center sm:py-24">
        <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          On s&apos;occupe de ton administratif.
          <br />
          <span className="text-primary">Toi, tu vis.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
          CAF, impôts, URSSAF, titre de séjour... AdminZen est le filet de sécurité
          mental qui prend en charge votre administratif, pour de vrai.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/onboarding">Je respire, on s&apos;occupe de tout</Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FORMALITES.map((f) => (
            <span
              key={f}
              className="rounded-full bg-primary-light px-3 py-1 text-sm text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 py-16">
        <h2 className="text-center text-2xl font-semibold text-ink">
          Comment ça marche
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-ink/10 bg-white p-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-marketing px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-semibold">
            Votre charge mentale administrative peut s&apos;arrêter aujourd&apos;hui.
          </h2>
          <div className="mt-6 flex justify-center">
            <Button href="/onboarding" className="!bg-white !text-primary hover:!bg-white/90">
              Commencer
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 px-6 py-8 text-center text-sm text-ink-soft">
        © {new Date().getFullYear()} AdminZen — Prototype de conception, données
        simulées.
      </footer>
    </main>
  );
}
