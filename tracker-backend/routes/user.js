const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.status(200).send({username: req.user.username});
});
router.post('/logout', authenticate, async(req, res) => {
  const user = req.user;
  try {
    await User.updateOne({_id: user._id}, {token: null});
    res.status(201).send({message: "Successfully Logged out"});
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
})

module.exports = router;