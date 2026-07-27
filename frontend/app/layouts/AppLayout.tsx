import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <header style={{ padding: "1rem 1.5rem", background: "#111827", color: "white" }}>
        <strong>ServeOS</strong>
      </header>
      <main style={{ padding: "1.5rem" }}>{children}</main>
    </div>
  );
}
