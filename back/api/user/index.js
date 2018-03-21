const express = require('express');
const router = express.Router();
var extractor = require('./userController.js');

var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);

router.get('/', (req, res) => {
    res.json(users);
})

router.get('/:username', (req, res) => {
    var user = users.find(user => user.username == req.params.username);
    if (user == null) {
        return res.sendStatus(400);
    }
    res.send(user);
    return res.sendStatus(200);
})

router.post('/', (req, res) => {
    if (extractor.bodyIsEmpty(req.body)) {
        return res.status(400).send("Body cannot be empty");
    }

    if (extractor.userNameIsRepeated(req.body)) {
        return res.status(400).send("Username already exists");
    }
    var userName = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var tweet = req.body.tweets;
    extractor.addUsers(userName, name, email, tweet);
    return res.status(200).send("Added correctly");
})

router.post('/:username/tweets', (req, res) => {
    var user = users.find(user => user.username == req.params.username);
    if (user == null) {
        return res.status(400).send("Username does not exist");
    }
    var tweet = req.body.tweets.text;
    var userName = req.params.username;
    extractor.addTweets(tweet, userName);
    return res.status(200).send("Tweet Added correctly");
})

router.delete('/:username', (req, res) => {
    var userName = req.params.username;
    var notDeletedUsers = users.filter(user => user.username != userName);
    fs.writeFileSync(fileUrl, JSON.stringify(notDeletedUsers));
})

router.put('/:username', (req, res) => {
    var userName = req.params.username;
    var name = req.body.name;
    var email = req.body.email;
    var containedUser = users.find(user => user.username == userName);
    if (containedUser == null) {
        return res.status(400).send("something went wrong :(");
    }
    users.forEach(user => {
        if (user.username == userName) {
            user.name = name;
            user.email = email;
            fs.writeFileSync('users.json', JSON.stringify(users));
            return res.status(200).send("User information updated correctly");
        }
    })
})

module.exports = router;