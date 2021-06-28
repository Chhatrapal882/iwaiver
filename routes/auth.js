const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const { signup, signin,users } = require('../controllers/auth');
const User = require('../models/User')
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users',authenticate,users)
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
        console.log(token,"dsd")
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router