const User = require('../models/user');

function swipesIndex(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('swipes.userId', 'firstName profilePic')
    .then(users => res.json(users.swipes))
    .catch(next);
}

// Get swiper's ID from req.params.userId. Get swipee's ID from req.body.userId
function swipesCreate(req, res, next) {
  if(req.body.status === 'right') {
    User
      .findById(req.params.userId)
      .then(user => {
        user.swipes.push({ userId: req.body.userId, status: req.body.status });
        console.log('User is now', user);
        return user.save();
      })
      .then(() => {
        User
          .findById(req.body.userId)
          .then(user => {
            const key = user.swipes.findIndex(key => key.userId == req.params.userId);
            console.log('key is', key);
            if(key || key === 0) {
              console.log('this works');
              if(user.swipes[key].status === 'right') {
                user.swipes[key].mutual = true;
                User
                  .findById(req.params.userId)
                  .then(user =>  {
                    console.log('User is', user);
                    const userKey = user.swipes.findIndex(key => key.userId == req.body.userId);
                    if(userKey || userKey === 0) {
                      console.log('This works', user.swipes[userKey]);
                      /////// EVERYTHING WORKS BUT THE MUTUAL DOES NOT CHANGE HERE
                      user.swipes[userKey].mutual = true;
                    }
                    console.log('Amended swipes are', user.swipes);
                    return user.save();
                  });
              }
              console.log('Swipee is', user.swipes);
              return user.save();
            }
          });
      })
      .then(user => res.json(user))
      .catch(next);
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
