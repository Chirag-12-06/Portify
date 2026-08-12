import { useEffect, useState } from "react";
import {
  Briefcase,
  Check,
  Database,
  FolderGit2,
  Rocket,
  Server,
  Sparkles,
} from "lucide-react";

const DEFAULT_STEPS = [
  { icon: Database, text: "Connecting to backend" },
  { icon: Server, text: "Fetching portfolio data" },
  { icon: FolderGit2, text: "Loading projects" },
  { icon: Sparkles, text: "Preparing animations" },
  { icon: Briefcase, text: "Rendering experience" },
  { icon: Rocket, text: "Launching portfolio" },
];

export default function LoadingScreen({
  steps = DEFAULT_STEPS,
  stepDuration = 900,
  isReady = true,
  onDone,
}) {
  const [revealed, setRevealed] = useState(1);
  const [exiting, setExiting] = useState(false);

  // Reveal steps one at a time, purely cosmetic pacing.
  useEffect(() => {
    if (revealed >= steps.length) return;
    const timer = setTimeout(() => setRevealed((r) => r + 1), stepDuration);
    return () => clearTimeout(timer);
  }, [revealed, steps.length, stepDuration]);

  const allRevealed = revealed >= steps.length;
  const canFinish = allRevealed && isReady;

  // Only start exiting once every step has been shown AND the real data is ready.
  useEffect(() => {
    if (!canFinish) return;
    const exitTimer = setTimeout(() => setExiting(true), 350);
    return () => clearTimeout(exitTimer);
  }, [canFinish]);

  useEffect(() => {
    if (!exiting) return;
    const doneTimer = setTimeout(() => onDone?.(), 500);
    return () => clearTimeout(doneTimer);
  }, [exiting, onDone]);

  const activeIndex = revealed - 1;

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6">
        <ul className="space-y-4">
          {steps.map((step, index) => {
            const isRevealed = index <= activeIndex;
            const isCurrent = index === activeIndex;
            const isLastStep = index === steps.length - 1;
            const isActive = isCurrent && (!isLastStep || !canFinish);
            const isChecked = isRevealed && !isActive;
            const Icon = step.icon;

            return (
              <li
                key={step.text}
                className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                  isRevealed
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400 shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]"
                      : "border-white/10 bg-white/5 text-slate-500"
                  }`}
                >
                  <Icon size={16} className={isActive ? "animate-pulse" : ""} />
                </span>

                <span
                  className={
                    isActive
                      ? "font-medium text-white"
                      : "text-slate-500"
                  }
                >
                  {step.text}
                </span>

                {isChecked && (
                  <Check size={14} className="ml-auto text-cyan-400/70" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Progress bar */}
        <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500 ease-out"
            style={{
              width: `${(Math.min(revealed, steps.length) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
