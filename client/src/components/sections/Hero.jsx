import { hero } from "../../data/portfolio";
import Section from "../../components/common/Section";

export default function Hero() {
  return (
    <Section
      id="hero"
    >
      {/* Hero Content */}
      <div>
        <p className="text-lg text-gray-500">{hero.greeting}</p>

        <h1 className="mt-2 text-5xl font-bold">
          {hero.name}
        </h1>

        <h2 className="mt-3 text-2xl text-gray-600">
          {hero.title}
        </h2>

        <p className="mt-6 max-w-2xl text-gray-500">
          {hero.description}
        </p>
      </div>
    </Section>
  );
}