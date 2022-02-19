const User = require("../models/user/user");
const jwt = require("jsonwebtoken");
const Api = require("../utils/Api");

const secret = process.env.JWT_SECRET

const signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        Api.error(res, 'Please provide email and password.', 400)
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

const login = (req, res) => {
    User.findOne({email: req.body.email}, function (error, user) {
        if (error) {
            Api.error(res, error, res)
        } else if (!user) {
            Api.error(res, 'Authentication failed. User not found.', 401)
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
                    Api.error(res, 'Authentication failed. Wrong password.', 403)
                }
            });
        }
    });
}

module.exports = {
    signup,
    login
}