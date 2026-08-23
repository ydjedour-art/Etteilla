"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Révèle son contenu (fondu + léger déplacement vers le haut) au moment où
 * il entre dans le viewport — l'effet "reveal" progressif d'Apple.com.
 * IntersectionObserver plutôt qu'une lib : léger, et on ne révèle qu'une
 * fois (jamais de clignotement en scrollant vers le haut). Respecte
 * prefers-reduced-motion (contenu affiché directement, sans transition). */
export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
              transition: `opacity 0.9s var(--ease-reveal) ${delay}ms, transform 0.9s var(--ease-reveal) ${delay}ms`,
              willChange: "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
}
