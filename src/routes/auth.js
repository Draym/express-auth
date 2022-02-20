const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/authController");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new account
 *     description: Create a new account.
 *     produces:
 *       - application/json
 */
router.post('/signup', AuthController.signup);

/**
 * @swagger
 * /auth/signup/eth-linked:
 *   post:
 *     summary: Create a new account associated with an ETH wallet
 *     description: Create a new account associated with an ETH wallet.
 *     produces:
 *       - application/json
 */
router.post('/signup/eth-linked', AuthController.signupWithETH);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     description: Authenticate the user and generate a JWT token
 *     produces:
 *       - application/json
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/quick-login/eth:
 *   post:
 *     summary: Login to the application using an ETH wallet
 *     description: Authenticate the user through en encrypted signature and generate a JWT token
 *     produces:
 *       - application/json
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
 */
router.get('/quick-login/eth/get-nonce', AuthController.quickLogin.ethGetNonce);

module.exports = router;
