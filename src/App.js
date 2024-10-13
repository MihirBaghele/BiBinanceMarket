// src/App.js

import React, { useState, useEffect } from 'react';
import CryptoSelector from './components/CryptoSelector';
import TimeframeSelector from './components/TimeframeSelector';
import CandlestickChart from './components/CandlestickChart';
import useBinanceWebSocket from './hooks/useBinanceWebSocket';
import './styles/styles.css';
import LZString from 'lz-string';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState('ethusdt');  // Default to ETH/USDT
  const [selectedInterval, setSelectedInterval] = useState('1m');    // Default to 1 min interval

  // Load stored data from localStorage if available, else use an empty array
  const storedData = localStorage.getItem(selectedCrypto);
  const decompressedData = storedData ? JSON.parse(LZString.decompress(storedData)) : [];
  const [data, setData] = useState(decompressedData);

  // Fetch live data from Binance WebSocket using the custom hook
  const liveData = useBinanceWebSocket(selectedCrypto, selectedInterval);

  useEffect(() => {
    if (liveData.length > 0) {
      setData((prevData) => {
        // Append live data to the existing data, limit to last 200 entries
        const updatedData = [...prevData, ...liveData].slice(-200);

        // Compress data and save to localStorage
        const compressedData = LZString.compress(JSON.stringify(updatedData));
        localStorage.setItem(selectedCrypto, compressedData);

        return updatedData;
      });
    }
  }, [liveData, selectedCrypto]);

  return (
    <div className="App">
      <h1>Binance Market Data</h1>
      <div className="controls">
        <CryptoSelector selectedCrypto={selectedCrypto} onCryptoChange={setSelectedCrypto} />
        <TimeframeSelector selectedInterval={selectedInterval} onIntervalChange={setSelectedInterval} />
      </div>
      <div className="chart-container">
        <CandlestickChart data={data} symbol={selectedCrypto} />
      </div>
    </div>
  );
}

export default App;
