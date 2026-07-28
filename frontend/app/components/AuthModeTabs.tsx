import { Link } from "react-router";

type AuthMode = "sign-in" | "register";

interface AuthModeTabsProps {
  mode: AuthMode;
}

export function AuthModeTabs({ mode }: AuthModeTabsProps) {
  return (
    <div className="serveos-auth-tabs" role="tablist" aria-label="Authentication mode">
      <Link to="/" role="tab" aria-selected={mode === "sign-in"} className={mode === "sign-in" ? "active" : undefined}>
        Sign in
      </Link>
      <Link
        to="/register"
        role="tab"
        aria-selected={mode === "register"}
        className={mode === "register" ? "active" : undefined}
      >
        Create account
      </Link>
    </div>
  );
}
