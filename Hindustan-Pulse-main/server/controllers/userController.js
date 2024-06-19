const { failed, customError } = require("../utils/errorHandler")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        //  Fetching
        const { fullname, email, password } = req.body;

        //  Validation
        if (!fullname || !email || !password || fullname.length === 0 || email.length === 0 || password.length < 8) {
            throw customError('Please enter the details correctly', 401);
        }
        const find = await User.findOne({ email })
        if (find) {
            throw customError('This email is already registered', 402);
        }

        //  Perform task
        const hashPassword = await bcrypt.hash(password, 10);
        const userObj = new User({
            fullname, email, password: hashPassword,
        })
        await userObj.save();

        //  Send Response
        res.status(200).json({
            success: true,
            message: 'Signup successfully'
        })
    } catch (err) {
        failed(res, err)
    }
}

const signin = async (req, res) => {
    try {
        //  Fetching
        const { email, password } = req.body;

        //  Validation
        if (!email || !password || email.length === 0 || password.length === 0) {
            throw customError('Please enter the details correctly', 404);
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw customError('User does not exist', 404);
        }
        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            throw customError("Password doesn't match", 404);
        }
        if (user.isBanned) {
            throw customError("User account is suspended", 400);
        }

        //  Perform task
        await User.findByIdAndUpdate(user._id, { lastLogin: Date.now() });
        const payload = {
            id: user._id,
            name: user.fullname,
            email: user.email,
            userType: user.userType,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d'
        })


        //  Send Response
        res.cookie('token', token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        }).status(200).json({
            success: true,
            message: 'Signin successfully',
            token
        })
    } catch (err) {
        failed(res, err)
    }
}

const getToken = async (req, res) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation")?.replace("Bearer ", "");

        if (!token) throw customError('No token found', 404);

        res.status(200).json({
            success: true,
            message: "Successfully get the token",
        })
    } catch (err) {
        failed(res, err);
    }
}

const getUser = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.user;

        //  Validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user");
        }
        if (user.isBanned) {
            throw customError("You are banned !!!");
        }

        const payload = {
            fullname: user.fullname,
            email: user.email,
            verified: user.isVerified,
            role: user.userType,
        }

        //  Performing the task
        res.status(200).json({
            success: true,
            message: "Fetched user successfully",
            user: payload,
        })
    } catch (err) {
        failed(res, err);
    }
}

const updateUser = async (req, res) => {
    try {
        //  Fetching
        const { fullname } = req.body;
        const { id } = req.user;

        //  Validation
        if (!fullname) {
            throw customError("No field is updated", 402);
        }
        if (fullname && fullname.length === 0) {
            throw customError("Fullname can't be empty", 401);
        }

        //  Performing task
        if (fullname) {
            await User.findByIdAndUpdate(id, { fullname });
        }

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully updated the user"
        })
    } catch (err) {
        failed(res, err);
    }
}

const createRequest = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);

        if (!user) {
            throw customError("Unable to find user", 404);
        }
        if (user.userType !== 'viewer') {
            throw customError("User is already creator", 400);
        }
        if (!user.isVerified) {
            throw customError("User is note verifed", 401);
        }
        if (user.isRequested) {
            throw customError("User is already requested", 400);
        }
        if (user.isBanned) {
            throw customError("Banned user are not allowed for creator", 405);
        }

        await User.findByIdAndUpdate(id, { isRequested: true });

        res.status(200).json({
            success: true,
            message: "Successfully applied for creator"
        })
    } catch (err) {
        failed(res, err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.user;
        const { type } = req.body;

        //  Validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user", 401);
        }
        if (user.userType !== 'admin') {
            throw customError("User is not authorized", 400);
        }
        const query = { _id: { $ne: id } };
        query.isBanned = false;
        if (type) {
            query.isVerified = true;
            if (type === 'request') {
                query.isRequested = true;
                query.userType = 'viewer';
            }
            if (type === 'creator') {
                query.userType = 'creator';
            }
        }

        const users = await User.find(query);

        res.status(200).json({
            success: true,
            message: "Successfully get the users",
            users
        })
    } catch (err) {
        failed(res, err);
    }
}

const getRequest = async (req, res) => {
    try {
        const users = await User.find({ isRequesed: true });

        res.status(200).json({
            success: true,
            message: "Successfully get the request",
            users
        })
    } catch (err) {
        failed(res, err);
    }
}

const deleteRequest = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;

        //  validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user", 404);
        }
        if (user.userType === 'creator') {
            throw customError("User already creator", 401);
        }
        if (!user.isRequested) {
            throw customError("User is not requested", 401);
        }

        //  Perform Task
        await User.findByIdAndUpdate(id, { isRequested: false });

        //  Response
        res.status(200).json({
            success: true,
            message: "User rejected successfully"
        })
    } catch (err) {
        failed(res, err);
    }
}

const promoteUser = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;

        //  validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user", 404);
        }
        if (user.userType === 'creator') {
            throw customError("User already creator", 401);
        }

        //  Perform Task
        await User.findByIdAndUpdate(id, { userType: 'creator' });

        //  Response
        res.status(200).json({
            success: true,
            message: "User promoted successfully"
        })
    } catch (err) {
        failed(res, err);
    }
}

const demoteUser = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;

        //  validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user", 404);
        }
        if (user.userType === 'viewer') {
            throw customError("User already viewer", 401);
        }

        //  Perform Task
        await User.findByIdAndUpdate(id, { userType: 'viewer' });

        //  Response
        res.status(200).json({
            success: true,
            message: "User demoted successfully"
        })
    } catch (err) {
        failed(res, err);
    }
}

const bannedUser = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;

        //  validation
        const user = await User.findById(id);
        if (!user) {
            throw customError("Unable to find the user", 404);
        }
        if (user.isBanned) {
            throw customError("User already banned", 401);
        }

        //  Perform Task
        await User.findByIdAndUpdate(id, { isBanned: true });

        //  Response
        res.status(200).json({
            success: true,
            message: "User banned successfully"
        })
    } catch (err) {
        failed(res, err);
    }
}

const deleteUser = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;

        //  Perform Task
        await User.findByIdAndDelete(id)

        //  Response
        res.status(200).json({
            success: true,
            message: "User banned successfully"
        })
    } catch (err) {
        failed(res, err);
    }
}


exports.signup = signup;
exports.signin = signin;
exports.getToken = getToken;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
exports.createRequest = createRequest;
exports.getRequest = getRequest;
exports.deleteRequest = deleteRequest
exports.promoteUser = promoteUser;
exports.demoteUser = demoteUser;
exports.bannedUser = bannedUser;
exports.deleteUser = deleteUser;