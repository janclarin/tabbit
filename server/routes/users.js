/**
 * User routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    bcrypt = require('bcrypt-nodejs'),
    models = require('../models/index');

router.route('/users')
    //.get(getUsers) TODO
    .post(postUser);

router.route('/users/:userId')
    .get(getUser);
//.put(putUser) TODO
//.delete(deleteUser); TODO

router.route('/users/:userId/lists')
    .get(getUserLists)
    .post(postUserList);

// Adds a user. Creates a list for the user after it's created.
function postUser(req, res) {
    var email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user.
    models.User.create({
        email: email,
        username: username,
        password: hashedPassword,
        salt: salt,
        firstName: firstName,
        lastName: lastName
    }).then(function (user) {
        // Create a list upon user creation.
        return models.List.create({
            name: 'My song list',
            ownerId: user.id,
            isPrivate: false
        });
    }).then(function (list) {
        passport.authenticate('local')(req, res, function () {
            return res.status(201).json({status: 'Account successfully created.'});
        });
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({err: err});
    });
}

// Get user by ID.
function getUser(req, res) {
    var userId = req.params.userId;

    models.User.findOne({
        where: {
            id: userId
        }
    }).then(function (user) {
        delete user.password; // Don't send password hash.
        delete user.salt; // Don't send salt.
        res.status(200).json(user);
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({err: err});
    });
}

// Get all lists from a user.
function getUserLists(req, res) {
    var userId = req.params.userId;

    models.List.findAll({
        where: {
            ownerId: userId
        }
    }).then(function (lists) {
        res.status(200).json(lists);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

// Create a new list.
function postUserList(req, res) {
    var name = req.body.name,
        isPrivate = req.body.isPrivate,
        userId = req.params.userId;

    models.List.create({
        name: name,
        isPrivate: isPrivate,
        userId: userId
    }).then(function (list) {
        res.status(201).json(list);
    }).catch(function (error) {
        // TODO: Handle error properly.
        res.status(500).json({error: error});
    });
}

module.exports = router;
