import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
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

    try {
      await register({ restaurantName, ownerEmail, ownerPassword: password, branchName });
      navigate("/dashboard");
    } catch {
      // Error is handled by useAuth.
    }
  };

  return (
    <AuthLayout>
      <div className="serveos-shell">
        <div className="serveos-brand">
          <div className="serveos-logo-row">
            <svg className="serveos-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="#C8791F" />
              <path d="M12 11H24V24L21.5 22L19 24L16.5 22L14 24L12 22V11Z" fill="#101114" fillOpacity="0.92" />
              <path d="M15 15H21" stroke="#C8791F" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M15 18" stroke="#C8791F" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="27.5" cy="27.5" r="2.5" fill="#101114" fillOpacity="0.92" />
            </svg>
            <div className="serveos-wordmark">Serve<span>OS</span></div>
          </div>

          <div className="serveos-tagline-block">
            <span className="serveos-eyebrow">Restaurant Operating System</span>
            <div className="serveos-headline">One workspace to run every order, every branch, every shift.</div>
            <p className="serveos-subcopy">From the first ticket to the closing report — ServeOS keeps dine-in, takeaway and delivery moving in sync.</p>
          </div>

          <div className="serveos-rail">
            <div className="serveos-ticket">
              <div className="serveos-ticket-id"><b>#A104</b> <span className="serveos-ticket-type">Table 6</span></div>
              <span className="serveos-pill ready">READY</span>
            </div>
            <div className="serveos-ticket">
              <div className="serveos-ticket-id"><b>#A105</b> <span className="serveos-ticket-type">Delivery</span></div>
              <span className="serveos-pill preparing">PREPARING</span>
            </div>
            <div className="serveos-ticket">
              <div className="serveos-ticket-id"><b>#A106</b> <span className="serveos-ticket-type">Takeaway</span></div>
              <span className="serveos-pill pending">PENDING</span>
            </div>
          </div>

          <div className="serveos-brand-footer">
            <span className="dot"></span>
            <span>All branches synced in real time</span>
          </div>
        </div>

        <div className="serveos-formside">
          <ThemeToggle />

          <div className="serveos-card">
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
