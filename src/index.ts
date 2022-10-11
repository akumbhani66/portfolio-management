const Table = require('cli-table');
const chalk = require('chalk');
const format = require('format-number');
const csv = require('csvtojson');

const {
	handleZerodhaHoldings,
	handleGrowwHoldings,
	getPercentage
} = require('./helpers');

let myStocks = [
	{ name: "TCS", avg: 3071.05, marketPrice: 3118.55, qty: 12 },
	{ name: "Bank of Baroda", avg: 83.02, marketPrice: 132.20, qty: 200 },
	{ name: "Mahindra & Mahindra", avg: 726, marketPrice: 1243.0, qty: 20 },
]

async function analyseMyPortFolio(pathToCsv: string, broker: string) {
	let holdings;
	try {
		holdings = await csv().fromFile(pathToCsv);
	} catch (err) {
		return err;
	}

	switch (broker.toLowerCase()) {
		case "zerodha":
			myStocks = handleZerodhaHoldings(holdings);
			break;

		case "groww":
			myStocks = handleGrowwHoldings(holdings);
			break;
	}

	let totalInvestment: number = 0;
	let portfolio: number = 0;
	let statistics: any = [];

	for (let i = 0; i < myStocks.length; i += 1) {
		totalInvestment = totalInvestment + (myStocks[i].avg * myStocks[i].qty);
		portfolio = portfolio + (myStocks[i].marketPrice * myStocks[i].qty);
	}

	for (let i = 0; i < myStocks.length; i += 1)
		statistics.push(
			{
				name: myStocks[i].name,
				qty: myStocks[i].qty,
				avg: myStocks[i].avg,
				marketPrice: myStocks[i].marketPrice,
				weightage: `${getPercentage(portfolio, (myStocks[i].marketPrice * myStocks[i].qty))}%`,
				return: `${((myStocks[i].marketPrice * myStocks[i].qty) - (myStocks[i].avg * myStocks[i].qty)).toFixed(2)}`
			}
		);

	return { totalInvestment, portfolio, statistics };
}

async function analyseMyPortFolioCli(pathToCsv: string, broker: string) {
	const { totalInvestment, portfolio, statistics } = await analyseMyPortFolio(pathToCsv, broker);

	const table = new Table({
		head: ['Stock', 'Quantity', 'Average Price', 'Market Price', 'Weightage', "Return"]
		, colWidths: [30, 10, 15, 15, 15, 15]
	});

	const formatIt = format({ prefix: `₹` });

	for (let i = 0; i < statistics.length; i += 1) {
		table.push(
			[
				statistics[i].name,
				statistics[i].qty,
				formatIt(statistics[i].avg),
				formatIt(statistics[i].marketPrice),
				`${getPercentage(portfolio, (statistics[i].marketPrice * statistics[i].qty))}%`,
				formatIt(statistics[i].return)
			]
		);
	}

	console.log(chalk.yellow.underline(`Total Investment:`), chalk.blue.bold(`${formatIt(totalInvestment)}`));
	console.log(chalk.yellow.underline(`Current portfolio:`), chalk.blue.bold(`${formatIt(portfolio)}`));
	console.log(
		chalk.yellow(
			`Return: ${totalInvestment > portfolio ?
				chalk.red.bold(`${formatIt(portfolio - totalInvestment)}`) :
				chalk.green.bold(`+${formatIt(portfolio - totalInvestment)}`)
			} `
		)
	);
	console.log(table.toString());
}

export = {
	analyseMyPortFolio: analyseMyPortFolio,
	analyseMyPortFolioCli: analyseMyPortFolioCli
}