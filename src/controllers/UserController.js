const User = require("../models/user/user");
const Api = require("../utils/Api");

const get = (req, res) => {
    if (req.user) {
        User.findById(req.user.id, function (error, user) {
            if (error) {
                Api.error(res, error, 500)
            } else if (!user) {
                Api.error(res, 'User not found.', 401)
            } else {
                Api.success(res, {id: user._id, email: user.email, username: user.username})
            }
        })
    } else {
        Api.error(res, 'Missing user ID from Authentication.', 403)
    }
}

module.exports = {
    get
}