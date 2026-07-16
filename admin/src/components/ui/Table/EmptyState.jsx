export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}