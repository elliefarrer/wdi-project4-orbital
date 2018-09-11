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

// function tagsDelete(req, res, next) {
//   Film.findById(req.params.filmId)
//     .then(film => {
//       film.tags.id(req.params.tagId).remove();
//       return film.save();
//     })
//     .then(film => res.json(film))
//     .catch(next);
// }
//
// Restaurant
//     .findById(req.params.restaurantId)
//     .then(restaurant => {
//       restaurant.comments = restaurant.comments.filter(
//         comment => comment.id !== req.params.commentId
//       );
//       return restaurant.save();
//     })
//     .then(restaurant => res.redirect(`/restaurants/${restaurant.id}`))
//     .catch(next);
//

module.exports = {
  create: photosCreate,
  delete: photosDelete
};
