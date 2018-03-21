const express = require('express');
const router = express.Router();
var extractor = require('./tweetController.js');

var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);

router.get('/:id',extractor.getTweet);
router.delete('/:id', extractor.deleteTweet);

module.exports = router;




