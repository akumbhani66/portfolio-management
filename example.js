const { analyseMyPortFolio, analyseMyPortFolioCli } = require("./dist/index");

// api
async function a() {
  console.log(await analyseMyPortFolio("./holdings.csv", "zerodha"))
}

a();


// Cli
analyseMyPortFolioCli("./holdings.csv", "zerodha")
