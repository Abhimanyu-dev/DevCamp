const mongoose = require("mongoose")

const connect = (url) => {
    mongoose.connect(url, {}).then(() => console.log("MONGO DB connected successfully")).catch((e) => console.log(`Error connecting to mogodb: ${e}`))
}

module.exports = connect