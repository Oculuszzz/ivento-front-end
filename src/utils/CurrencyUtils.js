// Create our number formatter.
const currencyFormatter = new Intl.NumberFormat("ms-MY", {
  style: "currency",
  currency: "MYR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const convertNumberToDecimal = (number) => {
  try {
    // Convert number to float - 2 decimal point
    return (number / 100).toFixed(2);
  } catch (error) {
    console.log(`Failed to convert number to decimal - ${error}`);
    return (0).toFixed(2);
  }
};

export const convertDecimalToNumber = (number) => {
  try {
    // Convert number to float - 2 decimal point
    return (number * 100).toFixed();
  } catch (error) {
    console.log(`Failed to convert number to decimal - ${error}`);
    return 0;
  }
};

export const convertNumberToCurrency = (number) => {
  try {
    // Convert number to float - 2 decimal point
    const floatNum = (number / 100).toFixed(2);

    return currencyFormatter.format(floatNum);
  } catch (error) {
    console.log(`Failed to convert number to decimal - ${error}`);
    return (0).toFixed(2);
  }
};
