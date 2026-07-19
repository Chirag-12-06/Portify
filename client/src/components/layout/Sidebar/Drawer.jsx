import Handle from "./Handle";
import Navigation from "./Navigation";
import NavItem from "./NavItem";

export default function Drawer({ open, onMouseEnter, onMouseLeave, activeSection, setActiveSection }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
    fixed
    left-0
    top-1/2
-translate-y-1/2
    z-40
    flex
    transition-transform
    duration-500
    ease-in-out
    
  "
      style={{
        transform: open ? "translateX(0)" : "translateX(-15rem)",
      }}
    >
      <aside
        className="
       flex
      h-[50vh]
      w-60
      rounded-r-3xl
      bg-slate-700
      px-8
      text-white
      shadow-xl
      items-center
  justify-center
    "
      >
        <Navigation 
        activeSection={activeSection}
        />
      </aside>

      <Handle open={open} />
    </div>
  );
}
