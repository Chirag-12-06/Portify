const variantStyles = {
  primary:
    "rounded-full px-6 py-3 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/40",
  secondary:
    "rounded-full px-6 py-3 border border-white/15 text-white hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/5",
  ghost: "text-slate-400 hover:text-white",
};

const defaultIconClassName = {
  primary: "transition-transform duration-300 group-hover:translate-x-1",
  secondary: "transition-transform duration-300 group-hover:translate-x-1",
  ghost: "animate-bounce",
};

export default function Button({
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  iconClassName,
  href,
  className = "",
  children,
  ...props
}) {
  const Component = href ? "a" : "button";

  const iconEl = Icon && (
    <Icon
      size={18}
      className={iconClassName ?? defaultIconClassName[variant]}
    />
  );

  return (
    <Component
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </Component>
  );
}
