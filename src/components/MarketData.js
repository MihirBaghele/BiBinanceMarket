import React, { useState } from 'react';
import useBinanceWebSocket from '../hooks/useBinanceWebSocket';
import CandlestickChart from './CandlestickChart';

const MarketData = () => {
  const [symbol, setSymbol] = useState('ethusdt'); // Default to ETH/USDT
  const [interval, setInterval] = useState('1m');  // Default to 1 minute interval

  // Get candlestick data for the selected symbol and interval
  const candleData = useBinanceWebSocket(symbol, interval);

  return (
    <div>
      <h1>Binance Market Data</h1>

      {/* Cryptocurrency Selector */}
      <select onChange={(e) => setSymbol(e.target.value)} value={symbol}>
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </select>

      {/* Time Interval Selector */}
      <select onChange={(e) => setInterval(e.target.value)} value={interval}>
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </select>

      {/* Candlestick Chart */}
      <CandlestickChart data={candleData} />
    </div>
  );
};

export default MarketData;
