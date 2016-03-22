var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path');

var setupPassport = require('./setup-passport');

// Routes.
var routes = require('./routes/index');
var users = require('./routes/users');
var lists = require('./routes/lists');
var tabs = require('./routes/tabs');
var tabProgresses = require('./routes/tab-progresses.js');
var tabTypes = require('./routes/tab-types.js');

// Create Express instance.
var app = express();

// Define middleware.
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up passport.
setupPassport(app);

// Set routes.
app.use('/', routes);
app.use('/api/v1', users);
app.use('/api/v1', lists);
app.use('/api/v1', tabProgresses);
app.use('/api/v1', tabTypes);
app.use('/api/v1', tabs);

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
