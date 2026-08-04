import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../footer/FooterSection";

import { useProjectBySlug } from "../hooks/useProjectBySlug";

import { technologyLabels } from "../../technologies/constants/technologyLabels";

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading } = useProjectBySlug(slug);
  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex h-screen items-center justify-center">
        Project not found.
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition hover:bg-accent hover:cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex gap-3">
            {project?.githubUrl && (
              <a
                href={project?.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition hover:bg-accent"
              >
                {/* <Github className="h-4 w-4" /> */}
                GitHub
              </a>
            )}

            {project?.liveUrl && (
              <a
                href={project?.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              project?.status === "COMPLETED"
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {project?.status.replace("_", " ")}
          </span>

          <h1 className="mt-5 text-5xl font-bold">{project?.title}</h1>

          <p className="mt-6 text-lg text-muted-foreground">
            {project?.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {project?.projectYear}
            </div>
          </div>
        </div>

        <div>
          <img
            src={project?.thumbnailUrl}
            alt={project?.title}
            className="h-full w-full rounded-2xl border border-border object-cover"
          />
        </div>
      </section>
      {/* Overview */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-3xl font-bold">Overview</h2>

        <p className="whitespace-pre-line leading-8 text-muted-foreground">
          {project?.fullDescription}
        </p>
      </section>
      {/* Gallery */}
      {project?.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mb-8 text-3xl font-bold">Gallery</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {project?.gallery.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt={image.caption ?? project?.title}
                className="rounded-xl border border-border"
              />
            ))}
          </div>
        </section>
      )}
      {/* Technology Stack */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold">Technology Stack</h2>

        {Object.entries(
          project.techs.reduce((groups, tech) => {
            if (!groups[tech.category]) {
              groups[tech.category] = [];
            }

            groups[tech.category].push(tech);
            return groups;
          }, {}),
        ).map(([category, techs]) => (
          <div key={category} className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-muted-foreground">
              {technologyLabels[category]}
            </h3>

            <div className="flex flex-wrap gap-4">
              {techs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3"
                >
                  <img
                    src={tech.imageUrl}
                    alt={tech.name}
                    className="h-6 w-6 object-contain"
                  />

                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* Skills Demonstrated */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold">Skills Demonstrated</h2>

        <div className="flex flex-wrap gap-3">
          {project.skills.map((skill) => (
            <span
              key={skill.name}
              className="rounded-full border border-border px-4 py-2"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>
      x
      <Footer />
    </main>
  );
}
