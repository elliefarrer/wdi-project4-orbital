const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');
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
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

module.exports = Router;
