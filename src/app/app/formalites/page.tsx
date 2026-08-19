import Link from "next/link";
import { getFormalityTemplates } from "@/lib/data";

const AUTOMATION_LABELS: Record<string, string> = {
  guide: "On vous guide",
  pre_rempli: "On pré-remplit",
  delegue: "On s'en occupe entièrement",
};

export default async function FormalitesPage() {
  const templates = await getFormalityTemplates();
  const categories = Array.from(new Set(templates.map((t) => t.category)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Catalogue de démarches</h1>
        <p className="mt-1 text-ink-soft">
          Toutes les démarches qu&apos;IZY/D peut prendre en charge pour vous.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {category}
          </h2>
          <div className="mt-3 space-y-3">
            {templates
              .filter((t) => t.category === category)
              .map((template) => (
                <Link
                  key={template.slug}
                  href={`/app/formalites/${template.slug}`}
                  className="block rounded-2xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-ink-soft">{template.organisme}</p>
                      <h3 className="mt-0.5 text-lg font-semibold text-ink">
                        {template.name}
                      </h3>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                      {AUTOMATION_LABELS[template.automationLevel]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{template.description}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
