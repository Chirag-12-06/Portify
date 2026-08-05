export default function Section({
  id,
  title,
  children,
  className = "",
  maxWidth = "max-w-7xl",
}) {
  return (
    <section id={id} className={`relative bg-slate-950 ${className}`}>
      <div className={`mx-auto px-12 pb-5 ${maxWidth}`}>
        <header data-section-heading className="flex justify-center mb-5">
          <h1 className="text-5xl font-bold">{title}</h1>
        </header>

        <div className="flex justify-center">
          <div className="w-full">
            <div className="flex flex-col gap-5 mt-15 mb-20">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
