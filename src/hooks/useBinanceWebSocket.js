// src/hooks/useBinanceWebSocket.js

import { useState, useEffect } from 'react';

const useBinanceWebSocket = (symbol, interval) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candlestick = message.k;

      if (candlestick.x) {  // Only push completed candlesticks
        setData((prevData) => [
          ...prevData,
          [
            candlestick.t,  // Timestamp
            candlestick.o,  // Open
            candlestick.h,  // High
            candlestick.l,  // Low
            candlestick.c,  // Close
            candlestick.v   // Volume
          ]
        ]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return data;  // Return the fetched data
};

export default useBinanceWebSocket;
