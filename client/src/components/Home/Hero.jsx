import { hero } from "../../data/portfolio";

export default function Hero() {
  return (
    <section className="flex min-h-[70vh] items-center">
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
    </section>
  );
}