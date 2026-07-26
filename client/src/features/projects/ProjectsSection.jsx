import { useNavigate } from "react-router-dom";

import Section from "../../shared/components/ui/Section";

import ProjectCard from "./components/ProjectCard";

import { useFeaturedProjectCards } from "./hooks/useFeaturedProjectCards";

export default function Projects() {
  const navigate = useNavigate();

  const { data: featuredProjects = [] } = useFeaturedProjectCards();

  return (
    <Section id="projects" title="Projects">
      <div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((featuredProject) => (
            <ProjectCard key={featuredProject.id} project={featuredProject} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => navigate("/projects")}>
            View All Projects →
          </button>
        </div>
      </div>
    </Section>
  );
}
