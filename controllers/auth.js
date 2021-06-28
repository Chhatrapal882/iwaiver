const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  createJWT,
} = require("../utils/auth");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    // validat

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });



    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,

    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

}
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token", token);
    res.json({
      token,
      user: {
        id: user._id,
        user
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.users = async(req,res) => {

  const user = await User.findById(req.user);
  res.json({
    user: user,
    id: user._id

  })
}


