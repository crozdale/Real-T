const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, minlength: 1 },
    description: { type: String, required: true, minlength: 1 },
    image: { type: String, required: true, minlength: 4 },
    price: { type: Number, required: true, min: 0 },
    available: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const RealT_DB = mongoose.connection.useDb('real-t');
const listingModel = RealT_DB.model('Listing', ListingSchema);
module.exports = listingModel;