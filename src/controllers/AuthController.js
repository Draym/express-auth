const User = require("../models/user/user");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET

const signup = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({success: false, msg: 'Please provide username and password.'});
    } else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err) {
            if (err) {
                return res.status(400).json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'New user has been created successfully.'});
        });
    }
}

const login = (req, res) => {
    User.findOne({username: req.body.username}, function (error, user) {
        if (error) {
            res.status(500).send({success: false, msg: error})
        } else if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (error, isMatch) {
                if (isMatch && !error) {
                    const payload = {id: user._id, username: user.username};
                    jwt.sign(payload, secret, {expiresIn: 360000},
                        (error, token) => {
                            if (error) {
                                res.status(500).json({error: "Error signing token", raw: error});
                            } else {
                                res.json({success: true, token: `JWT ${token}`});
                            }
                        });
                } else {
                    res.status(403).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
}

module.exports = {
    signup,
    login
}