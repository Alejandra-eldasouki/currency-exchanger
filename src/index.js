import './css/styles.css';
require('dotenv').config();

const form = document.getElementById('currencyForm');
const results = document.getElementById('result');
const amountDiv = document.getElementById('amount').value;
const currencySlc = document.getElementById('currency').value;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = amountDiv.value;
  const currency = currencySlc.value;
  const API_KEY = 'ebd3d8658766aa1602f1723a';
  const API_URL =
    'https://v6.exchangerate-api.com/v6/ebd3d8658766aa1602f1723a/latest/USD';

  // Fetch exchange rates
  fetch(`${API_URL}?api_key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === 'error') {
        showError(data['error-type']);
      } else {
        const rates = data.rates;
        if (currency in rates) {
          const rate = rates[currency];
          const convertedAmount = amount * rate;
          showResult(convertedAmount, currency);
        } else {
          showError(`Currency ${currency} does not exist.`);
        }
      }
    })
    .catch((error) => {
      showError('An error occurred while fetching the exchange rates.');
      console.log(error);
    });
});

function showResult(amount, currency) {
  results.textContent = `${amount.toFixed(2)} ${currency}`;
}

function showError(message) {
  results.textContent = `Error: ${message}`;
}
