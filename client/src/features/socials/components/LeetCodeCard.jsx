import { SiLeetcode } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { useLeetCode } from "../hooks/useSocials";
import Heatmap from "./Heatmap";
import QuestionDistribution from "./QuestionDistribution";
import Button from "../../../shared/components/ui/Button";
import SkillsBubbleChart from "./SkillsBubbleChart";

export default function LeetCodeCard() {
  const { data: leetcode } = useLeetCode();

  return (
    <section className="flex flex-col gap-2 rounded-3xl border border-slate-700 bg-slate-900 ">
      {/* Row 1 - Header */}
      <header className="flex items-center justify-between border-b border-slate-700 py-4 px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-lg bg-white/10">
            {leetcode?.profile?.avatar ? (
              <img
                src={leetcode.profile.avatar}
                alt={leetcode?.profile?.realName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <SiLeetcode className="h-7 w-7 text-white" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-white">
            {leetcode?.username}
          </h2>
        </div>

        {/* Right */}
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
      </header>
      <div className="flex w-full flex-col gap-4 p-4">
        {/* Row 2 - Problem Solving + Contribution */}
        <div className="flex w-full gap-4">
          {/* Problem Solving */}
          <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950">
            <div className="flex flex-1 items-center justify-center px-6">
              <QuestionDistribution
                easy={leetcode?.easy ?? 0}
                medium={leetcode?.medium ?? 0}
                hard={leetcode?.hard ?? 0}
              />
            </div>
          </div>

          {/* Contribution */}
          <div className="flex-2 rounded-2xl border border-slate-700 bg-slate-950">
            <div className="flex items-center justify-between px-6 pt-6">
              <div>
                <p className="text-3xl font-bold text-white">
                  {leetcode?.heatmap?.reduce((sum, count) => sum + count, 0) ??
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
            <div className="px-10 py-4">
              <Heatmap heatmap={leetcode?.heatmap ?? []} />
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="h-80 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4">
          <h3 className="mb-2 text-lg font-semibold text-white">
            Topics Covered
          </h3>

          <div className="h-[calc(100%-32px)] w-full">
            <SkillsBubbleChart skills={leetcode?.skills} />
          </div>
        </div>

        {/* Row 4 - Languages + Contest */}
        <div className="flex w-full gap-4">
          {/* Languages */}
          <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 p-4">
            <h3 className="mb-2 text-lg font-semibold text-white">Languages</h3>

            <div className="flex flex-col gap-4">
              {leetcode?.languages.map((language) => (
                <div key={language.language}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{language.language}</span>
                    <span>{language.problemsSolved}</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${(language.problemsSolved / leetcode.solved) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contest */}
          <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 p-4">
            <h3 className="mb-2 text-lg font-semibold text-white">Contest</h3>

            {/* Contest Stats */}
            <div className="grid grid-cols-2 gap-3">
              {/* Rating */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-xl font-semibold text-white">
                  Rating: {leetcode?.contest?.rating?.toFixed(0)}
                </p>
              </div>

              {/* Global Ranking */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-xl font-semibold text-white">
                  Global Ranking:{" "}
                  {leetcode?.contest?.globalRanking?.toLocaleString()}
                </p>
              </div>

              {/* Top Percentage */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-xl font-semibold text-white">
                  Top Percentage: {leetcode?.contest?.topPercentage}%
                </p>
              </div>

              {/* Contests Attended */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="text-xl font-semibold text-white">
                  Contests Attended: {leetcode?.contest?.attended}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
