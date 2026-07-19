export default function Section({ id, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-12 pb-5">
        {title && (
          <header data-section-heading className="flex justify-center mb-5">
            <h1 className="text-5xl font-bold">{title}</h1>
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
