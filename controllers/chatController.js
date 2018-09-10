const User = require('../models/user');
const Chat = require('../models/chat');

function chatsIndex(req, res, next) {
  Chat
    .find({ $or: [{ userOne: req.params.userId}, {userTwo: req.params.userId }] })
    .populate('userOne userTwo messages.sentBy', 'firstName profilePic')
    .then(chats => res.json(chats))
    .catch(next);
}

function chatsShow(req, res, next) {
  Chat
    .findById(req.params.chatId)
    .populate('userOne userTwo messages.sentBy', 'firstName profilePic')
    .then(chat => res.json(chat))
    .catch(next);
}

function startNewChat(req, res, next) {
  Chat
    .create(req.body)
    // .populate('userOne userTwo messages.sentBy', 'firstName profilePic')
    .then(() => {
      User
        .findById(req.params.userId)
        .then(user => {
          console.log('User is', user, 'Find this user', req.body.userTwo);
          const key = user.swipes.findIndex(key => key.userId == req.body.userTwo);
          if(key || key === 0) {
            user.swipes[key].messaged = true;
            console.log('Does this work', user.swipes[key]);
          }
          return user.save();
        });
    })
    .then(() => {
      User
        .findById(req.body.userTwo)
        .then(user => {
          const key = user.swipes.findIndex(key => key.userId == req.params.userId);
          if(key || key === 0) {
            user.swipes[key].messaged = true;
          }
          console.log('The user is now', user);
          return user.save();
        });
    })
    .then(chat => res.json(chat))
    .catch(next);
}


function continueChat(req, res, next) {
  console.log('req body is', req.body);
  Chat
    .findById(req.params.chatId)
    .populate('userOne userTwo messages.sentBy', 'firstName profilePic')
    .then(chat => {
      chat.messages.push(req.body);
      return chat.save();
    })
    .then(chat => res.json(chat))
    .catch(next);
}

function chatsDelete(req, res, next) {
  Chat
    .findById(req.params.chatId)
    .then(chat => chat.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

// Chat
//   .findById(req.params.chatId)
//   .then(chat => chat.remove())
//   .then(() => res.sendStatus(204))
//   .catch(next);

// function swipesDelete(req, res, next) {
//   User
//     .findById(req.params.userId)
//     .then(user => {
//       const userToUnmatch = user.swipes.id(req.params.swipeId).userId;
//       User
//         .findById(userToUnmatch)
//         .then(user => {
//           const key = user.swipes.findIndex(key => key.userId == req.params.userId);
//           user.swipes[key].mutual = false;
//           user.swipes[key].messaged = false;
//           return user.save();
//         });
//       user.swipes.id(req.params.swipeId).remove();
//       return user.save();
//     })
//     .then(user => res.json(user))
//     .catch(next);
// }

module.exports = {
  index: chatsIndex,
  show: chatsShow,
  startNewChat: startNewChat,
  continueChat: continueChat,
  delete: chatsDelete
};
