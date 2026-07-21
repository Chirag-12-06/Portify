import Section from "../../components/common/Section";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex h-48 flex-col items-center justify-center border-t border-slate-700">
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="group flex flex-col items-center gap-3"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-cyan-400 group-hover:bg-cyan-400/10">
          <ArrowUp className="h-7 w-7 text-cyan-400" />
        </div>

        <span className="text-sm text-slate-400 group-hover:text-white">
          Back to Top
        </span>
      </button>

      <p className="mt-8 text-xs text-slate-500">© 2026 Chirag Gupta</p>
    </footer>
  );
}
