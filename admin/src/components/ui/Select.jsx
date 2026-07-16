export default function Select({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
        {...props}
      >
        {children}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
