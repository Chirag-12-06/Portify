import { FaGithub } from "react-icons/fa";
import { useGithub } from "../../../hooks/useSocials";
import Heatmap from "../../common/Heatmap";

export default function GithubCard() {
  const { data: github } = useGithub();

  return (
    <div className="flex flex-col rounded-xl border-amber-600 shadow-md mt-8">
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
        <button
          onClick={() => window.open(github?.profileUrl, "_blank")}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
        >
          View Profile ↗
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-[850px] max-w-full">
          <Heatmap heatmap={github?.heatmap ?? []} />
        </div>
      </div>
    </div>
  );
}
