import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Fil d'Ariane utilisé sur les pages /demarches/**. Le dernier élément
 * (page courante) n'est jamais un lien. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-soft">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-ink" : undefined} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
