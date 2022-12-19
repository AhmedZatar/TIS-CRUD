const cors = require('cors');
const express = require('express');

const errorHandler = require('./middleware/error-handler');
const { NotFound } = require('./lib/errors');
const routes = require('./routes');

const app = express();

app.set('showStackError', true);
app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);

app.use('*', (req, res, next) => {
  throw new NotFound();
});

app.use(errorHandler);

module.exports = app;
