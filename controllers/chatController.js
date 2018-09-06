const User = require('../models/user');
const Chat = require('../models/chat');

function chatsIndex(req, res, next) {
  Chat
    .find()
    .populate('userOne', 'userTwo') //TODO: check if I need to populate chats.messages.sentBy and if so, how to do it
    .then(chats => res.json(chats))
    .catch(next);
}

function chatsShow(req, res, next) {
  Chat
    .findById(req.params.chatId)
    .populate('userOne', 'userTwo')
    .then(chat => res.json(chat))
    .catch(next);
}

module.exports = {
  index: chatsIndex,
  show: chatsShow
};
