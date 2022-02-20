const express = require('express');
const passport = require("passport");
const UserController = require("../controllers/userController");
const router = express.Router();

router.get('/get', passport.authenticate('jwt', {session: false}), UserController.get);

module.exports = router;
