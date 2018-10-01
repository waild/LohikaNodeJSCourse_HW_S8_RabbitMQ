const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const reservationRoutes = require('./routes/reservations');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', reservationRoutes);

module.exports = app;
