'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

router.get('/loginFailure', function(req,res, next) {
    res.status(500).json({err: 'Could not log in user.'});
});

router.get('/loginSuccess/:username', function(req, res, next) {
    // Send user ID in response after login.
    var username = req.params.username;
    models.User.findOne({
        where: {
            username: username
        }
    }).then(function(user) {
        res.status(200).json({
            status: 'Login successful.',
            data: {
                userId: user.id
            }
        });
    }).catch(function(err) {
         // TODO: Use proper error handling.
        res.status(500).json({err: err});
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // Authentication succeeded.
    res.redirect('/loginSuccess/' + req.user.username);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Logout successful.'}) ;
});

module.exports = router;