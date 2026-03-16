const express = require('express');
const requestId = require('./middlewares/requestId');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(requestId);

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;