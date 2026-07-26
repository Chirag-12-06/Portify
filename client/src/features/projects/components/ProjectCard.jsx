import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Badge from "../../../shared/components/ui/Badge";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-800"
    >
      {/* Screenshot */}
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex h-64 flex-col p-6">
        {/* Meta */}
        <div className="mb-3 flex items-center justify-between">
          <Badge
            variant={project.status === "COMPLETED" ? "success" : "warning"}
          >
            {project.status === "COMPLETED" ? "Completed" : "In Progress"}
          </Badge>

          <span className="text-sm text-slate-500">{project.projectYear}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 h-18 overflow-hidden text-sm leading-6 text-slate-600 dark:text-slate-400">
          {project.shortDescription}
        </p>

        {/* Tech */}
        <div className="mt-5 flex items-center">
          {project.techs.slice(0, 5).map((tech, index) => (
            <div
              key={tech.name}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 ring-2 ring-slate-900 ${
                index !== 0 ? "-ml-2" : ""
              }`}
              title={tech.name}
            >
              <img
                src={tech.imageUrl}
                alt={tech.name}
                className="h-5 w-5 object-contain"
              />
            </div>
          ))}

          {project.techs.length > 5 && (
            <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white ring-2 ring-slate-900">
              +{project.techs.length - 5}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-6 pt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-primary"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-primary"
            >
              <ArrowUpRight size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
