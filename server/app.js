var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Connect mongoose to DB.
mongoose.connect('mongodb://localhost/tab');

// User model.
var User = require('./models/user.js');

// Create Express instance.
var app = express();

// Require routes.
var routes = require('./routes/api.js');

// Define middleware.
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat', // TODO: Use proper secret.
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Configure passport.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes.
app.use('/users/', routes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Redirect to index if any other link than those above.
//app.get('*', function(req, res) {
//    res.redirect('/');
//});

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
