/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData, selectedCoin, selectedInterval }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        ticks: {
          maxTicksLimit: 10,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxHeight: 12,
          boxWidth: 12,
          color: "white",
        },
      },
      title: {
        display: true,
        text: `${selectedCoin} - ${selectedInterval}`,
        font: {
          size: 12,
          weight: "bold",
          color: "rgb(255, 255, 255)",
        },
      },
    },
  };

  return (
    <div
      className="border rounded-lg overflow-hidden bg-slate-800 border-slate-700"
      style={{ height: "400px" }}
    >
      <Line
        options={chartOptions}
        data={{
          ...chartData,
          datasets: chartData.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor:
              index === 0
                ? "rgb(75, 192, 192)"
                : index === 1
                ? "rgb(255, 99, 132)"
                : "rgb(54, 162, 235)",
            backgroundColor: "rgba(0, 0, 0, 0)",
          })),
        }}
      />
    </div>
  );
};

export default Chart;
