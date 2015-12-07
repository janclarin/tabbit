'use strict';

var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
    models = require('../models/index');

router.post('/register', function(req, res) {
    var email = req.body.email,
        username = req.body.username,
        password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user.
    models.User.create({
        email: email,
        username: username,
        password: hashedPassword,
        salt: salt
    }).then(function(user) {
        res.status(200).json(user);
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.json({error: error});
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    var user = req.user;
    if (!user) {
        return res.status(401).json({err: 'Unauthorized.'});
    }
    req.login(user, function(err) {
        if (err) {
            return res.status(500).json({err: 'Could not log in user.'});
        }
        return res.status(200).json({status: 'Login successful.'});
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Logout successful.'}) ;
});

module.exports = router;
