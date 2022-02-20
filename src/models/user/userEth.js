const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserEthSchema = new Schema({
    publicAddress: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    userId: {
        type: String,
        required: true
    },
    nonce: {
        type: Number,
        required: true,
        default: Math.floor(Math.random() * 1000000)
    }
})

module.exports = mongoose.model('UserEth', UserEthSchema);