const CELL_SIZE = 12;
const CELL_GAP = 4;

export default function Heatmap({ heatmap }) {
  
  const getLast12Months = () => {
  const months = [];

  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    months.push(
      date.toLocaleString("en-US", {
        month: "short",
      })
    );
  }

  return months;
};

  const months = getLast12Months();
  
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

  const weeks = Math.max(Math.ceil(heatmap.length / 7), 1);
  const gridWidth = weeks * CELL_SIZE + (weeks - 1) * CELL_GAP;

  // const months = [
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  // ];

  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="grid grid-flow-col grid-rows-7 gap-1"
          style={{ width: gridWidth }}
        >
          {heatmap.map((count, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-xs ${getColor(count)}`}
            />
          ))}
        </div>

        <div
          className="mt-4 flex justify-between text-xs text-slate-400"
          style={{ width: gridWidth }}
        >
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}