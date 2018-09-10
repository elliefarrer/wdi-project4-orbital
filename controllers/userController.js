const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

const moment = require('moment');

let token;
let userId;
let userSexuality;
let userGender;
let userDateOfBirth;
let userAge;

function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userId = result.sub;
    userSexuality = result.sexuality;
    userGender = result.gender;
    userDateOfBirth = result.dateOfBirth;
    userAge = moment().diff(userDateOfBirth, 'years');
    console.log('User', userId, 'dob is', userAge);
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}

function usersIndex(req, res, next) {
  getTokenFromHttpRequest(req);

  User
    .find({ $and: [ {sexuality: {$in: userGender}}, {gender: {$in: userSexuality}}, {_id: {$ne: userId}} ] } )
    .then(users => res.json(users))
    .catch(err => console.log(`There was an error ${err}`))
    .finally(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => res.json(user))
    .catch(next);
}

function usersUpdate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
