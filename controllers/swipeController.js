const User = require('../models/user');

function swipesIndex(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('swipes.userId', 'firstName profilePic')
    .then(users => {
      const filteredUsers = users.swipes.filter(key => {
        return key.mutual === true && key.messaged === false;
      });
      return users = filteredUsers;
    })
    .then(users => res.json(users))
    .catch(next);
}

// Get swiper's ID from req.params.userId. Get swipee's ID from req.body.userId
function swipesCreate(req, res, next) {
  if(req.body.status === 'right') {
    User
      .findById(req.params.userId)
      .then(user => {
        // add this swipe to the user's swipes array
        user.swipes.push({ userId: req.body.userId, status: req.body.status });
        console.log('User is now', user);
        return user.save();
      })
      .then(() => {
        User
        // find the user that they swiped
          .findById(req.body.userId)
          .then(user => {
            // see if the found user has already swiped the current user
            const key = user.swipes.findIndex(key => key.userId == req.params.userId);
            console.log('key is', key);
            // if we find a key from the filter...
            if(key || key === 0) {
              // and if the found user swiped right to the current user
              if(user.swipes[key].status === 'right') {
                // change mutual to true
                user.swipes[key].mutual = true;
                User
                  // find current user again
                  .findById(req.params.userId)
                  .then(user =>  {
                    console.log('User is', user);
                    // filter for the user they just swiped
                    const userKey = user.swipes.findIndex(key => key.userId == req.body.userId);
                    // update their mutual to true
                    user.swipes[userKey].mutual = true;
                    console.log('Amended swipes are', user.swipes);
                    return user.save();
                  });
              }
              // if the found user swiped left, save and continue
              console.log('Swipee is', user.swipes);
              return user.save();
            }
          });
      })
      .then(user => res.json(user))
      .catch(next);

  // if current user swiped left, do this...
  } else {
    User
      .findById(req.params.userId)
      .then(user => {
        user.swipes.push({ userId: req.body.userId, status: req.body.status });
        console.log('User is now', user);
        return user.save();
      })
      .then(user => res.json(user))
      .catch(next);
  }
}

function swipesDelete(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      const userToUnmatch = user.swipes.id(req.params.swipeId).userId;
      User
        .findById(userToUnmatch)
        .then(user => {
          const key = user.swipes.findIndex(key => key.userId == req.params.userId);
          user.swipes[key].mutual = false;
          user.swipes[key].messaged = false;
          return user.save();
        });
      user.swipes.id(req.params.swipeId).remove();
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

module.exports = {
  index: swipesIndex,
  create: swipesCreate,
  delete: swipesDelete
};

// user.swipes.filter(key => {
//   return key._id === req.body.userId;
// }).status = 'left';
// return user.save();
