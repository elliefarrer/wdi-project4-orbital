const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');

Router.route('/users')
  .get(userController.index);

Router.route('/users/:userId')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

module.exports = Router;
