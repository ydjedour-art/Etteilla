"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Décalage vertical subtil lié à la position de scroll — l'élément se
 * déplace un peu plus lentement (ou vite) que le reste de la page pendant
 * qu'il traverse le viewport. `speed` faible (0.05–0.15) pour rester discret :
 * Apple ne fait jamais de parallax spectaculaire, juste une petite
 * profondeur. Écouteur de scroll unique par instance, throttlé par rAF —
 * pas de dépendance ajoutée pour un effet aussi ciblé. */
export function Parallax({
  children,
  speed = 0.1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ticking = { current: false };

    function update() {
      const el = ref.current;
      ticking.current = false;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      setOffset((elementCenter - viewportCenter) * speed);
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}>
      {children}
    </div>
  );
}
