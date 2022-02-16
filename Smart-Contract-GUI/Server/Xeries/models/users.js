const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: [2, 'First name must be at least 2 characters'], maxlength: [30, 'First name must be less than 30 characters.'] },
    surname: { type: String, required: true, minlength: [2, 'Surname must be at least 2 characters'], maxlength: [30, 'Surname must be less than 30 characters.'] },
    username: { type: String, required: true, minlength: [4, 'Username must be at least 4 characters'], maxlength: [30, 'Username must be less than 30 characters.'] },
    address: { type: String, required: true, 
        match: [/^0x[a-fA-F0-9]{40}$/, "Invalid ethereum address"]
    },
    email: { type: String, required: true,
        match:
            [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format"]
    },
    password: { type: String, required: true, minlength: [8, "Password must be at least 8 characters"] },
    role: { type: String, enum: ["artOwner", "customer", "insurer", "promoter"], required: true },
    cart: [{
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
        purchaseType: { type: String, required: true, enum: ['original', 'copy', 'canvas']}
    }],
    purchased: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }],
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }],
    wpId: { type: String, required: false },
})

userSchema.index({ address: 1, username: 1, role: 1}, { unique: true });
userSchema.index({ email: 1, role:1}, { unique: true });
userSchema.index({ username: 1, role:1}, { unique: true });

userSchema.pre('save', async function (next) {
    if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
    next();
    }
});

const XeriesDB = mongoose.connection.useDb('xeries');
const userModel = XeriesDB.model('User', userSchema);
module.exports = userModel;