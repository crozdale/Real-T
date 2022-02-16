const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: [4, 'Username must be at least 4 characters'], maxlength: [30, 'Username must be less than 30 characters.'] },
    email: { type: String, required: true, unique: true,
        match:
            [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format"]
    },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    phone: {type: Number}
});

adminSchema.pre('save', async function (next) {
    if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
    next();
    }
});

const Copyright_DB = mongoose.connection.useDb('copyright');
const adminModel = Copyright_DB.model('Admin', adminSchema);
module.exports = adminModel;