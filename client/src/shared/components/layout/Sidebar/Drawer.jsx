import Handle from "./Handle";
import Navigation from "./Navigation";

export default function Drawer({ open, onMouseEnter, onMouseLeave, activeSection }) {
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
        transform: open ? "translateX(0)" : "translateX(-18rem)",
      }}
    >
      <aside
  className="
    flex
    flex-col
    h-[55vh]
    w-72
    rounded-r-3xl
    border
    border-l-0
    border-white/10
    bg-linear-to-b
    from-slate-800/95
    to-slate-900/95
    text-white
    shadow-2xl
    shadow-black/50
    backdrop-blur-xl
    justify-center
    py-2
  "
>
  <Navigation activeSection={activeSection} />
</aside>

      <Handle open={open} />
    </div>
  );
}
