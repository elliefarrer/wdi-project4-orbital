const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

const Router = require('./config/routes');

const { dbURI, port } = require('./config/env');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', Router);
app.listen(port, () => console.log(`I'm hungry. Feed me on port ${port} 😋`));
