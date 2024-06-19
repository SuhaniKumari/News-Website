const { customError, failed } = require('../utils/errorHandler');
const User = require('../models/User')

//  Is Admin
exports.adminCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id }, { userType: 1 });
        if (user.userType === 'admin') {
            next();
        } else {
            throw customError('Invalid Access', 400);
        }
    } catch (err) {
        failed(res, err);
    }
}
//  Is Viewer
exports.viewerCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id }, { userType: 1 });
        if (user.userType === 'viewer' || user.userType === 'creator' || user.userType === 'admin') {
            next();
        } else {
            throw customError('Invalid Access', 400);
        }
    } catch (err) {
        failed(res, err);
    }
}
//  Is Editor
exports.creatorCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id }, { userType: 1 });
        if (user.userType === 'creator' || user.userType === 'admin') {
            next();
        } else {
            throw customError('Invalid Access', 400);
        }
    } catch (err) {
        failed(res, err);
    }
}