import Section from "../../common/Section";
import LeetCodeCard from "./LeetCodeCard";
import GithubCard from "./GithubCard";

export default function Socials() {
  return (
    <Section id="socials" title="Socials">
      <LeetCodeCard />
      <GithubCard />
    </Section>
  );
}
