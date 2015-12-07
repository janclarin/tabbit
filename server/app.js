var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    path = require('path');

var setupPassport = require('./setup-passport');

// Routes.
var routes = require('./routes/index');
var users = require('./routes/users');

// Create Express instance.
var app = express();

// Define middleware.
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat', // TODO: Use proper secret.
    resave: false,
    saveUninitialized: false
}));

// Set up passport.
setupPassport(app);

// Routes.
app.use('/', routes);
app.use('/users', users);

// Error handlers.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;
