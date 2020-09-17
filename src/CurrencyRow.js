import React from "react"

export default function CurrencyRow(props) {
  const {
    name,
    options,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props
  return (
    <div className='container'>
      <label>{name}</label>
      <input
        className='input'
        type='number'
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        name={"currency"}
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
