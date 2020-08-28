const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./user'));
app.use(require('./product'));
app.use(require('./commerce'));

module.exports = app;