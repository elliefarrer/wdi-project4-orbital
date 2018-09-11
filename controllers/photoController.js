const User = require('../models/user');

function photosCreate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      console.log('Extra photos are', user);
      console.log('Req body is', req.body.url);
      user.extraPhotos.push(req.body.url);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}


module.exports = {
  create: photosCreate
};
