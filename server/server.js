#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    http = require('http'),
    models = require('./models/index');

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);

// Create the database and its tables if it doesn't exist.
models.sequelize.sync().then(function() {
    server.listen(app.get('port'), onListening);
});

function onListening() {
    debug('Express server listening on post ' + server.address().port);
}
