/**
 * Tab routes.
 *
 * Routes are preprended by:
 * /api/v1/users/:user_id/lists/:list_id
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

// Create a tab.
router.post('/lists/:listId/tabs', function(req, res) {
    var songName = req.body.songName,
        artistName = req.body.artistName,
        source = req.body.source,
        type = req.body.type,
        progress = req.body.progress,
        listId = req.params.listId;

    models.Tab.create({
        songName: songName,
        artistName: artistName,
        source: source,
        type: type,
        progress: progress,
        listId: listId
    }).then(function(tab) {
        res.status(201).json({
            data: tab
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

// Get list tabs.
router.get('/lists/:listId/tabs', function(req, res) {
    var where = {
        listId: req.params.listId
    };
    if (req.query.progress) { where.progress = req.query.progress; }

    models.Tab.findAll({
        where: where
    }).then(function(tabs) {
        res.status(200).json({
            data: tabs
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

// Get a tab from a list.
router.get('/lists/:listId/tabs/:tabId', function(req, res) {
    var listId = req.params.listId,
        tabId = req.params.tabId;

    models.Tab.findOne({
        where: {
            id: tabId,
            listId: listId
        }
    }).then(function(tab) {
        res.status(200).json({
            data: tab
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    })
});

// Delete a tab from a list.
router.delete('/lists/:listId/tabs/:tabId', function(req, res) {
    var listId = req.params.listId,
        tabId = req.params.tabId;

    models.Tab.destroy({
        where: {
            id: tabId,
            listId: listId
        }
    }).then(function(affectedRows) {
        res.status(204).json(); // TODO: Handle success properly.
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
