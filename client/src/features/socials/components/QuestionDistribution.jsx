import { useMemo } from "react";

export default function QuestionDistribution({ easy, medium, hard }) {
  const total = easy + medium + hard;

  const radius = 100;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Leave some gaps between segments
  const gap = 18;
  const usable = circumference - gap * 3;

  const segments = useMemo(() => {
    const values = [
      { value: easy, color: "#14B8A6" }, // Easy
      { value: medium, color: "#FACC15" }, // Medium
      { value: hard, color: "#EF4444" }, // Hard
    ];

    let offset = 0;

    return values.map((item) => {
      const length = (item.value / total) * usable;

      const segment = {
        ...item,
        dashArray: `${length} ${circumference}`,
        dashOffset: -offset,
      };

      offset += length + gap;

      return segment;
    });
  }, [easy, medium, hard]);

  return (
    <div className="flex items-center justify-between rounded-3xl">
      <div className="relative h-56 w-35 ">
        <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="110"
              cy="90"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={segment.dashArray}
              strokeDashoffset={segment.dashOffset}
              className="transition-all duration-1000"
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white">{total}</h2>

          <p className="mt-1 text-lg text-zinc-400">Solved</p>
        </div>
      </div>

      <div className="space-y-3">
        <Stat
          title="Easy"
          value={easy}
          color="text-teal-400"
          bg="bg-teal-500/10 border-teal-500/20"
        />

        <Stat
          title="Medium"
          value={medium}
          color="text-yellow-400"
          bg="bg-yellow-500/10 border-yellow-500/20"
        />

        <Stat
          title="Hard"
          value={hard}
          color="text-red-400"
          bg="bg-red-500/10 border-red-500/20"
        />
      </div>
    </div>
  );
}

function Stat({ title, value, color, bg }) {
  return (
    <div
      className={`flex w-30 items-center justify-between rounded-xl border px-2 py-3 ${bg}`}
    >
      <span className={`text-md font-semibold ${color}`}>{title}</span>

      <span className="text-xl font-bold text-white">{value}</span>
    </div>
  );
}
