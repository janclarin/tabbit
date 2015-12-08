/**
 * Sets up passport.
 */
'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
    models = require('./models/index');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {
            models.User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username and/or password' });
                }

                var hashedPassword = bcrypt.hashSync(password, user.salt);
                if (hashedPassword !== user.password) {
                    return done(null, false, { message: 'Incorrect username and/or password' });
                }

                return done(null, user);
            }).catch(function(err) {
                //return done(null, false, { message: 'An error occurred' });
            });
        }
    ));

    passport.serializeUser(function(User, done) {
        done(null, User.id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findOne({
            where: {
                'id': id
            }
        }).then(function(user) {
            if (user) {
                done(new Error('Wrong user ID.'));
            }
            done(null, user);
        });
    });
};