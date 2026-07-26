import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../footer/FooterSection";
import ProjectCard from "../components/ProjectCard";

import { useProjectCards } from "../hooks/useProjectCards";
import { useTechnologies } from "../../technologies/hooks/useTechnologies";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [technology, setTechnology] = useState("");

  const { data: projectCards = [] } = useProjectCards();
  const { data: technologies = [] } = useTechnologies();

  const filteredProjects = projectCards.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || project.status === status;

    const matchesTechnology =
      technology === "" ||
      project.techs.some(
        ({ tech }) => tech.name.toLowerCase() === technology.toLowerCase(),
      );

    return matchesSearch && matchesStatus && matchesTechnology;
  });

  return (
    <main className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">Projects</h1>

              <p className="mt-2 text-muted-foreground">
                Explore all projects, experiments and applications.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            >
              <option value="" className="text-black">
                All Status
              </option>

              <option value="COMPLETED" className="text-black">
                Completed
              </option>

              <option value="IN_PROGRESS" className="text-black">
                In Progress
              </option>
            </select>

            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            >
              <option value="" className="text-black">
                All Technologies
              </option>

              {technologies.map((tech) => (
                <option key={tech.id} value={tech.name} className="text-black">
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
