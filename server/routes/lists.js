/**
 * Lists routes.
 *
 * Routes are prepended by:
 * /api/v1/users/:user_id
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.post('/users/:user_id/lists', function(req, res) {
    var name = req.body.name,
        userId = req.params.user_id;

    models.List.create({
        name: name,
        userId: userId
    }).then(function(list) {
        res.status(200).json({
            data: list
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
