export default function Section({
  id,
  title,
  children,
  className = "",
  maxWidth = "max-w-7xl",
}) {
  return (
    <section
      id={id}
      className={`relative bg-slate-950 ${className}`}
    >
      <div className={`mx-auto px-12 pb-5 ${maxWidth}`}>
        {title && (
          <header
            data-section-heading
            className="mb-5 flex justify-center"
          >
            <h1 className="text-5xl font-bold">{title}</h1>
          </header>
        )}

        <div className="flex justify-center">
          <div className="w-full">
            <div className="mt-15 mb-20 flex flex-col gap-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}