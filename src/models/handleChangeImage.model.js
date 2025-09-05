const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String, // URL বা ফাইল path
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('handleChangeImage', imageSchema);
