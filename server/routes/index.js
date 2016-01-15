'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config/config.json')[env],
    jwt = require('jsonwebtoken'),
    jwtSecret = process.env.JWT_SECRET || config.jwt_secret;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'favicon.ico'));
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
        },
        attributes: [
            'id', 'email', 'username', 'firstName', 'lastName'
        ]
    }).then(function(user) {
        // Create a token that lasts for a month and send it to the user.
        var token = jwt.sign(user.dataValues, jwtSecret, {
            expiresIn: "30d" // A month.
        });

        // Send the token back.
        res.status(200).json({
            token: token
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