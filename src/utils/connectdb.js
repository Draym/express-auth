const mongoose = require("mongoose")
const url = process.env.MONGO_DB_CONNECTION_STRING
mongoose.connect(uri = url)
    .then(db => {
        console.log("connected to db")
    })
    .catch(err => {
        console.log(err)
    })