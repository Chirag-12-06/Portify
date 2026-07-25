
import Section from "../../shared/components/common/Section";
import { useSkills } from "./hooks/useSkills";
import { useState, useMemo } from "react";
import { skillLabels } from "./constants/skillLabels";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("");

  const { data: skills = [] } = useSkills();

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

  const selectedCategory = activeCategory ?? categories[0] ?? null;

  return (
    <Section id="skills" title="Skills">
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {skillLabels[category]}
            </button>
          ))}
        </div>

        <ul className="list-disc columns-2 gap-12 space-y-4 pl-6 text-3xl">
          {groupedSkills[selectedCategory]?.map((skill) => (
            <li
              key={skill.id}
              className="break-inside-avoid font-medium transition-colors duration-300 marker:text-cyan-400 hover:text-cyan-300"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
