import React, { useEffect, useState } from "react"
import "./App.css"
import CurrencyRow from "./CurrencyRow"

function App() {
  const BASE_URL = "https://api.exchangeratesapi.io/latest"
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState(1)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    fromAmount = amount / exchangeRate
    toAmount = amount
  }
  // load rates from api and store them
  useEffect(() => {
    async function fetchRates() {
      await fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log("data:", data)
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base)

          const firstCurrency = Object.keys(data.rates)[0]
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        })
    }
    fetchRates()
  }, [])

  // Onchange of option --> set new exchange rate
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbol=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency])
        })
    }
  }, [fromCurrency, toCurrency])

  // Onchange input amount --> setAmount and toggle flag to know which 'from/to' is changed
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className=''>
      <h1> {`Convert ${fromCurrency} to ${toCurrency}`}</h1>
      <CurrencyRow
        options={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => {
          setFromCurrency(e.target.value)
          setExchangeRate(e.target.value)
        }}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        options={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount.toFixed(4)}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  )
}

export default App
