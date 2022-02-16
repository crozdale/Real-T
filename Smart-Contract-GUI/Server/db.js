const mongoose = require('mongoose');
// Setting database uri from the env. variable
const database = process.env.DATABASE_URI;

// Used to connect to the database
const connect = () => {
    mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if (!err) console.log("Connection to MongoDB started");
        else console.log("Error while connecting to MongoDB ");
    })
}

module.exports = { connect };