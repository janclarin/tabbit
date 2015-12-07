#!/usr/bin/env node

var debug = require('debug')('tab'),
    app = require('./app'),
    models = require('./models/index');

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function() {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
});
