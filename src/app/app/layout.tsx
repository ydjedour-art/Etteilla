"use client";

import type { ReactNode } from "react";
import { AppNav } from "@/components/AppNav";
import { AppStoreProvider } from "@/lib/store";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <AppStoreProvider>
      <div className="flex min-h-screen flex-col sm:flex-row">
        <AppNav />
        {/* pb-28 : dégagement sous la barre de navigation mobile fixe, pour que la
          dernière carte ne passe jamais dessous. */}
      <main className="flex-1 pb-28 sm:pb-0">
          <div className="mx-auto max-w-content px-6 py-10">{children}</div>
        </main>
      </div>
    </AppStoreProvider>
  );
}
