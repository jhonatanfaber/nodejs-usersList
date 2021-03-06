const express = require('express');
const app = express();

const userController = require('./api/user/index.js');
const tweetController = require('./api/tweet/index.js');

app.use(express.json()); 
app.use('/users', userController);
app.use('/tweets', tweetController);


app.listen(3000, () => {
    console.log("Server running on port 3000");
})