const express = require('express');
const router = express.Router();

//  Import controllers
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { createRegion, getRegion, updateRegion, deleteRegion } = require('../controllers/categoryController');

//  Import middlewares
const { authN } = require('../middlewares/authN');
const { adminCheck } = require('../middlewares/authZ');

router.post('/createCategory', authN, adminCheck, createCategory);
router.get('/getCategory', getCategory);
router.put('/updateCategory', authN, adminCheck, updateCategory);
router.delete('/deleteCategory', authN, adminCheck, deleteCategory);

router.post('/createRegion', authN, adminCheck, createRegion);
router.get('/getRegion', getRegion);
router.put('/updateRegion', authN, adminCheck, updateRegion);
router.delete('/deleteRegion', authN, adminCheck, deleteRegion);

module.exports = router;