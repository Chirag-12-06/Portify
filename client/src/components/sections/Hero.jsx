import { ArrowDown, MapPin } from "lucide-react";

import { scrollToSection } from "../../utils/scrollToSection";
import {useProfile} from "../../hooks/useProfile";

import Section from "../../components/common/Section";

export default function Hero() {
  const { data: profile } = useProfile();
  return (
    <Section id="home" className="min-h-screen flex items-center">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="text-lg font-medium text-primary">{profile?.greeting}</p>

          <h1 className="mt-3 text-5xl font-extrabold leading-tight lg:text-7xl">
            {profile?.name}
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-300 lg:text-3xl">
            {profile?.title}
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            {profile?.tagline}
          </p>

          <p className="mt-4 max-w-2xl text-gray-500">{profile?.heroDescription}</p>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={18} />
            <span>{profile?.location}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => scrollToSection("projects")}>
              Projects
            </button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {profile?.availability}
          </div>

          <button className="mt-12 flex items-center gap-2 text-gray-400 transition hover:text-white">
            <ArrowDown size={18} />
            <span>Scroll to Explore</span>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />

            {/* Profile */}
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/10 bg-neutral-800 shadow-2xl lg:h-96 lg:w-96">
              <img
                src={profile?.profileImageUrl}
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
