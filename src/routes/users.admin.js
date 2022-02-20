const express = require('express');
const passport = require("passport");
const UsersAdminController = require("../controllers/usersAdminController");
const router = express.Router();

const restricted = () => passport.authenticate('jwt', {session: false})

// TODO add Admin role management
router.get('/get', restricted(), UsersAdminController.get);

// TODO add Admin role management
router.get('/list', restricted(), UsersAdminController.list);

module.exports = router;
