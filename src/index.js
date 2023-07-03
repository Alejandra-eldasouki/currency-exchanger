import './css/styles.css';
// require('dotenv').config();

const form = document.getElementById('currencyForm');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = amountInput.value;
  const currency = currencySelect.value;

  const API_KEY = 'YOUR_API_KEY';
  const API_URL = `https://api.exchangerate-api.com/v4/latest/USD`;

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
        if (rates && currency in rates) {
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
      // eslint-disable-next-line no-console
      console.log(error);
    });
});

function showResult(amount, currency) {
  resultDiv.textContent = `${amount.toFixed(2)} ${currency}`;
}

function showError(message) {
  resultDiv.textContent = `Error: ${message}`;
}
