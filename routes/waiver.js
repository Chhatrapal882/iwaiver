const express = require('express');
const router = express.Router();
const {addwaiver,getwaiver} = require('../controllers/waiver')
router.post('/addwaiver', addwaiver);
router.get('/getwaiver', getwaiver);
module.exports = router