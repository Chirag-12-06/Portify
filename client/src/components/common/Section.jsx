export default function Section({
  id,
  title,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`min-h-screen px-12 pt-28 pb-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <header
    data-section-heading
    className="text-center mb-20"
>
    <h1 className="text-5xl font-bold">
        {title}
    </h1>
</header>

        {children}
      </div>
    </section>
  );
}
