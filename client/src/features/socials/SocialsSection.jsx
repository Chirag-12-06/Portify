import Section from "../../shared/components/common/Section";
import LeetCodeCard from "./components/LeetCodeCard";
import GithubCard from "./components/GithubCard";

export default function Socials() {
  return (
    <Section id="socials" title="Socials">
      <LeetCodeCard />
      <GithubCard />
    </Section>
  );
}
