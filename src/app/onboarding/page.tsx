"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { ProgressSteps } from "@/components/ProgressSteps";

type Status = "Salarié" | "Indépendant" | "Étudiant" | "Sans emploi";
type Situation = "France" | "Étranger récent";

const STATUS_OPTIONS: Status[] = ["Salarié", "Indépendant", "Étudiant", "Sans emploi"];
const SITUATION_OPTIONS: { value: Situation; label: string }[] = [
  { value: "France", label: "Je vis en France depuis longtemps" },
  { value: "Étranger récent", label: "Je viens d'arriver en France" },
];

// Détection simplifiée pour le prototype — en production cette logique vit côté
// back-end et s'appuie sur le catalogue complet (docs/03-fonctionnalites-mvp.md).
function detectFormalities(status: Status | null, situation: Situation | null) {
  const suggestions = new Set<string>();
  suggestions.add("Déclaration de revenus");
  suggestions.add("Mise à jour de dossier CAF");
  if (status === "Indépendant") suggestions.add("Déclaration de chiffre d'affaires (URSSAF)");
  if (situation === "Étranger récent") {
    suggestions.add("Renouvellement titre de séjour");
    suggestions.add("Mise à jour Carte Vitale / CPAM");
  }
  return Array.from(suggestions);
}

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status | null>(null);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const detected = useMemo(
    () => detectFormalities(status, situation),
    [status, situation]
  );

  function goNext() {
    if (step === 2) setSelected(detectFormalities(status, situation));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function toggle(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col justify-center px-6 py-12">
      <div className="mb-8">
        <ProgressSteps total={TOTAL_STEPS} current={step} />
      </div>

      {step === 1 && (
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Quelle est votre situation ?
          </h1>
          <p className="mt-2 text-ink-soft">
            Pas de bonne ou mauvaise réponse, ça nous aide juste à savoir quoi préparer.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={`rounded-2xl border p-4 text-left font-medium transition-colors ${
                  status === option
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-ink/10 bg-card text-ink hover:border-primary/40"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <Button onClick={goNext} type="button">
              Continuer
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-2xl font-semibold text-ink">Et côté résidence ?</h1>
          <p className="mt-2 text-ink-soft">
            Ça change les démarches à surveiller en priorité.
          </p>
          <div className="mt-6 grid gap-3">
            {SITUATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSituation(option.value)}
                className={`rounded-2xl border p-4 text-left font-medium transition-colors ${
                  situation === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-ink/10 bg-card text-ink hover:border-primary/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <Button onClick={goNext} type="button">
              Continuer
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            On a repéré {detected.length} démarche{detected.length > 1 ? "s" : ""} qui
            vous concerne{detected.length > 1 ? "nt" : ""}
          </h1>
          <p className="mt-2 text-ink-soft">
            Décochez ce qui ne vous concerne pas, on garde le reste sous contrôle.
          </p>
          <div className="mt-6 space-y-3">
            {detected.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-card p-4"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => toggle(item)}
                  className="h-5 w-5 rounded border-ink/20 text-primary focus:ring-primary"
                />
                <span className="font-medium text-ink">{item}</span>
              </label>
            ))}
          </div>
          <div className="mt-8">
            <Button onClick={goNext} type="button">
              Continuer
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Dernière étape, promis
          </h1>
          <p className="mt-2 text-ink-soft">
            Une adresse email pour retrouver votre espace et recevoir uniquement
            l&apos;essentiel.
          </p>
          <div className="mt-6">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none focus:border-primary"
            />
          </div>
          <div className="mt-8">
            <Button type="button" onClick={() => router.push("/app")}>
              Terminer et voir mon espace
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
