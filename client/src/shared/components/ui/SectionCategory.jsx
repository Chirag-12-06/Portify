import { scrollToSection } from "../../utils/scrollToSection";

export default function SectionCategory({
  categories,
  Labels,
  selectedCategory,
  setActiveCategory,
  sectionId,
}) {
  const handleSelect = (category) => {
    setActiveCategory(category);
    scrollToSection(sectionId);
  };

  return (
    <div className="sticky top-20 z-30 -mx-12 flex flex-wrap justify-center gap-4 border-b border-white/10 bg-slate-950/90 px-12 py-4 backdrop-blur-xl">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`whitespace-nowrap rounded-full border-2 px-7 py-3 text-base font-semibold tracking-wide transition-all duration-300 md:text-lg ${
              isActive
                ? "scale-105 border-cyan-400/50 bg-linear-to-br from-cyan-400/20 to-cyan-500/5 text-cyan-300 shadow-[0_0_25px_-4px_rgba(34,211,238,0.7)]"
                : "border-white/10 bg-white/5 text-slate-400 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-black/30"
            }`}
          >
            {Labels[category]}
          </button>
        );
      })}
    </div>
  );
}
