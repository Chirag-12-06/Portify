import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Handle({ open }) {
  const Icon = open ? ChevronLeft : ChevronRight;

  return (
    <div
      className="
        group
        absolute
        -right-8
        top-[40%]
        -translate-y-1/2
        h-30
        w-8
        rounded-r-full
        border
        border-l-0
        border-white/10
        bg-linear-to-b
        from-slate-800/95
        to-slate-900/95
        text-slate-400
        shadow-lg
        shadow-black/40
        backdrop-blur-xl
        flex
        items-center
        justify-center
        cursor-pointer
        select-none
        transition-colors
        duration-200
        hover:text-cyan-400
      "
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
    </div>
  );
}
