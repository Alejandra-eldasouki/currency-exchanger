import './css/styles.css';
require('dotenv').config();

const API_KEY = 'ebd3d8658766aa1602f1723a';
const API_URL = 'https://v6.exchangeratesapi.io/latest';
const form = document.getElementById('currencyForm');
const results = document.getElementById('result');
const amountDiv = document.getElementById('amount').value;
const currencySlc = document.getElementById('currency').value;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = amountDiv.value;
  const currency = currencySlc.value;

  fetch(`${API_URL}?base=USD&access_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        showError(data.error);
      } else {
        if (currency in data.rates) {
          const rate = data.rates[currency];
          const convertedAmount = amount * rate;
          showResult(convertedAmount, currency);
        } else {
          showError(`Currency ${currency} is not available.`);
        }
      }
    })
    .catch((error) => {
      showError('An error has ocurred while fetching the rates.');
      console.log(error);
    });
});

function showResult(amount, currency) {
  results.textContent = `${amount.toFixed(2)} ${currency}`;
}

function showError(message) {
  results.textContent = `Error: ${message}`;
}
