import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import CoinSelector from "./CoinSelector";
import IntervalSelector from "./IntervalSelector";
import Chart from "./Chart";
import { connectWebSocket } from "../utils/webSocketUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Available coins and intervals for selection
const COINS = ["ETHUSDT", "BNBUSDT", "DOTUSDT"];
const INTERVALS = ["1m", "3m", "5m"];

const BinanceMarketData = () => {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [selectedInterval, setSelectedInterval] = useState(INTERVALS[0]);
  const [chartData, setChartData] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    // Retrieve previously stored chart data from local storage
    const storedData = localStorage.getItem("chartData");
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }

    // Establish WebSocket connection for real-time data
    ws.current = connectWebSocket(selectedCoin, selectedInterval, setChartData);

    // Cleanup function to close WebSocket on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [selectedCoin, selectedInterval]);

  useEffect(() => {
    // Store chart data in local storage whenever it changes
    localStorage.setItem("chartData", JSON.stringify(chartData));
  }, [chartData]);

  const handleCoinChange = (coin) => {
    // Handler for coin selection change
    setSelectedCoin(coin);
  };

  const handleIntervalChange = (interval) => {
    // Handler for interval selection change
    setSelectedInterval(interval);
  };

  // Prepare data structure for the chart
  const prepareChartData = () => {
    if (
      !chartData[selectedCoin] ||
      !chartData[selectedCoin][selectedInterval]
    ) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const data = chartData[selectedCoin][selectedInterval];
    return {
      labels: data.map((d) => new Date(d.time).toLocaleTimeString()),
      datasets: [
        {
          label: "Close Price",
          data: data.map((d) => d.close),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "High Price",
          data: data.map((d) => d.high),
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
        {
          label: "Low Price",
          data: data.map((d) => d.low),
          borderColor: "rgb(54, 162, 235)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="p-8 bg-slate-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-stone-50 text-center">
          Binance Market Data
        </h1>
        <div className="bg-slate-900 rounded-lg shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <CoinSelector
              selectedCoin={selectedCoin}
              onCoinChange={handleCoinChange}
              coins={COINS}
            />
            <IntervalSelector
              selectedInterval={selectedInterval}
              onIntervalChange={handleIntervalChange}
              intervals={INTERVALS}
            />
          </div>

          <Chart
            chartData={prepareChartData()}
            selectedCoin={selectedCoin}
            selectedInterval={selectedInterval}
          />
        </div>
      </div>
    </div>
  );
};

export default BinanceMarketData;
