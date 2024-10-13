// src/components/TimeframeSelector.js

import React from 'react';

const TimeframeSelector = ({ selectedInterval, onIntervalChange }) => {
  const intervals = [
    { label: '1 Minute', value: '1m' },
    { label: '3 Minutes', value: '3m' },
    { label: '5 Minutes', value: '5m' },
  ];

  return (
    <select value={selectedInterval} onChange={(e) => onIntervalChange(e.target.value)}>
      {intervals.map((interval) => (
        <option key={interval.value} value={interval.value}>
          {interval.label}
        </option>
      ))}
    </select>
  );
};

export default TimeframeSelector;
