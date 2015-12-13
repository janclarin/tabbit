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

// Create a new list under the user specified by the id.
router.post('/users/:userId/lists', function(req, res) {
    var name = req.body.name,
        isPrivate = req.body.isPrivate,
        userId = req.params.userId;

    models.List.create({
        name: name,
        isPrivate: isPrivate,
        userId: userId
    }).then(function(list) {
        res.status(201).json({
            data: list
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

// Get all of the user's lists.
router.get('/users/:userId/lists', function(req, res) {
    var userId = req.params.userId;

    models.List.findAll({
        where: {
            ownerId: userId
        }
    }).then(function(lists) {
        res.status(200).json({
            data: lists
        })
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

// Get a user's list.
router.get('/users/:userId/lists/:listId', function(req, res) {
    var userId = req.params.userId,
        listId = req.params.listId;

    models.List.findOne({
        where: {
            id: listId,
            ownerId: userId
        }
    }).then(function(list) {
        res.status(200).json({
            data: list
        })
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
