export default function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        {description && <p className="mt-1 text-slate-500">{description}</p>}
      </div>

      {actions}
    </div>
  );
}
