
var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);


module.exports = {
    getAllUsers: getAllUsers,
    getAUser : getAUser,
    addNewUser : addNewUser,
    addNewTweetToAUser : addNewTweetToAUser,
    deleteAUser : deleteAUser,
    updateUserInformation : updateUserInformation,
}

function getAllUsers(req, res){
    res.json(users);
}

function getAUser(req, res){
    var user = users.find(user => user.username == req.params.username);
    if (user == null) {
        return res.sendStatus(400);
    }
    return res.status(200).json(user);
}

function addNewUser(req, res){
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
}

function addNewTweetToAUser(req, res){
    var user = users.find(user => user.username == req.params.username);
    if (user == null) {
        return res.status(400).send("Username does not exist");
    }
    var tweet = req.body.tweets.text;
    var userName = req.params.username;
    extractor.addTweets(tweet, userName);
    return res.status(200).send("Tweet Added correctly");
}

function deleteAUser(req, res){
    var userName = req.params.username;
    var notDeletedUsers = users.filter(user => user.username != userName);
    fs.writeFileSync(fileUrl, JSON.stringify(notDeletedUsers));
}

function updateUserInformation(req, res){
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
}


function bodyIsEmpty(req) {
    if (req.username == null || req.name == null || req.email == null) {
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