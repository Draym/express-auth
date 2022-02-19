const User = require("../models/user/user");

const get = (req, res, next) => {
    User.findById(req.query.id, function (error, user) {
        if (error) {
            res.status(500).send({success: false, msg: error})
        } else if (!user) {
            res.status(401).send({success: false, msg: 'User not found.'});
        } else {
            res.json({success: true, user: user});
        }
    })
}

const list = (req, res, next) => {
    User.find({}, function (error, users) {
        res.json({success: true, users: users});
    });
}

module.exports = {
    get,
    list
}