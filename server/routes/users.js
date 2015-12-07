'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index');

router.post('/register', function(req, res) {
    models.User.create({
        email: req.body.email
    }).then(function(user) {
        res.status(200).json(user);
    });
    // TODO: Handle error.
});

/*
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if (!user) {
            res.status(401).json({err: err});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err: 'Could not log in user.'});
            }
            res.status(200).json({status: 'Login successful.'});
        });

    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Logout successful.'}) ;
});
*/

module.exports = router;
