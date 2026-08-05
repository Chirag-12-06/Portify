import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-12 w-full items-center justify-between border border-white/10 bg-slate-900/60 px-4 text-left text-white outline-none backdrop-blur-sm transition-colors hover:border-white/20 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 ${
          open ? "rounded-t-xl border-cyan-400/50" : "rounded-xl"
        }`}
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {selectedLabel}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="custom-scrollbar absolute z-30 max-h-64 w-full overflow-y-auto rounded-b-xl border border-t-0 border-cyan-400/50 bg-slate-900 shadow-xl shadow-black/40"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  option.value === value
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
