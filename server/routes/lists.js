/**
 * Lists routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

//router.route('/lists');
//.get(getLists) TODO

router.route('/lists/:listId')
    .get(getList);
//.put(putList)
//.delete(deleteList)

router.route('/lists/:listId/tabs')
    .get(getListTabs)
    .post(postListTab);

// Get a list.
function getList(req, res) {
    var listId = req.params.listId;

    models.List.findOne({
        where: {
            id: listId
        }
    }).then(function (list) {
        res.status(200).json(list);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

// Get list tabs.
function getListTabs(req, res) {
    var where = {
        listId: req.params.listId
    };
    if (req.query.progress) {
        where.progress = req.query.progress;
    }

    models.Tab.findAll({
        where: where
    }).then(function (tabs) {
        res.status(200).json(tabs);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

// Create a tab.
function postListTab(req, res) {
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
    }).then(function (tab) {
        res.status(201).json(tab);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

module.exports = router;
