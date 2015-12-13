'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
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