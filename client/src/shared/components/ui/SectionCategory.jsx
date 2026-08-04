export default function SectionCategory({
  categories,
  Labels,
  selectedCategory,
  setActiveCategory,
}) {
  return (
    <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {Labels[category]}
        </button>
      ))}
    </div>
  );
}
