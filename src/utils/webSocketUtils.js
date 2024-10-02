export const connectWebSocket = (
  selectedCoin,
  selectedInterval,
  setChartData
) => {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@kline_${selectedInterval}`
  );

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const { t: time, o: open, h: high, l: low, c: close } = message.k;

    setChartData((prevData) => {
      const newData = { ...prevData };
      if (!newData[selectedCoin]) {
        newData[selectedCoin] = {};
      }
      if (!newData[selectedCoin][selectedInterval]) {
        newData[selectedCoin][selectedInterval] = [];
      }

      newData[selectedCoin][selectedInterval].push({
        time,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
      });

      // Keep only the last 100 candles
      if (newData[selectedCoin][selectedInterval].length > 100) {
        newData[selectedCoin][selectedInterval] =
          newData[selectedCoin][selectedInterval].slice(-100);
      }

      return newData;
    });
  };

  return ws;
};
