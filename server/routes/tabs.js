/**
 * Tab routes.
 *
 * Routes are preprended by:
 *
 * /api/v1/users/:user_id/lists/:list_id
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.post('/lists/:list_id/tabs', function(req, res) {
    var songName = req.body.song_name,
        artistName = req.body.artist_name,
        source = req.body.source,
        type = req.body.type,
        progress = req.body.progress,
        listId = req.params.list_id;

    models.Tab.create({
        songName: songName,
        artistName: artistName,
        source: source,
        type: type,
        progress: progress,
        listId: listId
    }).then(function(tab) {
        res.status(200).json({
            data: tab
        });
    }).catch(function(error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
});

module.exports = router;
