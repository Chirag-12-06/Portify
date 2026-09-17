import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { useGithub } from "../hooks/useSocials";
import Heatmap from "./Heatmap";
import Button from "../../../shared/components/ui/Button";
import ContributionActivity from "./ContributionActivity";

export default function GithubCard() {
  const { data: github } = useGithub();

  return (
    <div className="flex flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">
      <header className="flex items-center justify-between border-b border-slate-700 p-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2">
            <FaGithub className="h-7 w-7 text-white" />
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

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[2fr_5fr]">
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
        <div className="rounded-2xl border border-slate-700 bg-slate-950/30 p-6">
          <h3 className="text-lg font-semibold text-white">
            Contribution Activity
          </h3>

          <div className="mt-4">
            <ContributionActivity contributions={github?.contributions} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-212.5 max-w-full">
          <Heatmap heatmap={github?.heatmap ?? []} />
        </div>
      </div>
    </div>
  );
}
