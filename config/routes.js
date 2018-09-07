const express = require('express');
const Router = express.Router();
// const secureRoute = require('../lib/secureRoute');

const userController = require('../controllers/userController');
const swipeController = require('../controllers/swipeController');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

//////////////// AUTH ///////////////////
Router.route('/register')
  .post(authController.register);

Router.route('/login')
  .post(authController.login);


///////////////// USERS /////////////////
Router.route('/users')
  .get(userController.index);

Router.route('/users/:userId')
  // .all(secureRoute)
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);


/////////////// SWIPES AND MATCHES ////////////////
Router.route('/users/:userId/swipes')
  // .all(secureRoute)
  .get(swipeController.index)
  .post(swipeController.create);

Router.route('/users/:userId/swipes/:swipeId')
  // unmatch users by changing status
  .delete(swipeController.delete);


/////////////////// CHATS /////////////////////
Router.route('/users/:userId/chats')
  .get(chatController.index)
  .post(chatController.startNewChat);

Router.route('/users/:userId/chats/:chatId')
  .get(chatController.show)
  .post(chatController.continueChat);

module.exports = Router;
