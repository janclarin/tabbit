/**
 * User routes.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    models = require('../models/index'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config/config.json')[env],
    jwt = require('express-jwt'),
    jwtSecret = process.env.JWT_SECRET || config.jwt_secret;

router.route('/users')
    //.get(getUsers) TODO
    .post(postUser);

router.route('/users/:userId')
    .get(getUser);
    // .put(putUser); // TODO ensure that only the user with the user ID can edit.
//.delete(deleteUser); TODO ensure that only the user with the user ID can edit.

router.route('/users/:userId/change-password')
    .put(jwt({secret: jwtSecret}), putUserPassword);

router.route('/users/:userId/lists')
    .get(getUserLists)
    .post(jwt({secret: jwtSecret}), postUserList);

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

    models.User.findById(userId, {
        attributes: [ // Does not include email, name, password, or salt.
            'id', 'username', 'isEmailVerified', 'createdAt', 'updatedAt'
        ]
    }).then(function (user) {
        res.status(200).json(user);
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({err: err});
    });
}

// Update user.
function putUserPassword(req, res) {
    var password = req.body.password,
        newPassword = req.body.newPassword,
        userId = req.params.userId, // User ID from route.
        jwtUserId = req.user.id; // User ID from decoded JWT token.

    // Ensure that the token's user ID matches the ID of the user to update.
    if (parseInt(userId) !== jwtUserId) {
        return res.status(401).json({ error: 'You are not authorized to update this user\'s password.' });
    }
    
    models.User.findById(userId, {
        attributes: [
            'password'
        ]
    }).then(function (user) {
        // Check if the password in the request matches the one in the DB.
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Old password is not valid.' });
        }
        
        // Generate hashed password
        var newSalt = bcrypt.genSaltSync(10);
        var newHashedPassword = bcrypt.hashSync(newPassword, newSalt);
        models.User.update({
            password: newHashedPassword,
            salt: newSalt
        }, {
            where: { id: userId }
        }).then(function () {
            res.status(204).json();
        });
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({ error: err });
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
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({ error: err });
    });
}

// Create a new list.
function postUserList(req, res) {
    var name = req.body.name,
        isPrivate = req.body.isPrivate,
        ownerId = req.params.userId,
        jwtUserId = req.user.id; // User ID from decoded JWT token.

    // Ensure that the token's user ID matches the owner ID of list to be created.
    if (parseInt(ownerId) !== jwtUserId) {
        return res.status(401).json('You are not authorized to create a list under this user.');
    }
    
    models.List.create({
        name: name,
        isPrivate: isPrivate,
        ownerId: ownerId
    }).then(function (list) {
        res.status(201).json(list);
    }).catch(function (err) {
        // TODO: Handle error properly.
        res.status(500).json({ error: err });
    });
}

module.exports = router;
