/**
 * Tab routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config/config.json')[env],
    jwt = require('express-jwt'),
    jwtSecret = process.env.JWT_SECRET || config.jwt_secret;

router.route('/tabs/:tabId')
    .get(getTab)
    .put(jwt({ secret: jwtSecret }), putTab) // TODO: Ensure that only the tab poster can edit this tab.
    .delete(jwt({ secret: jwtSecret }), deleteTab); // TODO: Ensure that only the tab poster can delete this tab.

// Get a tab.
function getTab(req, res) {
    var tabId = req.params.tabId;

    models.Tab.findOne({
        where: {
            id: tabId
        }
    }).then(function (tab) {
        res.status(200).json(tab);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    })
}

// Update a tab.
function putTab(req, res) {
    var songName = req.body.songName,
        artistName = req.body.artistName,
        source = req.body.source,
        typeId = req.body.typeId,
        progressId = req.body.progressId,
        tabId = req.params.tabId;

    models.Tab.update({
        songName: songName,
        artistName: artistName,
        source: source,
        typeId: typeId,
        progressId: progressId
    }, {
        where: {
            id: tabId
        }
    }).then(function () {
        // TODO: Handle success properly.
        res.status(204).json();
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

// Delete a tab.
function deleteTab(req, res) {
    var tabId = req.params.tabId;

    models.Tab.destroy({
        where: {
            id: tabId
        }
    }).then(function () {
        res.status(204).json(); // TODO: Handle success properly.
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

module.exports = router;
