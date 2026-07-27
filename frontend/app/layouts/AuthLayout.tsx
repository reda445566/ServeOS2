import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className="serveos-root" data-theme={theme}>
      {children}
    </div>
  );
}
