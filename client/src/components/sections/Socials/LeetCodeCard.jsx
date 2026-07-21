import { SiLeetcode } from "react-icons/si";
import { useLeetCode } from "../../../hooks/useSocials";
import Heatmap from "../../common/Heatmap";
import QuestionDistribution from "./QuestionDistribution";

export default function LeetCodeCard() {
  const { data: leetcode, isLoading } = useLeetCode();

  return (
    <section className="flex h-[350px] w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
      {/* LEFT */}
      <div className="flex w-[40%] flex-col border-r border-slate-700">
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
        <div className="flex flex-1 items-center justify-center py-0 px-2">
          <QuestionDistribution
            easy={leetcode?.easy ?? 0}
            medium={leetcode?.medium ?? 0}
            hard={leetcode?.hard ?? 0}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col">
          {/* Top */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <p className="text-3xl font-bold text-white">
                {leetcode?.heatmap?.reduce((sum, day) => sum + day.count, 0) ??
                  0}
                <span className="ml-2 text-base font-normal text-slate-400">
                  submissions this year
                </span>
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <div>
                <p className="text-slate-400">Active Days</p>
                <p className="font-semibold text-white">
                  {leetcode?.activeDays}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Max Streak</p>
                <p className="font-semibold text-white">{leetcode?.streak}</p>
              </div>
            </div>
          </div>
        {/* Heatmap */}
        <div className="px-6 py-4">
          <Heatmap heatmap={leetcode?.heatmap ?? []} />
        </div>

        {/* Stats */}
        <div className="mt-auto flex h-20 items-center justify-between border-t border-slate-700 px-6">
          <span>⭐ Rating : {leetcode?.starRating}</span>

          <span>🏆 Ranking : {leetcode?.ranking}</span>

          <a
            href={leetcode?.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-amber-400 px-4 py-2 text-sm font-medium text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-slate-900"
          >
            View Profile ↗
          </a>
        </div>
      </div>
    </section>
  );
}
