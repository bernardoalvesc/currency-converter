import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flag from 'react-world-flags';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        
        if (rate) {
          setConversionRate(rate);
        } else {
          setConversionRate(null); 
        }
      } catch (error) {
        console.error("Erro ao buscar taxa de conversão:", error);
        setConversionRate(null);
      }
    };

    fetchConversionRate();
  }, [fromCurrency, toCurrency]); 

  const convertCurrency = () => {
    if (conversionRate && !isNaN(amount)) {
      setConvertedAmount((amount * conversionRate).toFixed(2)); // Formata com 2 casas decimais
    } else {
      setConvertedAmount('Invalid input or no rate available');
    }
  };

  const currencies = [
    { code: 'USD', flag: 'US', name: 'US Dollar' },
    { code: 'EUR', flag: 'EU', name: 'Euro' },
    { code: 'GBP', flag: 'GB', name: 'British Pound' },
    { code: 'BRL', flag: 'BR', name: 'Brazilian Real' },
    { code: 'JPY', flag: 'JP', name: 'Japanese Yen' },
    { code: 'AUD', flag: 'AU', name: 'Australian Dollar' },
    { code: 'CAD', flag: 'CA', name: 'Canadian Dollar' },
    { code: 'CHF', flag: 'CH', name: 'Swiss Franc' },
    { code: 'INR', flag: 'IN', name: 'Indian Rupee' },
    { code: 'MXN', flag: 'MX', name: 'Mexican Peso' },
    { code: 'CNY', flag: 'CN', name: 'Chinese Yuan' },
    { code: 'SEK', flag: 'SE', name: 'Swedish Krona' },
    { code: 'NZD', flag: 'NZ', name: 'New Zealand Dollar' },
    { code: 'ZAR', flag: 'ZA', name: 'South African Rand' },
    { code: 'KRW', flag: 'KR', name: 'South Korean Won' },
    { code: 'HKD', flag: 'HK', name: 'Hong Kong Dollar' },
    { code: 'SGD', flag: 'SG', name: 'Singapore Dollar' },
    { code: 'TRY', flag: 'TR', name: 'Turkish Lira' },
    { code: 'PLN', flag: 'PL', name: 'Polish Zloty' },
    { code: 'DKK', flag: 'DK', name: 'Danish Krone' },
    { code: 'NOK', flag: 'NO', name: 'Norwegian Krone' },
    { code: 'ILS', flag: 'IL', name: 'Israeli New Shekel' },
    { code: 'MYR', flag: 'MY', name: 'Malaysian Ringgit' },
    { code: 'PHP', flag: 'PH', name: 'Philippine Peso' }
  ];

  return (
    <div className="container">
      <h1 className="text-center text-3xl font-semibold my-4">Currency Converter</h1>
      
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 w-full"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} <Flag code={currency.flag} style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 w-full"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} <Flag code={currency.flag} style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={convertCurrency}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Convert
      </button>

      {convertedAmount !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Converted Amount: {convertedAmount}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Converter;
