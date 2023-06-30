import './css/styles.css';
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const form = document.getElementById('currencyForm');
const results = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;
  convertCurrency(amount, currency);
});

async function convertCurrency(amount, currency) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );
    const data = await response.json();

    if (response.ok) {
      const rate = data.coversion_rates[currency];

      if (rate) {
        const convertedAmount = amount * rate;
        results.textContent = `${amount} USD = ${convertedAmount.toFixed(
          2
        )} ${currency}`;
      } else {
        results.textContent = `Currency "${currency}" not found.`;
      }
    } else {
      results.textContent = `Error: ${data.error_type}. ${data.error_message}`;
    }
  } catch (error) {
    results.textContent = 'An error ocurred while fetching the rates';
    console.error(error);
  }
}
