import Section from "../../shared/components/ui/Section";

import EducationCard from "./components/EducationCard";
import { useEducations } from "./hooks/useEducations";

export default function Education() {
  const { data: educations } = useEducations();

  return (
    <Section id="education" title="Education">
      <section className="space-y-10">
        {educations?.map((education, index) => (
          <EducationCard
            key={education.id}
            education={education}
            reverse={index % 2 === 1}
          />
        ))}
      </section>
    </Section>
  );
}
