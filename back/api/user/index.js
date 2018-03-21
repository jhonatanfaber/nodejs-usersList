const express = require('express');
const router = express.Router();
var extractor = require('./userController.js');

var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);

router.get('/', extractor.getAllUsers);
router.get('/:username', extractor.getAUser);
router.post('/', extractor.addNewUser);
router.post('/:username/tweets',extractor.addNewTweetToAUser);
router.delete('/:username', extractor.deleteAUser);
router.put('/:username', extractor.updateUserInformation);

module.exports = router;