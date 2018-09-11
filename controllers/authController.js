const User = require('../models/user');

const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised access' });
      }
      createAndSendToken(user, res, `Welcome back, ${user.firstName}`);
    })
    .catch(next);
}

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => createAndSendToken(user, res, `Created ${user.firstName} at ${user.email} from ${user.postcode}`))
    .catch(next);
}

function createAndSendToken(user, res, message) {
  //TODO after token expiry has been tested, think about when the token should expire and change it
  const token = jwt.sign({ sub: user._id, name: user.firstName, profilePic: user.profilePic, dateOfBirth: user.dateOfBirth, postcode: user.postcode, gender: user.gender, sexuality: user.sexuality, swipes: user.swipes }, secret, { expiresIn: '1hr' });
  res.json({ message, token });
}

module.exports = {
  register: register,
  login: login
};
