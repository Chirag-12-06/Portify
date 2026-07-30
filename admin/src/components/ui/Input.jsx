import { useId } from "react";

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}