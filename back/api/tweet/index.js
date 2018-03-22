const express = require('express');
const router = express.Router();
var extractor = require('./tweetController.js');

router.get('/:id',extractor.getTweet);
router.delete('/:id', extractor.deleteTweet);

module.exports = router;




