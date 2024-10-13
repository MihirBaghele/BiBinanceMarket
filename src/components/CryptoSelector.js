// src/components/CryptoSelector.js

import React from 'react';

const CryptoSelector = ({ selectedCrypto, onCryptoChange }) => {
  const cryptocurrencies = [
    { label: 'ETH/USDT', value: 'ethusdt' },
    { label: 'BNB/USDT', value: 'bnbusdt' },
    { label: 'DOT/USDT', value: 'dotusdt' },
  ];

  return (
    <select value={selectedCrypto} onChange={(e) => onCryptoChange(e.target.value)}>
      {cryptocurrencies.map((crypto) => (
        <option key={crypto.value} value={crypto.value}>
          {crypto.label}
        </option>
      ))}
    </select>
  );
};

export default CryptoSelector;
