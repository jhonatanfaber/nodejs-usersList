var fs = require('fs');

module.exports = {
    getUserDataFromJSon : getUserDataFromJSon
}

function getUserDataFromJSon() {
    var fileUrl = 'users.json';
    var getUsersFromFile = fs.readFileSync(fileUrl).toString();
    return JSON.parse(getUsersFromFile);
}
