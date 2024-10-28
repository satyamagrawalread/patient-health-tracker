const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // console.log(token);
  if (!token) {
    console.log("hello");
    return res.status(401).send({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    const sameUser = await User.findOne({token: token});
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if(!sameUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };