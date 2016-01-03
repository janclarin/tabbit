/**
 * Tab progresses routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.route('/tabs/progresses')
    .get(getTabProgresses);

router.route('/tabs/progresses/:progressId')
    .get(getTabProgress);

// Get a tab from a list.
function getTabProgresses(req, res) {
    models.TabProgress.findAll({
    }).then(function (tabProgresses) {
        res.status(200).json(tabProgresses);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

function getTabProgress(req, res) {
    var progressId = req.params.progressId;

    models.TabProgress.findOne({
        where: {
            id: progressId
        }
    }).then(function (tabProgress) {
        res.status(200).json(tabProgress);
    }).catch(function (err) {
        res.status(500).json({err: err});
    });
}

module.exports = router;
