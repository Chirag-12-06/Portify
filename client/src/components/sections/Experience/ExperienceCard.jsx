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
    <div className="rounded-3xl border border-primary/20 bg-secondary/30 p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl">
      {/* Header */}
      <div className="flex gap-6">
        {/* Company Logo */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10">
          <img
            src={experience.image}
            alt={experience.company}
            className="h-full w-full object-contain p-3"
          />
        </div>

        {/* Company Details */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-foreground">
                {experience.company}
              </h3>

              <p className="mt-1 text-xl text-primary">
                {experience.role}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-foreground">
              <Calendar className="h-4 w-4" />
              {formatMonthYear(experience.startDate)} -{" "}
              {experience.current
                ? "Present"
                : formatMonthYear(experience.endDate)}
            </div>
          </div>

          {experience.location && (
            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {experience.location}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Achievements */}
      <ul className="space-y-3">
        {experience.points.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      {experience.techs?.length > 0 && (
        <>
          <div className="my-6 h-px bg-border" />

          <div className="flex flex-wrap gap-3">
            {experience.techs.map((tech) => (
              <span
                key={tech.id}
                className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary"
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