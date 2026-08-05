import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Database,
  Server,
  FolderGit2,
  Code2,
  Layers,
  Rocket,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../footer/FooterSection";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import { useProjectBySlug } from "../hooks/useProjectBySlug";

import { technologyLabels } from "../../technologies/constants/technologyLabels";

const LOADING_STEPS = [
  { icon: Database, text: "Connecting to backend" },
  { icon: Server, text: "Fetching project details" },
  { icon: FolderGit2, text: "Loading repository info" },
  { icon: Code2, text: "Loading tech stack" },
  { icon: Layers, text: "Rendering details" },
  { icon: Rocket, text: "Almost there" },
];

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [booting, setBooting] = useState(true);

  const { data: project, isLoading } = useProjectBySlug(slug);

  if (booting) {
    return (
      <LoadingScreen
        steps={LOADING_STEPS}
        isReady={!isLoading}
        onDone={() => setBooting(false)}
      />
    );
  }

  if (!project) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-lg text-slate-400">
        Project not found.
        <Button variant="secondary" onClick={() => navigate("/projects")}>
          Back to Projects
        </Button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <div className="flex gap-3">
            {project?.githubUrl && (
              <Button
                variant="secondary"
                icon={FaGithub}
                iconPosition="left"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Button>
            )}

            {project?.liveUrl && (
              <Button
                variant="primary"
                icon={ExternalLink}
                iconPosition="right"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <Badge
            variant={project?.status === "COMPLETED" ? "success" : "warning"}
          >
            {project?.status.replace("_", " ")}
          </Badge>

          <h1 className="mt-5 text-5xl font-bold">{project?.title}</h1>

          <p className="mt-6 text-lg text-slate-300">
            {project?.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyan-400" />
              {project?.projectYear}
            </div>
          </div>
        </div>

        <div>
          <img
            src={project?.thumbnailUrl}
            alt={project?.title}
            className="h-full w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/40"
          />
        </div>
      </section>
      {/* Overview */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-3xl font-bold">Overview</h2>

        <p className="whitespace-pre-line leading-8 text-slate-300">
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
                className="rounded-xl border border-white/10 shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-[1.02]"
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
            <h3 className="mb-4 text-lg font-semibold text-slate-400">
              {technologyLabels[category]}
            </h3>

            <div className="flex flex-wrap gap-4">
              {techs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 transition-colors duration-200 hover:border-cyan-400/30"
                >
                  <img
                    src={tech.imageUrl}
                    alt={tech.name}
                    className="h-6 w-6 object-contain"
                  />

                  <span className="text-slate-200">{tech.name}</span>
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
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
