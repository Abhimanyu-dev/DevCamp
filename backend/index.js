const express = require("express")
const connect = require("./db/mongo")
const updateStockData = require("./db/stock")
const http = require("http")
const socketIO = require("socket.io")
const dotenv = require("dotenv")
const router = require("./routes/routes")
const Stock = require("./model/Stock")
const cors = require("cors")

dotenv.config({ path: "./.env" })

const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = socketIO(server, {
    transports: ['polling'],
    cors: {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    }
})


connect(process.env.MONGOURL)

io.on('connection', async (socket) => {
    console.log("New Client Connected")

    const fetchData = async () => {
        try {
            const latestData = await Stock.find({}).sort({ timestamp: -1 }).limit(50)
            return latestData
        } catch (error) {
            console.log("error: " + error)
        }
    }
    const latestData = await fetchData()
    socket.emit("stockUpdate", latestData)
    setInterval(async () => {
        const latestData = await Stock.find({}).sort({ timestamp: -1 }).limit(50)
        socket.emit("stockUpdate", latestData)
    }, 60000)

    socket.on("disconnect", () => {     
        console.log("Client Disconnected")
    })
})

setInterval(updateStockData, 60000)

app.use("/api/stocks", router)
app.get("/", (req, res) => {
    res.send("HELLO WORLD")
})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`App running on port ${port}`)
})