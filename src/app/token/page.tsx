'use client';

import React, { useState, useEffect } from 'react';
import data from './file.json';

interface CurrencyData {
  currency: string;
  date: string;
  price: number;
}

const SwapForm: React.FC = () => {
  const [currencies, setCurrencies] = useState<{ [key: string]: number }>({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    // Process data to get latest price for each currency
    const latestPrices: { [key: string]: number | string } = {};
    data.forEach((item: CurrencyData) => {
      if (!latestPrices[item.currency] || new Date(item.date) > new Date(latestPrices[item.currency + '_date'] as string || '0')) {
        latestPrices[item.currency] = item.price;
        latestPrices[item.currency + '_date'] = item.date;
      }
    });
    // Remove date keys
    const cleanCurrencies: { [key: string]: number } = {};
    Object.keys(latestPrices).forEach(key => {
      if (!key.endsWith('_date')) {
        cleanCurrencies[key] = latestPrices[key] as number;
      }
    });
    setCurrencies(cleanCurrencies);
    // Set default from and to
    const currencyList = Object.keys(cleanCurrencies);
    if (currencyList.length > 1) {
      setFromCurrency(currencyList[0]);
      setToCurrency(currencyList[1]);
    }
  }, []);

  
  useEffect(()=>{
const handleSwap = () => {
  // console.log(currencies)
    if (fromCurrency && toCurrency && amount > 0 && currencies[fromCurrency] && currencies[toCurrency]) {
      const priceFrom = currencies[fromCurrency];
      const priceTo = currencies[toCurrency];
      setResult(amount * (priceFrom / priceTo));
    }
  };
  handleSwap()
  },[fromCurrency,toCurrency,amount,currencies])

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Currency Swap Form</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(currencies).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(currencies).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>
      {/* <button onClick={handleSwap} style={{ marginBottom: '10px' }}>Swap</button> */}
      <div>
        <p>Result: {result.toFixed(6)} {toCurrency}</p>
      </div>
    </div>
  );
};

export default function Page() {
  return <SwapForm />;
}
