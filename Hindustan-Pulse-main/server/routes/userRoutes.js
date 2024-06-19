const express = require('express');
const router = express.Router();

//  Import controllers
const { signup, signin, updateUser, promoteUser, demoteUser, bannedUser, deleteUser, getUser, getToken, createRequest, deleteRequest, getAllUsers } = require('../controllers/userController');

//  Import middlewares
const { authN } = require('../middlewares/authN');
const { adminCheck, viewerCheck } = require('../middlewares/authZ');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getToken', authN, getToken);
router.get('/getUser', authN, getUser);
router.post('/updateUser', authN, updateUser);
router.post('/deleteUser', authN, deleteUser);
router.post('/createRequest', authN, viewerCheck, createRequest)
router.post('/getAllUsers', authN, adminCheck, getAllUsers)
router.post('/deleteRequest', authN, adminCheck, deleteRequest)
router.post('/promoteUser', authN, adminCheck, promoteUser)
router.post('/demoteUser', authN, adminCheck, demoteUser);
router.post('/bannedUser', authN, adminCheck, bannedUser);

module.exports = router;