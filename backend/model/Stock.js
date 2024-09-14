const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    ticker: String,
    data: Object,
    timestamp: { type: Date, require: true }
});

module.exports = mongoose.model('Stock', stockSchema);