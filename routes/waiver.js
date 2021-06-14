const express = require('express');
const router = express.Router();
const {addwaiver} = require('../controllers/waiver')
router.post('/addwaiver', addwaiver);
module.exports = router