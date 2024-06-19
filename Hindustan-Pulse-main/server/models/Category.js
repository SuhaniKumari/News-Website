const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        set: function (value) {
            return value.toLowerCase();
        }
    }
})

module.exports = mongoose.model('Category', categorySchema);