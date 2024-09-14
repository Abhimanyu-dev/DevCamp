const express = require("express")
const Stock = require("../model/Stock")

const router = express.Router()

router.get("/:ticker/:date", async (req, res) => {
    const { ticker, date } = req.params
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate + 1)

    try {
        const stock = await Stock.find({
            ticker,
            timeStamp: { $gte: startDate, $lt: endDate }
        })
        res.json(stock)
    } catch (error) {
        res.status(500).send({ error: "Error fetching stock data" })
    }
})

router.get("/:ticker", async (req, res) => {
    const { ticker } = req.params

    try {
        const stock = await Stock.findOne({ ticker }).sort({ timeStamp: -1 })
        res.send(stock)
    } catch (error) {
        res.status(500).send({ error: "Error fetching stock" })
    }
})

router.get("/", async (req, res) => {
    try {
        const stocks = await Stock.find({})
        res.send(stocks)
    } catch (error) {
        res.status(500).send({ error: "Error fetching stocks" })
    }
})

module.exports = router