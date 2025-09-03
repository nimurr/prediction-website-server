// models/Ad.js
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    adsImage: { type: String },
    adsLink: { type: String },
    adsTitle: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Ads', adSchema);
