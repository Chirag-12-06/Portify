import Section from "../../common/Section";
import EducationCard from "./EducationCard";
import { useEducations } from "../../../hooks/useEducations";

export default function Education() {
  const {
  data: educations,
  isLoading,
  error,
} = useEducations();

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
