const Table = require('cli-table');

const myStocks = [
    { name: "stockA", avg: 2000, marketPrice: 2000, qty: 5 },
    { name: "stockB", avg: 4000, marketPrice: 2000, qty: 5 },
    { name: "stockC", avg: 4000, marketPrice: 2000, qty: 5 },
]

function analyseMyPortFolio() {
    let totalInvestment: number = 0;
    let portfolio: number = 0;

    const table = new Table({
        head: ['Stock', 'Average Amount', 'Market Price', 'Weightage']
        , colWidths: [50, 50, 50, 50]
    });

    for (let i = 0; i < myStocks.length; i += 1) {
        totalInvestment = totalInvestment + (myStocks[i].avg * myStocks[i].qty);
        portfolio = portfolio + (myStocks[i].marketPrice * myStocks[i].qty);
    }

    for (let i = 0; i < myStocks.length; i += 1)
        table.push(
            [myStocks[i].name, myStocks[i].avg, myStocks[i].marketPrice, `${getPercentage(portfolio, (myStocks[i].marketPrice * myStocks[i].qty))
                }%`]
        );

    console.log(`Total Investment: ${totalInvestment}`);
    console.log(`Current portfolio: ${portfolio}`);
    console.log(table.toString());
}

function getPercentage(total: number, value: number) {
    return ((value / total) * 100).toFixed(2);
};

analyseMyPortFolio();

