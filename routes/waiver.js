const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const {addwaiver,getwaiver} = require('../controllers/waiver')
router.post('/addwaiver', addwaiver);
router.get('/getwaiver',authenticate, getwaiver);
module.exports = router
