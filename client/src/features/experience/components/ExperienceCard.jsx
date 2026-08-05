import { Calendar, MapPin } from "lucide-react";

function formatMonthYear(date) {
  if (!date) return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceCard({ experience }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-slate-800/80 p-8 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.4)]">
      {/* Header */}
      <div className="flex gap-6">
        {/* Company Logo */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-cyan-400/10">
          <img
            src={experience.companyImageUrl}
            alt={experience.company}
            className="h-full w-full object-contain p-3"
          />
        </div>

        {/* Company Details */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-white">
                {experience.company}
              </h3>

              <p className="mt-1 text-xl font-medium text-cyan-300">
                {experience.role}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Calendar className="h-4 w-4" />
              {formatMonthYear(experience.startDate)} -{" "}
              {experience.current
                ? "Present"
                : formatMonthYear(experience.endDate)}
            </div>
          </div>

          {experience.location && (
            <div className="mt-3 flex items-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              {experience.location}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10" />

      {/* Achievements */}
      <ul className="list-disc space-y-3 pl-5 text-slate-300 marker:text-cyan-400">
        {experience.points.map((point) => (
          <li key={point.id}>{point.content}</li>
        ))}
      </ul>

      {/* Divider */}
      {experience.techs?.length > 0 && (
        <>
          <div className="my-6 h-px bg-white/10" />

          <div className="flex flex-wrap gap-3">
            {experience.techs.map((tech) => (
              <span
                key={tech.id}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/15"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
