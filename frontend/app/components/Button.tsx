interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({ children, variant = "primary", type = "button", disabled }: ButtonProps) {
  const baseClasses =
    "inline-flex w-full justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses =
    variant === "primary"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";

  return (
    <button type={type} disabled={disabled} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
}
