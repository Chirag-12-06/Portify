import Handle from "./Handle";

const menuItems = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certificates",
  "Socials",
];

export default function Drawer({ open, onMouseEnter, onMouseLeave }) {
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
    transform: open
      ? "translateX(0)"
      : "translateX(-15rem)",
  }}
    >
      <aside
       className="
       flex
      h-[45vh]
      w-60
      rounded-r-3xl
      bg-slate-700
      px-8
      text-white
      shadow-xl
    "
      >
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item}
              className="
                text-left
                text-xl
                text-slate-300

                transition-colors

                hover:text-white
              "
            >
              {item}
            </button>
          ))}
          </nav>
      </aside>

      <Handle open={open} />
    </div>
  );
}
