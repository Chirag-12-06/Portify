import Section from "../../components/common/Section";
import { useSkills } from "../../hooks/useSkills";
import { useState, useEffect, useMemo } from "react";
import {categoryLabels} from "../../constants/categoryLabels";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("");

  const { data: skills = [], isLoading } = useSkills();

  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }

      acc[skill.category].push(skill);

      return acc;
    }, {});
  }, [skills]);

  const categories = Object.keys(groupedSkills);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  return (
    <Section id="skills" title="Tech Stack">
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}>
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-15">
          {groupedSkills[activeCategory]?.map((skill) => (
            <div key={skill.id} className="group flex flex-col items-center">
              <div className="relative flex h-56 w-56 items-center justify-center">
                <div className="absolute h-32 w-32 rounded-full bg-cyan-400/25 blur-3xl transition-all duration-300 group-hover:h-40 group-hover:w-40 group-hover:bg-cyan-400/50" />
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="relative h-40 w-40 transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-3 text-center text-3xl font-medium transition-all duration-300 group-hover:text-cyan-300">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
