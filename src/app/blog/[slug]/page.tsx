import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/Icons";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <section className="hero-glow border-b border-ink/10">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <Link href="/blog" className="text-sm font-medium text-ink-soft hover:text-ink">
            ← Tous les articles
          </Link>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
            {post.category}
          </span>
          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-ink-soft">
            {formatDate(post.date)} · {post.readingTime} de lecture
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-content px-6 py-14">
        <div className="space-y-5 text-ink-soft">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary-light p-6">
          <h2 className="font-serif text-lg font-semibold text-primary">
            Envie d&apos;aller plus loin ?
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Parlons de votre situation pour identifier le parcours le plus adapté.
          </p>
          <div className="mt-4">
            <Button href="/contact">Nous contacter</Button>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-ink/10 bg-white py-16">
          <div className="mx-auto max-w-marketing px-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">À lire aussi</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/10 p-6 hover:border-primary/30"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
                      {other.category}
                    </span>
                    <span className="mt-1 block font-semibold text-ink">{other.title}</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
