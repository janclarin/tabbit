'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

module.exports = router;