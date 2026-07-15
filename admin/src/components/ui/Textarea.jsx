export default function Textarea({
  label,
  error,
  rows = 5,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}