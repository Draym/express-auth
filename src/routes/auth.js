const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post('/signup', AuthController.signup);

router.post('/signup/eth-linked', AuthController.signupWithETH);

router.post('/login',  AuthController.login);

router.post('/quick-login/eth',  AuthController.quickLogin.ethLogin);
router.get('/quick-login/eth/get-nonce',  AuthController.quickLogin.ethGetNonce);

module.exports = router;
