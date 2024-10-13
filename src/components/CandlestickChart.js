// src/components/CandlestickChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function CandlestickChart({ data, symbol }) {
  const chartData = {
    labels: data.map(d => new Date(d[0]).toLocaleTimeString()),
    datasets: [
      {
        label: `${symbol.toUpperCase()} Price`,
        data: data.map(d => d[4]), // Closing price
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}

export default CandlestickChart;
