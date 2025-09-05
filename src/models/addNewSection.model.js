const mongoose = require('mongoose');

const addNewSectionSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String, // store URL or file path
    }
}, { timestamps: true });

module.exports = mongoose.model('AddNewSection', addNewSectionSchema);
