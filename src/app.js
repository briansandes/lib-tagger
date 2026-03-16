const express = require('express');
const path = require('path');
const requestId = require('./middlewares/requestId');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(requestId);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;