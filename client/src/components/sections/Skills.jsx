import Section from "../../components/common/Section";
import { useSkills } from "../../hooks/useSkills";
import { useState, useEffect, useMemo } from "react";

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
    <Section id="skills" title="Skills" >
      <div className=" flex flex-col gap-8">
        {/* Categories */}
        <div className="bg-pink-600 flex gap-3 overflow-x-auto text-2xl">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-4">
          {groupedSkills[activeCategory]?.map((skill) => (
            <div key={skill.id}>
              <img src={skill.imageUrl} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
