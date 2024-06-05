// Get all currency input elements
const currencies = document.querySelectorAll(".currency");

// Function to update currency values
function updateCurrencies(sourceCurrency) {
  const sourceValue = parseFloat(sourceCurrency.value);
  if (isNaN(sourceValue)) return 0;

  const sourcePerGem = parseFloat(sourceCurrency.dataset.pergem);

  // Convert source currency value to gems
  const gemsValue = sourceValue / sourcePerGem;

  // Update other currency fields based on the gems value
  currencies.forEach((currency) => {
    if (currency !== sourceCurrency) {
      const perGem = parseFloat(currency.dataset.pergem);
      currency.value = (gemsValue * perGem).toFixed();
    }
  });
}

// Add event listeners to all currency input fields
currencies.forEach((currency) => {
  currency.addEventListener("input", () => updateCurrencies(currency));
});
