const User = require('../models/user');

function swipesIndex(req, res, next) {
  User
    .find()
    .then(users => res.json(users.swipes))
    .catch(next);
}

module.exports = {
  index: swipesIndex
};
