const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const verifyMail = require('../mails/verify');
const resetMail = require('../mails/reset');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['reset', 'verification'],
        default: 'verification'
    },
    expirationDate: {
        type: Date,
        required: true,
        index: true,
        expireAfterSeconds: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900
    }
})

tokenSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });
tokenSchema.post('save', async function () {
    await this.constructor.populate(this, { path: 'user' });
    if (this.type === 'verification') {
        mailSender(this.user.email, 'Verify your account', verifyMail(this.token));
    } else {
        mailSender(this.user.email, 'Reset your password', resetMail(this.token));
    }
});

module.exports = mongoose.model('Token', tokenSchema);