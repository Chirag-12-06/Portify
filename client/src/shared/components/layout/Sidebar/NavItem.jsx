import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { scrollToSection } from "../../../utils/scrollToSection";

export default function NavItem({ item, activeSection }) {
  const [hover, setHover] = useState(false);

  const isActive = activeSection === item.id;
  const showDot = isActive && !hover;
  const showChevron = hover;
  const Icon = hover || isActive ? item.hoverIcon : item.icon;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => scrollToSection(item.id)}
      className="relative mx-3 flex w-[calc(100%-1.5rem)] cursor-pointer items-center gap-3 rounded-xl px-4 py-3"
    >
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute inset-0 rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/30"
        />
      )}

      <div className="relative z-10 flex w-5 shrink-0 items-center justify-center">
        {showDot && (
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        )}
        {showChevron && (
          <ChevronRight className="h-4 w-4 text-cyan-400" />
        )}
      </div>

      <div
        className={`
          relative
          z-10
          flex
          items-center
          gap-4
          text-xl
          text-slate-300
          transition-all
          duration-300
          ${isActive ? "font-semibold text-white" : ""}
          ${hover ? "translate-x-5 scale-[1.40] text-white" : ""}
        `}
      >
        <Icon
          className={`h-6 w-6 transition-colors duration-300 ${
            isActive || hover ? "text-cyan-400" : "text-slate-400"
          }`}
        />
        <span>{item.name}</span>
      </div>
    </div>
  );
}