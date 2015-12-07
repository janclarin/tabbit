var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    bcrypt = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Models.
var User = require('./models/user');

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

// Configure passport.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
        where: {
            username: username
        }
    })
        .then(function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log('Error.');
                return done(null, false, { message: 'Incorrect username and/or password' });
            }

            var hashedPassword = bcrypt.hashSync(password, user.salt);

            if (user.password === hashedPassword) {
                return done(null, user);
            }
            return done(null, false, { message: 'Incorrect username and/or password' });
        });
}));
passport.serializeUser(function(User, done) {
    done(null, User.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function(user) {
            done(null, user);
        })
        .catch(function(e) {
            done(e, false);
        });
});

// Routes.
app.use('/', routes);
app.use('/users', users);

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
