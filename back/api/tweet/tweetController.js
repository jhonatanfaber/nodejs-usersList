var fs = require('fs');

var extractor = require('../../utils.js');
var users =extractor.getUserDataFromJSon();

module.exports = {
    getTweet : getTweet,
    deleteTweet : deleteTweet
}

function getTweet(req, res){
    var lookedTweet = {};
    var id = req.params.id;
    users.forEach(user => user.tweets.forEach(tweet => {
        if (tweet.id == id) {
            lookedTweet = tweet;
        }
    }))
    res.send(lookedTweet);
}

function deleteTweet(req, res){
    var id = req.params.id;
    users.forEach(user => user.tweets = user.tweets.filter(tweet => tweet.id != id));
    fs.writeFileSync(fileUrl, JSON.stringify(users));
}