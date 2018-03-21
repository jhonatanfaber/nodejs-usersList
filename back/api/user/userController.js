
var fs = require('fs');
var fileUrl = 'users.json';
var getUsersFromFile = fs.readFileSync(fileUrl).toString();
var users = JSON.parse(getUsersFromFile);


module.exports = {
    bodyisEmpty : bodyIsEmpty,
    userNameIsRepeated : userNameIsRepeated,
    addUsers : addUsers,
    addTweets : addTweets,
    getRandomNumber : getRandomNumber
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