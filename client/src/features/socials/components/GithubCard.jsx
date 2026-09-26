import { FaGithub } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import { useGithub } from "../hooks/useSocials";
import Heatmap from "./Heatmap";
import Button from "../../../shared/components/ui/Button";
import ContributionActivity from "./ContributionActivity";

export default function GithubCard() {
  const { data: github } = useGithub();

  return (
    <div className="flex flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">
      <header className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2">
            {github?.profile?.avatarUrl ? (
              <img
                src={github.profile.avatarUrl}
                alt={github?.profile?.username || "GitHub"}
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <FaGithub className="h-7 w-7 text-white" />
            )}
          </div>

          <h2 className="text-xl font-semibold text-white">
            {github?.profile.username}
          </h2>
        </div>

        {/* Right */}
        <Button
          variant="primary"
          icon={ExternalLink}
          iconPosition="right"
          href={github?.profile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[2fr_5fr]">
        {/* Stats */}
        <div className="rounded-2xl border border-slate-700 bg-slate-950/30 p-6">
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <div className="flex items-baseline justify-center gap-3">
              <p className="text-4xl font-bold text-white">
                {github?.profile.publicRepos ?? 0}
              </p>

              <p className="text-lg text-slate-400">Repositories</p>
            </div>

            <div className="flex items-baseline justify-center gap-3">
              <p className="text-4xl font-bold text-white">
                {github?.contributions?.totalContributions ?? 0}
              </p>

              <p className="text-lg text-slate-400">Contributions</p>
            </div>
          </div>
        </div>

        {/* Contribution Activity */}
        <div className="rounded-2xl border border-slate-700 bg-slate-950/30 px-6 py-3">
          <h3 className="text-lg font-semibold text-white">
            Contribution Activity
          </h3>

          <div className="mt-4">
            <ContributionActivity contributions={github?.contributions} />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-700 bg-slate-900 shadow-xl mb-1">
        {/* Top */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="text-3xl font-bold text-white">
              {github?.contributions?.activeDayCount ?? 0}
              <span className="ml-2 text-base font-normal text-slate-400">
                active days this year
              </span>
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-slate-400">Current Streak</p>
              <p className="font-semibold text-white">
                {github?.contributions?.currentStreak ?? 0}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Max Streak</p>
              <p className="font-semibold text-white">
                {github?.contributions?.longestStreak ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="flex justify-center px-6 py-5">
          <div className="w-full max-w-5xl">
            <Heatmap heatmap={github?.heatmap ?? []} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {/* Top Repositories */}
        <div className="rounded-2xl border border-slate-700 bg-slate-950/30 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">Top Repositories</h3>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(github?.repositories?.pinnedRepositories ?? []).map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition hover:bg-white/5"
              >
                <div className="flex items-start gap-3">
                  <RiGitRepositoryLine className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {repo.name}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                      {repo.description || "No description available"}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-2xl border border-slate-700 bg-slate-950/30 px-6 py-3">
          <h3 className="text-lg font-semibold text-white">Languages</h3>

          <div className="mt-2 space-y-4">
            {[...(github?.languages ?? [])]
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 6)
              .map((item) => (
                <div key={item.language}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      {item.language}
                    </span>

                    <span className="text-sm text-slate-400">
                      {item.percentage.toFixed(2)}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
