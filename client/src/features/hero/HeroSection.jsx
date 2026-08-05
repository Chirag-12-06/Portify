import { ArrowDown, ArrowRight, MapPin } from "lucide-react";

import { scrollToSection } from "../../shared/utils/scrollToSection";
import { useProfile } from "../profile/hooks/useProfile";
import { useHeroes } from "./hooks/useHeroes";

import Section from "../../shared/components/ui/Section";
import Button from "../../shared/components/ui/Button";

export default function Hero() {
  const { data: profile } = useProfile();
  const { data: hero } = useHeroes();
  return (
    <Section
      id="home"
      className="flex min-h-screen items-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Hi, I&apos;m
          </p>

          <h1 className="mt-3 bg-linear-to-br from-white via-white to-slate-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent lg:text-7xl">
            {profile?.name}
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-cyan-300 lg:text-3xl">
            {hero?.heroTitle}
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {hero?.tagline}
          </p>

          <p className="mt-4 max-w-2xl text-slate-400">
            {profile?.heroDescription}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={18} className="text-cyan-400" />
            <span>{profile?.location}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-start gap-4">
            <div className="inline-flex mb-5 items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {hero?.availability}
            </div>

            <Button
              variant="ghost"
              icon={ArrowDown}
              iconPosition="left"
              onClick={() => scrollToSection("about")}
            >
              Scroll to Explore
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-cyan-400/30 via-emerald-400/10 to-transparent blur-3xl" />

            {/* Rotating accent ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_20s_linear_infinite]" />

            {/* Profile */}
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/10 bg-neutral-800 shadow-2xl lg:h-96 lg:w-96">
              <img
                src={hero?.heroImageUrl}
                alt={profile?.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
