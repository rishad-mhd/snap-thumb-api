const mongoose = require('mongoose')

function connectMongo() {
    mongoose.connect(process.env.MONGO_URI).then((response) => {
        console.log("Connected to database")
    }).catch(e => {
        console.log(e);
    })
}

module.exports = connectMongo