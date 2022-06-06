import React, { useEffect, useState } from "react";

export default function Currency() {
  const apiKey = "3320f36a89bf3fce8cc4b5b1";
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  const CONVERT_URL = `GET https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log("exchangeRate : " + exchangeRate);
  console.log("from : " + from);
  console.log("to : " + to);
  console.log("amount : " + amount);
  console.log("amountInFromCurrency : " + amountInFromCurrency);
  console.log("currencyOptions : " + currencyOptions);

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
        console.log(data.conversion_rates);
        const firstCurrency = Object.keys(data.conversion_rates)[0];
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setFrom(data.conversion_rates);
        setTo(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]);
      });
  }, [BASE_URL]);

  useEffect(() => {
    if (from != null && to != null) {
      fetch(`${CONVERT_URL}/${from}/${to}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setExchangeRate(data.conversion_rates[to]);
        });
    }
  }, [from, CONVERT_URL, to]);

  return (
    <div className="counter-container">
      <div className="text-box">
        <div className="inputarea">
          <div className="navbar-container">
            <h2>CURRENCY COUNTER</h2>
          </div>
          <div className="from">
            <input
              type={"number"}
              placeholder="enter amount"
              value={fromAmount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountInFromCurrency(true);
              }}
            />
            <select
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            >
              {currencyOptions.map((item) => (
                <option value={item} key={item + Math.random()}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <h1>=</h1>
          <div className="to">
            <input
              type={"number"}
              placeholder="enter amount"
              value={toAmount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountInFromCurrency(false);
              }}
            />
            <select
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            >
              {currencyOptions.map((item) => (
                <option value={item} key={item + Math.random}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
