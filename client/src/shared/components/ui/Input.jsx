export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
      )}

      <input
        className={`h-12 w-full rounded-xl border border-white/10 bg-slate-900/60 text-white outline-none backdrop-blur-sm transition-colors placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 ${
          Icon ? "pl-11 pr-4" : "px-4"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
