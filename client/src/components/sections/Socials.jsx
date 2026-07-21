import Section from "../../components/common/Section";
import LeetCodeCard from "./Socials/LeetCodeCard"
import GithubCard from "./Socials/GithubCard"


export default function Socials() {
  return (
    <Section
      id="socials"
      title="Socials"
    >
      <LeetCodeCard />
        <GithubCard />
    </Section>
  );
}