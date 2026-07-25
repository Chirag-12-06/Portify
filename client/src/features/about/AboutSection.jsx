import Section from "../../shared/components/common/Section";

import { useAbout } from "./hooks/useAbout";

export default function About() {
  const { data: about, isLoading } = useAbout();

  if (isLoading) {
    return null;
  }

  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">{about.heading}</h2>

          <p className="leading-8 text-gray-300 whitespace-pre-line">
            {about.content}
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-6">
          {about.highlights?.map((highlight) => (
            <div
              key={highlight.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <h3 className="text-4xl font-bold text-primary">
                {highlight.stat}+
              </h3>

              <p className="mt-2 text-sm text-gray-400">{highlight.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
