import Section from "../common/Section";
import { useTechnologies } from "../../hooks/useTechnologies";
import { useState, useEffect, useMemo } from "react";
import { technologyLabels } from "../../constants/technologyLabels";

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState("");

  const { data: technologies = [], isLoading } = useTechnologies();

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

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  return (
    <Section id="technologies" title="Technologies">
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}>
              {technologyLabels[category]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-15">
          {groupedTechnologies[activeCategory]?.map((technology) => (
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
