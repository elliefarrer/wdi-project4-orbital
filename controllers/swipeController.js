const _ = require('lodash');
const User = require('../models/user');

function swipesIndex(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('swipes')
    .then(users => res.json(users.swipes))
    .catch(next);
}

// Get swiper's ID from req.params.userId. Get swipee's ID from req.body.userId
function swipesCreate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      // if user swipes left
      if (req.body.status === 'left') {
        user.swipes.push({ userId: req.body.userId, status: req.body.status });
        console.log('User is now', user);
      }
      // if user swipes right
      if (req.body.status === 'right') {
        user.swipes.push({ userId: req.body.userId, status: req.body.status });
        console.log('User is now', user);
      }
      return user.save();
    })
    // .then(user => console.log('User is now', user))
    .then(user => res.json(user))
    .catch(next);
}

///////// user.swipes is unmatching req.body.userId //////////
function swipesDelete(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      user.swipes = user.swipes.filter(key => {
        return key.userId != req.body.userId;
      });
      // user.swipes.status = 'left';
      return user.save();
    })
    .then(user => res.sendStatus(204).json(user))
    .catch(next);
}

module.exports = {
  index: swipesIndex,
  create: swipesCreate,
  delete: swipesDelete
};

// user.swipes.filter(key => {
//   return key._id === req.body.userId;
// }).status = 'left';
// return user.save();
