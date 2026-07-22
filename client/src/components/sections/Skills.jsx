import Section from "../common/Section";
import { useSkills } from "../../hooks/useSkills";
import { useState, useEffect, useMemo } from "react";
import { skillLabels } from "../../constants/skillLabels";

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
    <Section id="skills" title="Skills">
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}>
              {skillLabels[category]}
            </button>
          ))}
        </div>

        <ul className="list-disc columns-2 gap-12 space-y-4 pl-6 text-3xl">
  {groupedSkills[activeCategory]?.map((skill) => (
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
