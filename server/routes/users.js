/**
 * User routes.
 *
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
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
        res.status(200).json({
            data: user
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
