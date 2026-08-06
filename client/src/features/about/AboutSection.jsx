import Section from "../../shared/components/ui/Section";

import { useAbout } from "./hooks/useAbout";

function handleTiltMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const percentX = (e.clientX - rect.left) / rect.width - 0.5;
  const percentY = (e.clientY - rect.top) / rect.height - 0.5;

  card.style.transition = "transform 0ms";
  card.style.transform = `perspective(600px) rotateX(${percentY * -16}deg) rotateY(${percentX * 16}deg) translateY(-6px) scale(1.04)`;
}

function handleTiltLeave(e) {
  const card = e.currentTarget;
  card.style.transition = "transform 500ms ease";
  card.style.transform =
    "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
}

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
          <h2 className="flex items-center gap-4 text-4xl font-bold tracking-tight">
            <span className="h-8 w-1.5 rounded-full bg-cyan-400" />
            {about.heading}
          </h2>

          <p className="text-lg leading-8 text-slate-300 whitespace-pre-line justify">
            {about.content}
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-8">
          {about.highlights?.map((highlight, index) => {
            const isLastOdd =
              about.highlights.length % 2 !== 0 &&
              index === about.highlights.length - 1;

            return (
              <div
                key={highlight.id}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                className={`group rounded-2xl border border-white/15 bg-slate-800/80 p-10 text-center shadow-xl shadow-black/40 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-cyan-400/30 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.45)] ${
                  isLastOdd ? "col-span-2 mx-auto w-full max-w-[calc(50%-1rem)]" : ""
                }`}
              >
                <h3 className="bg-linear-to-br from-cyan-300 to-cyan-500 bg-clip-text text-5xl font-extrabold text-transparent transition-transform duration-300 group-hover:scale-110">
                  {highlight.stat}+
                </h3>

                <p className="mt-3 text-xs font-medium tracking-wider text-slate-400 uppercase">
                  {highlight.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
