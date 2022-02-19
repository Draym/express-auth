const User = require("../models/user/user");
const Api = require("../utils/Api");

const get = (req, res, next) => {
    User.findById(req.query.id, function (error, user) {
        if (error) {
            Api.error(res, error, 403)
        } else if (!user) {
            Api.error(res, 'User not found.', 403)
        } else {
            Api.success(res, {id: user._id, username: user.username})
        }
    })
}

const list = (req, res, next) => {
    User.find({}, function (error, users) {
        Api.success(res, {users: users})
    });
}

module.exports = {
    get,
    list
}