export default function Section({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`relative bg-slate-950 ${className}`}>
      <div className="max-w-7xl mx-auto px-12 pb-5">
        <header data-section-heading className="flex justify-center mb-5">
          <h1 className="text-5xl font-bold">{title}</h1>
        </header>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col gap-5 mt-15 mb-20">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
