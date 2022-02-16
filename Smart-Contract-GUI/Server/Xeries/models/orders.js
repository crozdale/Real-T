const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    address: { type: String, required: true, minlength: 9 },
    totalAmount: { type: Number, required: true, min: 0 },
    items: [{
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
        purchaseType: { type: String, required: true, enum: ['original', 'copy', 'canvas']},
        artOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Xeries_DB = mongoose.connection.useDb('xeries');
const ordersModel = Xeries_DB.model('Order', ordersSchema);
module.exports = ordersModel;