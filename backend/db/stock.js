const axios = require("axios")
const Stock = require("../model/Stock")
const stocks = require("../data")

const fetchStockData = async (ticker) => {
    try {
        const response = await axios.get(
            `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1m&range=1d`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error.message);
    }
};

const saveStockData = async (ticker) => {
    const stockData = await fetchStockData(ticker);
    if (stockData) {
        const now = new Date();
        const timestamp = new Date(now.setHours(0, 0, 0, 0))
        await Stock.deleteOne({ ticker, timestamp })
        const stock = new Stock({ ticker, data: stockData, timestamp })
        await stock.save();
        console.log(`${ticker} data saved`);
    }
};

const updateStockData = () => {
    stocks.forEach((stock) => {
        saveStockData(stock)
    })
}

module.exports = updateStockData;