const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const logger = require('morgan');
const cors = require("cors")
const passport = require('passport');

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}
require('./src/utils/connectDb')
require('./src/config/passportConfig')(passport);

const indexRouter = require('./src/routes');
const userRouter = require('./src/routes/user');
const usersAdminRouter = require('./src/routes/users.admin');
const authRouter = require('./src/routes/auth');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json())

app.use(cors());
app.use(passport.initialize(undefined));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/users', usersAdminRouter);
app.use('/api/auth', authRouter);

module.exports = app;
