"use client";

import type { ReactNode } from "react";
import { AppNav } from "@/components/AppNav";
import { AppStoreProvider } from "@/lib/store";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <AppStoreProvider>
      <div className="flex min-h-screen flex-col sm:flex-row">
        <AppNav />
        <main className="flex-1 pb-24 sm:pb-0">
          <div className="mx-auto max-w-content px-6 py-10">{children}</div>
        </main>
      </div>
    </AppStoreProvider>
  );
}
