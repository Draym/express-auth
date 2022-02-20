const jwt = require("jsonwebtoken");
const ethUtil = require("ethereumjs-util");
const sigUtil = require("@metamask/eth-sig-util");

const User = require("../models/user/user");
const UserEth = require("../models/user/userEth");
const Api = require("../utils/api");

const secret = process.env.JWT_SECRET

const signup = (req, res) => {
    if (!req.body.email) {
        Api.error(res, 'Please provide an email.', 400)
    } else if (!req.body.password) {
        Api.error(res, 'Please provide a password.', 400)
    } else if (!req.body.username) {
        Api.error(res, 'Please provide an username.', 400)
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err, user) {
            if (err) {
                Api.error(res, 'Email already exists.', 400)
            } else {
                Api.success(res, {id: user.id, email: user.email, username: user.username})
            }
        });
    }
}

const signupWithETH = (req, res) => {
    if (!req.body.email) {
        Api.error(res, 'Please provide an email.', 400)
    } else if (!req.body.password) {
        Api.error(res, 'Please provide a password.', 400)
    } else if (!req.body.username) {
        Api.error(res, 'Please provide an username.', 400)
    } else if (!req.body.publicAddress) {
        Api.error(res, 'Please provide your Metamask public address.', 400)
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err, user) {
            if (err) {
                Api.error(res, 'Email already exists.', 400)
            } else {
                const newUserEth = new UserEth({
                    userId: user._id,
                    publicAddress: req.body.publicAddress
                });
                newUserEth.save(function (err, userEth) {
                    if (err) {
                        Api.error(res, 'PublicAddress already exists.', 400)
                    } else {
                        Api.success(res, {id: user.id, email: user.email, username: user.username})
                    }
                });
            }
        });
    }
}

const login = (req, res) => {
    User.findOne({email: req.body.email}, function (error, user) {
        if (error) {
            Api.error(res, error, res)
        } else if (!user) {
            Api.error(res, 'Authentication failed: User not found.', 403)
        } else {
            user.comparePassword(req.body.password, function (error, isMatch) {
                if (isMatch && !error) {
                    const payload = {id: user._id, email: user.email};
                    jwt.sign(payload, secret, {expiresIn: 360000},
                        (error, token) => {
                            if (error) {
                                Api.error(res, 'Error signing token.', 500)
                            } else {
                                Api.success(res, {token: `JWT ${token}`})
                            }
                        });
                } else {
                    Api.error(res, 'Authentication failed: Wrong password.', 403)
                }
            });
        }
    });
}


const ethLogin = (req, res) => {
    UserEth.findOne({publicAddress: req.body.publicAddress}, function (error, userEth) {
        if (error) {
            Api.error(res, error, res)
        } else if (!userEth) {
            Api.error(res, 'Authentication failed: PublicAddress not found.', 403)
        } else {
            const msg = `Signing with Metamask: ${userEth.nonce}`;

            const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
            const resultAddress = sigUtil.recoverPersonalSignature({
                data: msgBufferHex,
                signature: req.body.signature
            });

            if (resultAddress.toLowerCase() === userEth.publicAddress.toLowerCase()) {
                User.findOne({email: userEth.email}, function (error, user) {
                    if (error) {
                        Api.error(res, error, res)
                    } else if (!user) {
                        Api.error(res, 'Authentication failed: User not found.', 403)
                    } else {
                        const payload = {id: user._id, email: user.email};
                        jwt.sign(payload, secret, {expiresIn: 360000},
                            (error, token) => {
                                if (error) {
                                    Api.error(res, 'Error signing token.', 500)
                                } else {
                                    userEth.nonce = Math.floor(Math.random() * 1000000);
                                    userEth.save();
                                    Api.success(res, {token: `JWT ${token}`})
                                }
                            });
                    }
                })
            } else {
                Api.error(res, 'Authentication failed: Wrong signature verification.', 403)
            }
        }
    });
}

const ethGetNonce = (req, res) => {
    UserEth.findOne({publicAddress: req.query.publicAddress}, function (error, userEth) {
        if (error) {
            Api.error(res, error, res)
        } else if (!userEth) {
            Api.error(res, 'PublicAddress not found.', 403)
        } else {
            Api.success(res, {nonce: userEth.nonce})
        }
    });
}
module.exports = {
    signup,
    signupWithETH,
    login,
    quickLogin: {
        ethLogin,
        ethGetNonce
    }
}