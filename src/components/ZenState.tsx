/** État "rien à faire" — doit être agréable à voir, jamais vide et inquiétant.
 * Voir docs/05-design-system.md. */
export function ZenState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-primary-light px-6 py-12 text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-primary"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="max-w-sm text-ink-soft">{description}</p>
    </div>
  );
}
