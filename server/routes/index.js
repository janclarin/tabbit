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

router.get('/loginSuccess', function(req, res, next) {
    res.status(200).json({status: 'Login successful.'});
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Logout successful.'}) ;
});

module.exports = router;