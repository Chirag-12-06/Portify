import Card from "../../../components/ui/Card";

export default function StatsCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>
      </div>

      {Icon && (
        <div className="rounded-lg bg-slate-100 p-3">
          <Icon className="h-6 w-6 text-slate-700" />
        </div>
      )}
    </Card>
  );
}