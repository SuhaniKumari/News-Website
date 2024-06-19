const express = require('express');
const router = express.Router();

//  Import controllers
const { getAllNews, getNews, updateNews, createNews, deleteNews, getMyNews } = require('../controllers/newsController');

//  Import middlewares
const { authN } = require('../middlewares/authN');
const { creatorCheck } = require('../middlewares/authZ');

router.get('/getAllNews', getAllNews);
router.get('/getNews', getNews);
router.post('/createNews', authN, creatorCheck, createNews);
router.post('/getMyNews', authN, creatorCheck, getMyNews);
router.put('/updateNews', authN, creatorCheck, updateNews);
router.delete('/deleteNews', authN, creatorCheck, deleteNews);

module.exports = router;