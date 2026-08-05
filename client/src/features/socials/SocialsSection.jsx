import { SiLeetcode } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

import Section from "../../shared/components/ui/Section";
import LeetCodeCard from "./components/LeetCodeCard";
import GithubCard from "./components/GithubCard";

export default function Socials() {
  return (
    <Section id="socials" title="Socials" maxWidth="max-w-[1600px]">
      <div className="flex flex-col gap-16">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-white">
            <SiLeetcode className="h-6 w-6 text-[#FFA116]" />
            LeetCode
          </h3>

          <LeetCodeCard />
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-white">
            <FaGithub className="h-6 w-6 text-white" />
            GitHub
          </h3>

          <GithubCard />
        </div>
      </div>
    </Section>
  );
}
