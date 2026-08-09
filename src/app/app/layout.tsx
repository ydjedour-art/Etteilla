import type { ReactNode } from "react";
import { AppNav } from "@/components/AppNav";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <AppNav />
      <main className="flex-1 pb-24 sm:pb-0">
        <div className="mx-auto max-w-content px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
