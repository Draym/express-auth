const User = require("../models/user/user");

const get = (req, res) => {
    if (req.user) {
        User.findById(req.user.id, function (error, user) {
            if (error) {
                res.status(500).send({success: false, msg: error})
            } else if (!user) {
                res.status(401).send({success: false, msg: 'User not found.'});
            } else {
                res.json({success: true, user: user});
            }
        })
    } else {
        res.status(403).json({success: false, msg: 'Missing user ID from Authentication.'})
    }
}

module.exports = {
    get
}