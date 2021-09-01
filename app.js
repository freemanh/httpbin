var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var webhooksRouter = require('./routes/webhooks');
var usersRouter = require('./routes/users');
var logsRouter = require('./routes/logs');

var app = express();

app.use(logger('dev'));
app.use(cors({
    origin: 'http://localhost:8080',
}))

app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.text({ type: "*/*" }))

// routers
app.use('/webhooks', webhooksRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);

// vuejs history mode, return index.html rather than 404
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

module.exports = app;
