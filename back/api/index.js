var router = express.router();

const usersRouter = require('./controller/userController');
const usersRouter = require('./controller/tweetController');

app.use(express.json());
app.use('/tweets', tweetController);
app.use('/users', userController);