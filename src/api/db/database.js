const mongoose = require('mongoose');

const databaseConnection = (databaseURI) => {

    mongoose.connect(databaseURI, { useNewUrlParser: true }).then(() => {
        console.log("Connected to MongoDB!");
    })

}

module.exports = databaseConnection;