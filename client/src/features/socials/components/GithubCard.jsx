import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { useGithub } from "../hooks/useSocials";
import Heatmap from "./Heatmap";
import Button from "../../../shared/components/ui/Button";

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
            {github?.username}
          </h2>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{github?.publicRepos}</p>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Repositories
          </p>
        </div>

        {/* Right */}
        <Button
          variant="primary"
          icon={ExternalLink}
          iconPosition="right"
          href={github?.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </Button>
      </header>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-212.5 max-w-full">
          <Heatmap heatmap={github?.heatmap ?? []} />
        </div>
      </div>
    </div>
  );
}
