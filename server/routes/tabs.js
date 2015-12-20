/**
 * Tab routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.route('/tabs/:tabId')
    .get(getTab)
    .delete(deleteTab);

// Get a tab from a list.
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

// Delete a tab from a list.
function deleteTab(req, res) {
    var tabId = req.params.tabId;

    models.Tab.destroy({
        where: {
            id: tabId
        }
    }).then(function (affectedRows) {
        res.status(204).json(); // TODO: Handle success properly.
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

module.exports = router;
