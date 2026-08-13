import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Section from "../../shared/components/ui/Section";
import Button from "../../shared/components/ui/Button";

import ProjectCard from "./components/ProjectCard";

import { useFeaturedProjectCards } from "./hooks/useFeaturedProjectCards";

export default function Projects() {
  const navigate = useNavigate();

  const { data: featuredProjects = [] } = useFeaturedProjectCards();

  return (
    <Section id="projects" title="Projects">
      <div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  {featuredProjects.map((featuredProject, index) => (
    <div
      key={featuredProject.id}
      className={
        featuredProjects.length % 3 === 2 &&
        index >= featuredProjects.length - 2
          ? "xl:translate-x-[calc(50%+1rem)]"
          : featuredProjects.length % 3 === 1 &&
            index === featuredProjects.length - 1
          ? "xl:translate-x-1/2"
          : ""
      }
    >
      <ProjectCard project={featuredProject} />
    </div>
  ))}
</div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate("/projects")}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
