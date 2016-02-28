'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    models = require('../models/index'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config/config.json')[env],
    jwt = require('jsonwebtoken'),
    aws = require('aws-sdk'),
    jwtSecret = process.env.JWT_SECRET || config.jwt_secret,
    awsAccessKey = process.env.AWS_ACCESS_KEY,
    awsSecretKey = process.env.AWS_SECRET_KEY,
    awsBucket = process.env.AWS_S3_BUCKET;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'favicon.ico'));
});

router.get('/loginFailure', function(req,res, next) {
    res.status(500).json({err: 'Could not log in user.'});
});

router.get('/loginSuccess/:username', function(req, res, next) {
    // Send user ID in response after login.
    var username = req.params.username;
    models.User.findOne({
        where: {
            username: username
        },
        attributes: [
            'id', 'email', 'username', 'firstName', 'lastName'
        ]
    }).then(function(user) {
        // Create a token that lasts for a month and send it to the user.
        var token = jwt.sign(user.dataValues, jwtSecret, {
            expiresIn: "30d" // A month.
        });

        // Send the token back.
        res.status(200).json({
            token: token
        });
    }).catch(function(err) {
         // TODO: Use proper error handling.
        res.status(500).json({err: err});
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // Authentication succeeded.
    res.redirect('/loginSuccess/' + req.user.username);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Logout successful.'}) ;
});

router.get('/signedUrlS3', function(req, res) {
    // Used for creating a pre-signed URL for uploading files to AWS S3 on the client app.
    aws.config.update({ accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey });
    var s3 = new aws.S3();
    var params = {
        Bucket: awsBucket,
        Key: req.query.fileName,
        Expires: 60, // seconds
        ContentType: req.query.fileType,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', params, function (err, url) {
        if (err) {
            console.log(err);
        }
        res.json({ url: url });
    });
});

module.exports = router;