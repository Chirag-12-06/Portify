import Section from "../../shared/components/ui/Section";
import { useTechnologies } from "./hooks/useTechnologies";
import { useState, useMemo } from "react";
import { technologyLabels } from "./constants/technologyLabels";
import SectionCategory from "../../shared/components/ui/SectionCategory";

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: technologies = [] } = useTechnologies();

  const groupedTechnologies = useMemo(() => {
    return technologies.reduce((acc, technology) => {
      if (!acc[technology.category]) {
        acc[technology.category] = [];
      }

      acc[technology.category].push(technology);

      return acc;
    }, {});
  }, [technologies]);

  const categories = Object.keys(groupedTechnologies);

  const selectedCategory = activeCategory ?? categories[0] ?? null;

  return (
    <Section id="technologies" title="Technologies">
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <SectionCategory
          categories={categories}
          Labels={technologyLabels}
          selectedCategory={selectedCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="flex flex-wrap justify-center gap-15">
          {groupedTechnologies[selectedCategory]?.map((technology) => (
            <div
              key={technology.id}
              className="group flex flex-col items-center"
            >
              <div className="relative flex h-56 w-56 items-center justify-center">
                <div className="absolute h-32 w-32 rounded-full bg-cyan-400/25 blur-3xl transition-all duration-300 group-hover:h-40 group-hover:w-40 group-hover:bg-cyan-400/50" />
                <img
                  src={technology.imageUrl}
                  alt={technology.name}
                  className="relative h-40 w-40 transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-3 text-center text-3xl font-medium transition-all duration-300 group-hover:text-cyan-300">
                {technology.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
