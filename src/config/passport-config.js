const {ExtractJwt} = require('passport-jwt');
const User = require('../models/user/user');
const JwtStrategy = require("passport-jwt/lib/strategy");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            console.log(payload)
            User.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, {id: user._id, username: user.username});
                    }
                    return done(null, false);
                }).catch(err => console.error(err));
        })
    )
}