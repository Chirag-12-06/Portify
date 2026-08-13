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

const STACK_COLORS = {
  Blue: {
    border: "hover:border-blue-400/40",
    iconBg: "bg-blue-500/10 ring-1 ring-blue-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(96,165,250,0.5)]",
  },
  Green: {
    border: "hover:border-green-400/40",
    iconBg: "bg-green-500/10 ring-1 ring-green-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(74,222,128,0.5)]",
  },
  Purple: {
    border: "hover:border-purple-400/40",
    iconBg: "bg-purple-500/10 ring-1 ring-purple-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(192,132,252,0.5)]",
  },
  Cyan: {
    border: "hover:border-cyan-400/40",
    iconBg: "bg-cyan-500/10 ring-1 ring-cyan-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]",
  },
  Red: {
    border: "hover:border-red-400/40",
    iconBg: "bg-red-500/10 ring-1 ring-red-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(248,113,113,0.5)]",
  },
  Yellow: {
    border: "hover:border-yellow-400/40",
    iconBg: "bg-yellow-500/10 ring-1 ring-yellow-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(250,204,21,0.5)]",
  },
  White: {
    border: "hover:border-white/40",
    iconBg: "bg-white/10 ring-1 ring-white/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.4)]",
  },
  Orange: {
    border: "hover:border-orange-400/40",
    iconBg: "bg-orange-500/10 ring-1 ring-orange-400/20",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(251,146,60,0.5)]",
  },
};

const DEFAULT_STACK_COLOR = {
  border: "hover:border-cyan-400/40",
  iconBg: "bg-slate-800 ring-1 ring-white/10",
  glow: "group-hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.4)]",
};

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // const [booting, setBooting] = useState(
    // () => sessionStorage.getItem("project-loader-shown") !== "true"
  // );

  const [showLoader, setShowLoader] = useState(
  () => sessionStorage.getItem("project-loader-shown") !== "true"
);

const { data: project, isLoading } = useProjectBySlug(slug);

if (showLoader) {
  return (
    <LoadingScreen
      steps={LOADING_STEPS}
      isReady={!isLoading}
      onDone={() => {
        sessionStorage.setItem("project-loader-shown", "true");
        setShowLoader(false);
      }}
    />
  );
}

if (isLoading) {
  return (
    <LoadingScreen
      steps={LOADING_STEPS}
      isReady={false}
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

  if (!project) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-lg text-slate-400">
        Project not found.

        <Button
          variant="secondary"
          onClick={() => navigate("/projects")}
        >
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
      <section className="mx-auto max-w-7xl flow-root px-6 py-16">
        <div className="mb-8 lg:float-right lg:mb-6 lg:ml-12 lg:w-[45%]">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
          />
        </div>

        <Badge
          variant={project?.status === "COMPLETED" ? "success" : "warning"}
          className="w-fit font-bold text-sm"
        >
          {project?.status.replace("_", " ")}
        </Badge>

        <h1 className="mt-5 text-5xl font-bold">{project.title}</h1>

        <p className="mt-6 text-lg text-slate-300 text-justify">
          {project.shortDescription}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="h-4 w-4 text-cyan-400" />
          {project.projectYear}
        </div>

        {/* Overview starts here */}
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>

          <p className="whitespace-pre-line leading-8 text-slate-300 text-justify">
            {project.fullDescription}
          </p>
        </div>
      </section>
      {/* Gallery */}
      {project?.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mb-8 text-3xl font-bold">Gallery</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {project?.gallery.map((image, index) => {
              const isLastOdd =
                project.gallery.length % 2 !== 0 &&
                index === project.gallery.length - 1;

              return (
                <div
                  key={image.id}
                  className={
                    isLastOdd
                      ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.75rem)]"
                      : ""
                  }
                >
                  <img
                    src={image.imageUrl}
                    alt={image.caption ?? project?.title}
                    className="w-full rounded-xl border border-white/10 shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-[1.02]"
                  />
                  <div className="mt-2 text-2xl text-center text-slate-400">
                    {image.caption ?? project?.title}
                  </div>
                </div>
              );
            })}
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
          <div key={category} className="mb-10 last:mb-0">
            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
                {technologyLabels[category]}
              </h3>
              <span className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {techs.map((tech) => {
                const palette = STACK_COLORS[tech.color] ?? DEFAULT_STACK_COLOR;

                return (
                  <div
                    key={tech.name}
                    className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3.5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 ${palette.border} ${palette.glow}`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${palette.iconBg}`}
                    >
                      <img
                        src={tech.imageUrl}
                        alt={tech.name}
                        className="h-5 w-5 object-contain"
                      />
                    </div>

                    <span className="truncate font-medium text-slate-200">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
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
