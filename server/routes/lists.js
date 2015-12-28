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
    .get(getList)
    .put(putList)
    .delete(deleteList);

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

// Update a list.
function putList(req, res) {
    var name = req.body.name,
        isPrivate = req.body.isPrivate,
        listId = req.params.listId;

    models.List.update({
        name: name,
        isPrivate: isPrivate
    }, {
        where: {
            id: listId
        }
    }).then(function () {
        // TODO: Handle success properly.
        res.status(204).json();
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

// Delete list and all tabs related to it.
function deleteList(req, res) {
    var listId = req.params.listId;

    models.Tab.destroy({
        where: {
            listId: listId
        }
    }).then(function () {
        // All tabs deleted in the list were deleted.
        return models.List.destroy({
            where: {
                id: listId
            }
        });
    }).then(function () {
        // The list was deleted successfully.
        // TODO: Handle success properly.
        res.status(204).json();
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

    // Query by progress ID if it was specified.
    if (req.query.progressId) {
        where.progressId = req.query.progressId;
    }

    // Query by type Id if it was specified.
    if (req.query.typeId) {
        where.typeId = req.query.typeId;
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
        typeId = req.body.typeId,
        progressId = req.body.progressId,
        listId = req.params.listId;

    models.Tab.create({
        songName: songName,
        artistName: artistName,
        source: source,
        typeId: typeId,
        progressId: progressId,
        listId: listId
    }).then(function (tab) {
        res.status(201).json(tab);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

module.exports = router;
