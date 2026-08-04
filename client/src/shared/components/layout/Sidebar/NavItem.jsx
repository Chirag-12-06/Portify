import { useState } from "react";
import { scrollToSection } from "../../../utils/scrollToSection";

export default function NavItem({ item, activeSection }) {
  const [hover, setHover] = useState(false);

  const isActive = activeSection === item.id;
  const showDot = isActive && !hover;
  const showPointer = hover;
  const Icon = hover || isActive ? item.hoverIcon : item.icon;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => scrollToSection(item.id)}
      className="flex w-full cursor-pointer items-center gap-3 px-6 py-3 transition-all duration-300"
    >
      <div className="relative w-5 flex items-center justify-center">
        {showDot && <div className="h-2 w-2 rounded-full bg-white" />}
        {showPointer && (
          <span className="text-xl font-black text-white">►</span>
        )}
      </div>

      <div
        className={`
          flex
          items-center
          gap-4
          text-xl
          text-slate-300
          transition-all
          duration-300
          ${isActive ? "font-bold text-white" : ""}
          ${hover ? "translate-x-5 scale-[1.40] text-white" : ""}
        `}
      >
        <Icon className="h-6 w-6 transition-all duration-300" />
        <span>{item.name}</span>
      </div>
    </div>
  );
}