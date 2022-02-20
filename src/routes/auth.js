const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/authController");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new account
 *     description: Create a new account.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - username
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Newly created User
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
router.post('/signup', AuthController.signup);

/**
 * @swagger
 * /auth/signup/eth-linked:
 *   post:
 *     summary: Create a new account associated with an ETH wallet
 *     description: Create a new account associated with an ETH wallet.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create with his ETH public address.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - username
 *             - password
 *             - publicAddress
 *           properties:
 *             email:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             publicAddress:
 *               type: string
 *     responses:
 *       200:
 *         description: Newly created User
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
router.post('/signup/eth-linked', AuthController.signupWithETH);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     description: Authenticate the user and generate a JWT token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: authentication
 *         description: User email and password.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Creation of a JWT
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/quick-login/eth:
 *   post:
 *     summary: Login to the application using an ETH wallet
 *     description: Authenticate the user through en encrypted signature and generate a JWT token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: authentication
 *         description: User ETH publicAddress and signature
 *         schema:
 *           type: object
 *           required:
 *             - publicAddress
 *             - signature
 *           properties:
 *             publicAddress:
 *               type: string
 *             signature:
 *               type: string
 *     responses:
 *       200:
 *         description: Creation of a JWT
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 */
router.post('/quick-login/eth', AuthController.quickLogin.ethLogin);

/**
 * @swagger
 * /auth/quick-login/eth/get-nonce:
 *   get:
 *     summary: Get nonce value
 *     description: Get the secret necessary to login using ETH wallet
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
 *         description: Get a nonce used to produce a signature
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 nonce:
 *                   type: string
 *                   description: Nonce token
 */
router.get('/quick-login/eth/get-nonce', AuthController.quickLogin.ethGetNonce);

module.exports = router;
