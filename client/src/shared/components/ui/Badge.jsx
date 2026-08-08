const variants = {
  success: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  secondary: "bg-slate-800 text-slate-300 ring-slate-700",
  primary: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/30",
};

export default function Badge({ children, variant = "secondary", className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 font-medium ring-1 ring-inset",
        variants[variant] || variants.secondary,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}