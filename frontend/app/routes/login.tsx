import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch {
      // handled in hook
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md rounded-[32px] bg-slate-50 p-8 shadow-2xl ring-1 ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-700/60">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Sign in to access your ServeOS workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="owner@serveos.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/50 dark:bg-rose-950/40 dark:text-rose-200">{error}</p> : null}

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don’t have a workspace?{' '}
            <Link to="/register" className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
