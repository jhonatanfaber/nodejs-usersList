const express = require('express');
const router = express.Router();

var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);


router.get('/:id', (req, res) => {
    var lookedTweet = {};
    var id = req.params.id;
    users.forEach(user => user.tweets.forEach(tweet => {
        if (tweet.id == id) {
            lookedTweet = tweet;
        }
    }))
    res.send(lookedTweet);
})


router.delete('/:id', (req, res) => {
    var id = req.params.id;
    users.forEach(user => user.tweets = user.tweets.filter(tweet => tweet.id != id));
    fs.writeFileSync(fileUrl, JSON.stringify(users));
})

module.exports = router;




