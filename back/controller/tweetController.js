const express = require('express');
var fs = require('fs');
var router = express.router();

const app = express();
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:username', (req, res) => {
    var user = users.filter(user => {
        if (user.username == req.params.username) {
            res.send(user);
            return res.sendStatus(200);
        }
        return res.sendStatus(400);
    })
})

app.get('/tweets/:id', (req, res) => {
    var lookedTweet = {};
    var id = req.params.id;
    users.forEach(user => user.tweets.forEach(tweet => {
        if (tweet.id == id) {
            lookedTweet = tweet;
        }
    }))
    res.send(lookedTweet);
})

app.post('/users', (req, res) => {
    if (bodyIsEmpty(req.body)) {
        return res.status(400).send("Body cannot be empty");
    }
    if (userNameIsRepeated(req.body)) {
        return res.status(400).send("Username already exists");
    }
    var userName = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var tweet = req.body.tweets;
    addUsers(userName, name, email, tweet);
    return res.status(200).send("Added correctly");
})

app.post('/users/:username/tweets', (req, res) => {
    var user = users.find(user => user.username == req.params.username);
    if(user == null){
        return res.status(400).send("Username does not exist");
    }
    var tweet = req.body.tweets.text;
    var userName = req.params.username;
    addTweets(tweet, userName);
    return res.status(200).send("Tweet Added correctly");
})

app.delete('/users/:username', (req, res) => {
    var userName = req.params.username;
    var notDeletedUsers = users.filter(user => user.username != userName);
    fs.writeFileSync(fileUrl, JSON.stringify(notDeletedUsers));
})

app.delete('/tweets/:id', (req, res) => {
    var id = req.params.id;
    users.forEach(user => user.tweets = user.tweets.filter(tweet => tweet.id != id));
    fs.writeFileSync(fileUrl, JSON.stringify(users));
})

app.put('/users/:username', (req, res) => {
    var userName = req.params.username;
    var name = req.body.name;
    var email = req.body.email;
    var containedUser = users.find(user => user.username == userName);
    if(containedUser == null){
        return res.status(400).send("something went wrong :(");
    }
    users.forEach(user => {
        if( user.username == userName){
            user.name = name;
            user.email = email; 
            fs.writeFileSync(fileUrl, JSON.stringify(users));
            return res.status(200).send("User information updated correctly");
        }
    })
})

function bodyIsEmpty(req) {
    if (req.username == null || req.name == null || req.email == null) {
        return true;
    }
    return false;
}

function bodyTweetIsEmpty(req) {
    if (req.tweets.text == "") {
        return true;
    }
    return false;
}

function userNameIsRepeated(req) {
    if (users.find(user => user.username == req.username)) {
        return true;
    }
    return false;
}

function addUsers(userName, name, email, tweets = []) {
    newUser = {
        "username": userName,
        "name": name,
        "id": userName + "-" + getRandomNumber(),
        "email": email,
        "tweets": tweets
    };
    users.push(newUser);
    fs.writeFileSync(fileUrl, JSON.stringify(users));
}

function addTweets(tweet, userName) {
    newTweet = {
        "id": getRandomNumber(),
        "text": tweet,
        "owner": userName,
        "createdAt": Date.now()
    };
    users.forEach(user => {
        if (user.username == userName) {
            user.tweets.push(newTweet);
        }
    })
    fs.writeFileSync(fileUrl, JSON.stringify(users));
}

function getRandomNumber() {
    return Math.floor((Math.random() * 999) + 1);
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
})