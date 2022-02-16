const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, minlength: 1 },
    description: { type: String, required: true, minlength: 1 },
    medium: { type: String, required: true, minlength: 1 },
    size: { type: String, required: true, minlength: 1 },
    image: { type: String, required: true, minlength: 4 },
    priceOfOriginal: { type: Number, required: true, min: 0 },
    priceOfCanvas: { type: Number, required: true, min: 0 },
    priceOfCopy: { type: Number, required: true, min: 0 },
    available: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    sold: { type: Boolean, required: false },
    wpId: { type: String, required: false },
})

const Xeries_DB = mongoose.connection.useDb('xeries');
const listingModel = Xeries_DB.model('Listing', ListingSchema);
module.exports = listingModel;