module.exports.handleZerodhaHoldings = function (holdings): object {
  const formattedHoldings: Array<object> = [];
  for (let i = 0; i < holdings.length; i += 1)
    formattedHoldings.push(
      {
        name: holdings[i].Instrument,
        avg: holdings[i].Avg[" cost"],
        marketPrice: holdings[i].LTP,
        qty: holdings[i]["Qty."]
      },
    )

  return formattedHoldings;
}

module.exports.handleGrowwHoldings = function (holdings): object {
  return {}
}

module.exports.getPercentage = function (total: number, value: number): string {
  return ((value / total) * 100).toFixed(2);
};