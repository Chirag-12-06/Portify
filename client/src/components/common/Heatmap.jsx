export default function Heatmap({heatmap}) {
  const getColor = (count) => {
    switch (count) {
      case 0:
        return "bg-slate-800";
      case 1:
        return "bg-green-900";
      case 2:
        return "bg-green-700";
      case 3:
        return "bg-green-500";
      default:
        return "bg-green-300";
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Grid */}
      <div >
        <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
          {heatmap.map((day) => (
            <div
              key={day.id}
              className={`h-3 w-3 rounded-xs ${getColor(day.count)}`}
            />
          ))}
        </div>

        {/* Months */}
        <div className="mt-4 flex justify-between text-xs text-slate-400 px-1">
          {[
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
          ].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
