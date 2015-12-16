/**
 * User routes.
 *
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    bcrypt = require('bcrypt-nodejs'),
    models = require('../models/index');

router.post('/users', function(req, res) {
    var email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user.
    models.User.create({
        email: email,
        username: username,
        password: hashedPassword,
        salt: salt,
        firstName: firstName,
        lastName: lastName
    }).then(function(user) {
        // Create a list upon user creation.
        return models.List.create({
            name: 'My song list',
            ownerId: user.id,
            isPrivate: false
        });
    }).then(function(list) {
        passport.authenticate('local')(req, res, function() {
            return res.status(201).json({status: 'Account successfully created.'});
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
