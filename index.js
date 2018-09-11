const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

const errorHandler = require('./lib/errorHandler');
const Router = require('./config/routes');

const { dbURI, port } = require('./config/env');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use('/api', Router);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use(errorHandler);
app.listen(port, () => console.log(`I'm hungry. Feed me on port ${port} 😋`));

module.exports = app;
