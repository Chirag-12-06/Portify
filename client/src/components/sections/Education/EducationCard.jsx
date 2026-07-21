import { Calendar, GraduationCap, MapPin, Star } from "lucide-react";

export default function EducationCard({ education, reverse }) {
  return (
    <article
      className={`flex flex-col items-center gap-10 rounded-3xl border border-slate-700 bg-slate-900/40 p-8 md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="flex w-full justify-center md:w-1/3">
        <div className="aspect-square w-64 overflow-hidden rounded-3xl bg-slate-800">
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
          <h2 className="text-3xl font-bold">{education.institution}</h2>

          <p className="mt-2 text-xl text-slate-300">{education.degree}</p>

          <p className="text-slate-400">{education.fieldOfStudy}</p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2">
              <MapPin size={16} />
              {education.location}
            </span>

            <span className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2">
              <Calendar size={16} />
              {new Date(education.startDate).getFullYear()} -{" "}
              {education.endDate
                ? new Date(education.endDate).getFullYear()
                : "Currently Studying"}
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2">
              <Star size={16} />
              {education.grade} CGPA
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
