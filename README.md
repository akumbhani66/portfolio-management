# portfolio-management
Different calculations to analyse portfolio. 

`npm install portfolio-management --save`

* CLI:

```js
const { analyseMyPortFolioCli } = require("portfolio-management");

analyseMyPortFolioCli("path-to-csv.csv", "zerodha")
```

<img width="1035" alt="Screenshot 2022-10-16 at 10 13 40 PM" src="https://user-images.githubusercontent.com/24426308/196047546-f1259918-5f77-449c-a860-8ed2016236c0.png">

* API:

```js
const { analyseMyPortFolio } = require("portfolio-management");

async function calcIt() {
  console.log(await analyseMyPortFolio("path-to-csv.csv", "zerodha"))
}

calcIt();
```

```js
{
  totalInvestment: 52863,
  portfolio: 58289.5,
  statistics: [
    {
      name: 'COALINDIA',
      qty: '75',
      avg: '211',
      marketPrice: '236.35',
      weightage: '30.41%',
      return: '1901.25'
    },
    {
      name: 'COCHINSHIP',
      qty: '30',
      avg: '419.1',
      marketPrice: '521.8',
      weightage: '26.86%',
      return: '3081.00'
    },
    {
      name: 'GAIL',
      qty: '175',
      avg: '85.8',
      marketPrice: '85.15',
      weightage: '25.56%',
      return: '-113.75'
    },
    {
      name: 'GHCL',
      qty: '15',
      avg: '630',
      marketPrice: '667.2',
      weightage: '17.17%',
      return: '558.00'
    }
  ]
}

```

Note: 
* Zerodha holdings only available for now.
* WIP: Groww and brokers parsing 
