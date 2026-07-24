import Section from "../../common/Section";
import ExperienceCard from "./ExperienceCard";
import { useExperiences } from "../../../hooks/useExperiences";

export default function Experiences() {
  const { data: experiences } = useExperiences();

  return (
    <Section id="experience" title="Experience">
      <div>
        <div className="space-y-5">
          {experiences?.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </Section>
  );
}
