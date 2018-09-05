const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');

Router.route('/users')
  .get(userController.index);

module.exports = Router;
