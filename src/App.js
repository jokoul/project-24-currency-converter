import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./component/CurrencyRow";

const apiKey = "3320f36a89bf3fce8cc4b5b1";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const CONVERT_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  console.log(currencyOptions);
  console.log(fromCurrency);
  console.log(toCurrency);
  console.log(amount);
  console.log(amountInFromCurrency);
  console.log(exchangeRate);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const euroCurrency = Object.keys(data.conversion_rates)[43];
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setToCurrency(euroCurrency);
        setFromCurrency(data.base_code);
        setExchangeRate(data.conversion_rates[euroCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${CONVERT_URL}/${fromCurrency}/${toCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setExchangeRate(data.conversion_rate);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <h2>=</h2>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
