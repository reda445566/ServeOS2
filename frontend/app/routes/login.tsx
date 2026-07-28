import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthBrandPanel } from "../components/AuthBrandPanel";
import { AuthModeTabs } from "../components/AuthModeTabs";
import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

const REMEMBER_EMAIL_KEY = "serveos-remember-email";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({ email, password });
      if (rememberMe) {
        window.localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
      navigate("/dashboard");
    } catch {
      // handled in hook
    }
  };

  return (
    <AuthLayout>
      <div className="serveos-shell">
        <AuthBrandPanel />

        <div className="serveos-formside">
          <ThemeToggle />

          <div className="serveos-card">
            <AuthModeTabs mode="sign-in" />

            <div className="serveos-form-title">Welcome back</div>
            <div className="serveos-form-sub">Sign in to manage today&apos;s orders and floor.</div>

            <form onSubmit={handleSubmit}>
              <div className="serveos-field">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@restaurant.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="serveos-field">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="serveos-row-between">
                <label className="serveos-check">
                  <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="serveos-link">
                  Forgot password?
                </Link>
              </div>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/50 dark:bg-rose-950/40 dark:text-rose-200">
                  {error}
                </p>
              ) : null}

              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="serveos-switch-line">
                New to ServeOS?{" "}
                <Link to="/register" className="serveos-link">
                  Create your restaurant account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
