const User = require('../models/user');
const { secret } = require('../config/env');
const jwt = require('jsonwebtoken');

let token;
let userId;

function getTokenFromRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  console.log('token is', token);
  function getUserIdFromToken(err, result) {
    console.log('err is', err); // JsonWebTokenError: invalid token. Points to line 17
    console.log('Result is', result); // Result is undefined
    userId = result.sub;
    console.log('user id is', userId);
  }
  jwt.verify(token, secret, getUserIdFromToken);
}


function swipesIndex(req, res, next) {
  getTokenFromRequest(req);
  User
    .findById(userId)
    .populate('swipes')
    .then(user => res.json(user.swipes))
    .catch(next);
}

function swipesCreate(req, res, next) {
  console.log('Does this even run');
  getTokenFromRequest(req);
  User
    .findById(userId)
    .then(() => console.log('What is on params?', req.params))
    .catch(next);
}

function swipesUpdate(req, res, next) {
  console.log('req params is', req.params);
  console.log('res is', res);
}

module.exports = {
  index: swipesIndex,
  create: swipesCreate,
  update: swipesUpdate
};

// function passengerCreate(req, res, next) {
//   const carShareId = req.params.carShareId;
//   getTokenFromHttpRequest(req);
//   User
//     .findById(userId)
//     .then(user => {
//       user.carShares.push(carShareId);
//       // console.log(user);
//       return user.save();
//     })
//     .then(() => {
//       return CarShare
//         .findById(carShareId)
//         .then(carShare => {
//           carShare.pendingPassengers.push(userId);
//           return carShare.save();
//         });
//     })
//     .then((carShare) => res.json(carShare))
//     .catch(next);
// }

// function pendingPassengersDelete(req, res, next) {
//   const carShareId = req.params.carShareId;
//   const passengerId = req.params.passengerId;
//   CarShare
//     .findById(carShareId)
//     .then(carShare => {
//       carShare.pendingPassengers = carShare.pendingPassengers.filter(pendingPassenger =>
//         pendingPassenger.toString() !== passengerId
//       );
//       carShare.passengers = carShare.passengers.filter(pendingPassenger =>
//         pendingPassenger.toString() !== passengerId
//       );
//       return carShare.save();
//     })
//     .then(() => User.findById(passengerId)) //This bit needs testing
//     .then(rejectedPassenger => {
//       // console.log('the rejected passenger is', rejectedPassenger);
//       rejectedPassenger.carShares = rejectedPassenger.carShares.filter(passengerOn =>
//         passengerOn.toString() !== carShareId);
//       return rejectedPassenger.save();
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next);
// }
