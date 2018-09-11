const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

// const moment = require('moment');

// from Rob: this is a bit odd, although it works. Perhaps build up a user object and return it instead.
let token;
const userObject = {};

function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userObject.userId = result.sub;
    userObject.sexuality = result.sexuality;
    userObject.gender = result.gender;
    userObject.swipeIds = result.swipes.map(swipe => swipe.userId);
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}

function usersIndex(req, res, next) {
  getTokenFromHttpRequest(req);

  User
    .find({ $and: [ {sexuality: {$in: userObject.gender}}, {gender: {$in: userObject.sexuality}}, {_id: {$ne: userObject.userId}}, {_id: {$nin: userObject.swipeIds}} ] } )
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
