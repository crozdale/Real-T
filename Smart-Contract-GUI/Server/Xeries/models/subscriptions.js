const mongoose = require('mongoose');

const subscSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true,
        match:
            [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format"]
    },
});

const XeriesDB = mongoose.connection.useDb('xeries');
const subscModel = XeriesDB.model('Subscription', subscSchema);
module.exports = subscModel;