import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthBrandPanel } from "../components/AuthBrandPanel";
import { AuthModeTabs } from "../components/AuthModeTabs";
import { AuthLayout } from "../layouts/AuthLayout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error, setError } = useAuth();
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [phone, setPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!branchName.trim()) {
      setError("Branch name is required.");
      return;
    }

    try {
      await register({
        restaurantName: restaurantName.trim(),
        ownerEmail: ownerEmail.trim(),
        ownerPassword: password,
        branchName: branchName.trim(),
      });
      navigate("/dashboard");
    } catch {
      // Error is handled by useAuth.
    }
  };

  return (
    <AuthLayout>
      <div className="serveos-shell">
        <AuthBrandPanel />

        <div className="serveos-formside">
          <ThemeToggle />

          <div className="serveos-card">
            <AuthModeTabs mode="register" />

            <div className="serveos-form-title">Set up your restaurant</div>
            <div className="serveos-form-sub">Create the owner account for your ServeOS workspace.</div>

            <form onSubmit={handleSubmit}>
              <div className="serveos-field">
                <Input
                  label="Restaurant name"
                  name="restaurantName"
                  placeholder="e.g. Sakura Grill"
                  value={restaurantName}
                  onChange={(event) => setRestaurantName(event.target.value)}
                  required
                />
              </div>

              <div className="serveos-field">
                <Input
                  label="First branch name"
                  name="branchName"
                  placeholder="Main Branch"
                  value={branchName}
                  onChange={(event) => setBranchName(event.target.value)}
                  required
                />
              </div>

              <div className="serveos-row-split">
                <div className="serveos-field">
                  <Input
                    label="Owner name"
                    name="ownerName"
                    placeholder="Full name"
                    value={ownerName}
                    onChange={(event) => setOwnerName(event.target.value)}
                  />
                </div>
                <div className="serveos-field">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="+20 1xx xxx xxxx"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

              <div className="serveos-field">
                <Input
                  label="Email"
                  name="ownerEmail"
                  type="email"
                  placeholder="you@restaurant.com"
                  value={ownerEmail}
                  onChange={(event) => setOwnerEmail(event.target.value)}
                  required
                />
              </div>

              <div className="serveos-row-split">
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
                <div className="serveos-field">
                  <Input
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              </div>

              <label className="serveos-terms">
                <input type="checkbox" required />
                <span>I agree to the Terms of Service and Privacy Policy of ServeOS.</span>
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/50 dark:bg-rose-950/40 dark:text-rose-200">
                  {error}
                </p>
              ) : null}

              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Creating workspace..." : "Create restaurant account"}
              </Button>

              <div className="serveos-switch-line">
                Already have a workspace?{' '}
                <Link to="/" className="serveos-link">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
