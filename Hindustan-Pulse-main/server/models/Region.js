const mongoose = require('mongoose');

const regionSchema = new      mongoose.Schema({
    region: {
        type: String,
        required: true,
        set: function (value) {
            return value.toLowerCase();
        }
    }
})

module.exports = mongoose.model('Region', regionSchema);;