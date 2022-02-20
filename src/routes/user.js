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
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: token
 *         schema:
 *           type: string
 *           format: JWT
 *         required: true
 *     responses:
 *       200:
 *         description: Current User
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 */
router.get('/get', passport.authenticate('jwt', {session: false}), UserController.get);

module.exports = router;
