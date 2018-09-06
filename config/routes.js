const express = require('express');
const Router = express.Router();
// const secureRoute = require('../lib/secureRoute');

const userController = require('../controllers/userController');
const swipeController = require('../controllers/swipeController');
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

// Router.route('/users/:userId/swipes/:swipeId')
  // unmatch users by changing status
  // .put(swipeController.update);

module.exports = Router;
