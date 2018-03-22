const express = require('express');
const router = express.Router();
var extractor = require('./userController.js');

router.get('/',  extractor.getAllUsers);
router.get('/:username', extractor.getAUser);
router.post('/', extractor.addNewUser);
router.post('/:username/tweets',extractor.addNewTweetToAUser);
router.delete('/:username', extractor.deleteAUser);
router.put('/:username', extractor.updateUserInformation);

module.exports = router;