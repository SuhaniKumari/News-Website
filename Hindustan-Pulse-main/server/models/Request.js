const mongoose = require('mongoose');

const regionSchema = new      mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Region', regionSchema);;