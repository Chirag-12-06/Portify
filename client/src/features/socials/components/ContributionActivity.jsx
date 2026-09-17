import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ContributionActivity = ({ contributions }) => {
  const monthlyData = contributions?.contributionsByMonth ?? {};

  const labels = Object.keys(monthlyData).map((month) => {
    const [year, monthNumber] = month.split("-");

    return new Date(year, monthNumber - 1).toLocaleString("en-US", {
      month: "short",
    });
  });

  const values = Object.values(monthlyData);

  const data = {
    labels,
    datasets: [
      {
        label: "Contributions",
        data: values,
        backgroundColor: "#22c55e",
        borderRadius: 5,
        barThickness: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} contributions`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#94a3b8",
        },

        border: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(148, 163, 184, 0.08)",
        },

        ticks: {
          color: "#94a3b8",
          precision: 0,
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[220px] w-full">
      <Bar data={data} options={options} className="color-green" />
    </div>
  );
};

export default ContributionActivity;
