/**
 * Tab types routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    models = require('../models/index');

router.route('/tabs/types')
    .get(getTabTypes);

router.route('/tabs/types/:typeId')
    .get(getTabType);

// Get a tab from a list.
function getTabTypes(req, res) {
    models.TabType.findAll({
    }).then(function (tabTypes) {
        res.status(200).json(tabTypes);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

function getTabType(req, res) {
    var typeId = req.params.typeId;

    models.TabType.findOne({
        where: {
            id: typeId
        }
    }).then(function (tabType) {
        res.status(200).json(tabType);
    }).catch(function (err) {
        res.status(500).json({err: err});
    });
}

module.exports = router;
