const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    items: [{
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const RealT_DB = mongoose.connection.useDb('real-t');
const ordersModel = RealT_DB.model('Order', ordersSchema);
module.exports = ordersModel;