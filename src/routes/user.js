const express = require('express');
const passport = require("passport");
const UserController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get request user information
 *     description: Get User associated to the JWT token from the request header.
 */
router.get('/get', passport.authenticate('jwt', {session: false}), UserController.get);

module.exports = router;
