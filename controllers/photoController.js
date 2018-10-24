const User = require('../models/user');

function photosCreate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      console.log('Extra photos are', user);
      console.log('Req body is', req.body);
      user.extraPhotos.push(req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function photosDelete(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      user.extraPhotos.id(req.params.photoId).remove();
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  create: photosCreate,
  delete: photosDelete
};
