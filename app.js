var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logsRouter = require('./routes/logs');

var app = express();

app.use(logger('dev'));
app.use(cors({
    origin: 'http://localhost:8080',
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.text())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);

module.exports = app;
