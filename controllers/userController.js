const User = require('../models/user');

//IDEA: can I filter by gender and age range here? Or use a query string with axios in the front end
function usersIndex(req, res, next) {
  User
    .find()
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
