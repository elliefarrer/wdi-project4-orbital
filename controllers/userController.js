const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(err => console.log(`There was an error ${err}`))
    .finally(next);
}

module.exports = {
  index: usersIndex
};
