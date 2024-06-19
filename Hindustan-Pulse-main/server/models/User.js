const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const welcomeMail = require('../mails/welcome');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isRequested: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        enum: ['admin', 'creator', 'viewer'],
        default: 'viewer',
        required: true,
    }
})

userSchema.post('save', async () => {
    await mailSender(this.email, 'Welcome to Hindustan Pulse', welcomeMail(this.fullname));
})

module.exports = mongoose.model('User', userSchema);;