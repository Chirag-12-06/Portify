
import Section from "../../shared/components/ui/Section";
import { useSkills } from "./hooks/useSkills";
import { useState, useMemo } from "react";
import { skillLabels } from "./constants/skillLabels";
import SectionCategory from "../../shared/components/ui/SectionCategory";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

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
        <SectionCategory
          categories={categories}
          Labels={skillLabels}
          selectedCategory={selectedCategory}
          setActiveCategory={setActiveCategory}
          sectionId="skills"
        />

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
