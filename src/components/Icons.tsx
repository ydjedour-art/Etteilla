type IconProps = { className?: string };

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className} aria-hidden>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function CompassIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function GraduationCapIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" strokeLinejoin="round" />
      <path d="M6 11.5V17c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5.5" />
      <path d="M21 9.5v5" />
    </svg>
  );
}

export function RocketIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M13.5 3c2.5 1 4.5 3 5.5 5.5-2 .5-4 1.5-5.5 3-1.5 1.5-2.5 3.5-3 5.5C8 15.5 6 13.5 5 11c2-1 4-2 5.5-3.5C12 6 13 4.5 13.5 3Z" strokeLinejoin="round" />
      <path d="M9 15c-1.5 0-3.5.5-4.5 3.5C7.5 19 8 17 9 15Z" strokeLinejoin="round" />
      <circle cx="14.5" cy="8.5" r="1.25" />
    </svg>
  );
}

export function TrendingUpIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 6h6v6" />
    </svg>
  );
}

export function RouteIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="6" r="2" />
      <path d="M7 18h6a4 4 0 0 0 4-4V9a4 4 0 0 1 2-3.5" />
    </svg>
  );
}

export function SparklesIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" className={className} aria-hidden>
      <path d="M11 3.5c.2 2.3 2 4.1 4.3 4.3-2.3.2-4.1 2-4.3 4.3-.2-2.3-2-4.1-4.3-4.3 2.3-.2 4.1-2 4.3-4.3Z" />
      <path d="M18 13c.13 1.4 1.2 2.47 2.6 2.6-1.4.13-2.47 1.2-2.6 2.6-.13-1.4-1.2-2.47-2.6-2.6 1.4-.13 2.47-1.2 2.6-2.6Z" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function MapPinIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M6 3.5c1 0 2.3 2 2.5 3.3.1.7-.3 1.2-.9 1.8-.5.5-.7.9-.4 1.5.9 1.9 2.6 3.6 4.5 4.5.6.3 1 .1 1.5-.4.6-.6 1.1-1 1.8-.9 1.3.2 3.3 1.5 3.3 2.5 0 1.7-2 3.2-3.6 3.2-4.4 0-11.7-7.3-11.7-11.7C2.8 5.5 4.3 3.5 6 3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function XIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function UsersIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.5c1.4.4 2.5 1.7 2.5 3.2 0 1.6-1.1 2.9-2.5 3.2" />
      <path d="M18.5 14.3c1.9.6 3.2 2.4 3.5 4.7" />
    </svg>
  );
}

export function TargetIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function TagIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M11.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v6.5c0 .4.16.78.44 1.06l8 8c.58.58 1.52.58 2.1 0l6.5-6.5c.58-.58.58-1.52 0-2.1l-8-8a1.5 1.5 0 0 0-1.06-.46Z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.25" />
    </svg>
  );
}
