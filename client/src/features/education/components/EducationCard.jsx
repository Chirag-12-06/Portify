import { Calendar, MapPin, Star } from "lucide-react";

export default function EducationCard({ education, reverse }) {
  return (
    <article
      className={`flex flex-col items-center gap-10 rounded-3xl border border-white/15 bg-slate-800/80 p-8 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.4)] md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="flex w-full justify-center md:w-1/3">
        <div className="aspect-square w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <img
            src={education.imageUrl}
            alt={education.institution}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-5">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {education.institution}
          </h2>

          <p className="mt-2 text-xl font-medium text-cyan-300">
            {education.degree}
          </p>

          <p className="text-slate-400">{education.fieldOfStudy}</p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300">
              <MapPin size={16} className="text-slate-400" />
              {education.location}
            </span>

            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300">
              <Calendar size={16} className="text-slate-400" />
              {new Date(education.startDate).getFullYear()} -{" "}
              {education.endDate
                ? new Date(education.endDate).getFullYear()
                : "Currently Studying"}
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300">
              <Star size={16} className="text-cyan-400" />
              {education.grade} CGPA
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
