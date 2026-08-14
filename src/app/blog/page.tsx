import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles pratiques sur l'orientation professionnelle, la création d'entreprise, la gestion et l'intelligence artificielle au travail, par YD Formation.",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export default function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title="Ressources & repères pratiques"
        subtitle="Des articles factuels pour avancer sur l'orientation, la création et la gestion d'entreprise — sans jargon inutile."
      />

      <section className="mx-auto max-w-marketing px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {post.category}
              </span>
              <h2 className="mt-3 font-serif text-lg font-semibold text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
              <p className="mt-4 text-xs text-ink-soft/70">
                {formatDate(post.date)} · {post.readingTime} de lecture
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
