import { SiLeetcode } from "react-icons/si";
import { ExternalLink, Star, Trophy } from "lucide-react";
import { useLeetCode } from "../hooks/useSocials";
import Heatmap from "./Heatmap";
import QuestionDistribution from "./QuestionDistribution";
import Button from "../../../shared/components/ui/Button";

export default function LeetCodeCard() {
  const { data: leetcode } = useLeetCode();

  return (
    <section className="flex h-87.5 w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
      {/* LEFT */}
      <div className="flex w-[35%] flex-col border-r border-slate-700">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-slate-700 p-6">
          <div className="rounded-lg bg-[#FFA116]/10 p-2">
            <SiLeetcode className="h-7 w-7 text-[#FFA116]" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              {leetcode?.username}
            </h2>
          </div>
        </header>

        {/* Progress + Distribution */}
        <div className="flex flex-1 items-center justify-center px-6">
          <QuestionDistribution
            easy={leetcode?.easy ?? 0}
            medium={leetcode?.medium ?? 0}
            hard={leetcode?.hard ?? 0}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="text-3xl font-bold text-white">
              {leetcode?.heatmap?.reduce((sum, count) => sum + count, 0) ?? 0}
              <span className="ml-2 text-base font-normal text-slate-400">
                submissions this year
              </span>
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-slate-400">Active Days</p>
              <p className="font-semibold text-white">{leetcode?.activeDays}</p>
            </div>

            <div>
              <p className="text-slate-400">Max Streak</p>
              <p className="font-semibold text-white">{leetcode?.streak}</p>
            </div>
          </div>
        </div>
        {/* Heatmap */}
        <div className="px-10 py-4">
          <Heatmap heatmap={leetcode?.heatmap ?? []} />
        </div>

        {/* Stats */}
        <div className="mt-auto flex h-24 items-center gap-6 border-t border-slate-700 px-6">
          <div className="flex flex-1 items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Star size={16} className="text-cyan-400" />
              Top Percentage
              <span className="font-semibold text-white">
                {leetcode?.topPercentage}%
              </span>
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Trophy size={16} className="text-cyan-400" />
              Ranking
              <span className="font-semibold text-white">
                {leetcode?.ranking}
              </span>
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Star size={16} className="text-cyan-400" />
              Contest Rating
              <span className="font-semibold text-white">
                {leetcode?.contestRating}
              </span>
            </span>
          </div>

          <Button
            variant="primary"
            icon={ExternalLink}
            iconPosition="right"
            href={leetcode?.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
