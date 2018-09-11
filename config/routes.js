const express = require('express');
const Router = express.Router();
const secureRoute = require('../lib/secureRoute');

const userController = require('../controllers/userController');
const swipeController = require('../controllers/swipeController');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');

const gifController = require('../controllers/gifController');

//////////////// AUTH ///////////////////
Router.route('/register')
  .post(authController.register);

Router.route('/login')
  .post(authController.login);


///////////////// USERS /////////////////
Router.route('/users')
  .all(secureRoute)
  .get(userController.index);

Router.route('/users/:userId')
  .all(secureRoute)
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);


/////////////// SWIPES AND MATCHES ////////////////
Router.route('/users/:userId/swipes')
  .all(secureRoute)
  .get(swipeController.index)
  .post(swipeController.create);

Router.route('/users/:userId/swipes/:swipeId')
  // unmatch users by changing status
  .all(secureRoute)
  .delete(swipeController.delete);


/////////////////// CHATS /////////////////////
Router.route('/users/:userId/chats')
  .all(secureRoute)
  .get(chatController.index)
  .post(chatController.startNewChat);

Router.route('/users/:userId/chats/:chatId')
  .all(secureRoute)
  .get(chatController.show)
  .post(chatController.continueChat)
  .delete(chatController.delete);


////////////////////// PHOTOS ///////////////////////////
Router.route('/users/:userId/photos')
  .all(secureRoute)
  .post(photoController.create);

////////////////////// GIFS ////////////////////////
Router.route('/gifs')
  .all(secureRoute)
  .get(gifController.search);

module.exports = Router;
