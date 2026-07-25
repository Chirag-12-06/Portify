import { useNavigate } from "react-router-dom";

import Section from "../../shared/components/common/Section";

import ProjectCard from "./components/ProjectCard";

import { useProjects } from "./hooks/useProjects";

export default function Projects() {
  const navigate = useNavigate();

  const { data: projects = [] } = useProjects();

  return (
    <Section id="projects" title="Projects">
      <div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
