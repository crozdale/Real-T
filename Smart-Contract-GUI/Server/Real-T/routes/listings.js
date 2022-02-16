const router = require('express').Router();
const listingModel = require('../models/listing');
const userModel = require('../models/users');
const authenticated = require('../middleware/authorization').authenticated();
const multer = require('../middleware/multer');

// Don't forget to create the images folder first

// Add a new listing
router.post('/', authenticated, multer.upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const { name, description, price } = req.body;
        const listing = await listingModel.create({
            name,
            image: url + '/real-t/public/images/' + req.file.filename,
            description,
            price,
            owner: req.user,
            available: true
        });
        await userModel.findByIdAndUpdate(req.user,{$push: {"listings": listing._id} });
        res.send(listing)
    } catch{
        next("Erorr while adding a listing");
    }
});

// Get all listings
router.get('/', async (req, res, next) => {
    try {
        const listings = await listingModel.find({available: true}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get available listings");
    }
});

// Get all listings for a user
router.get('/user/:id', async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).populate({ path: 'listings', model: listingModel});
        res.send(user.listings);
    } catch (err) {
        next("Internal server error: Couldn't get listings for this user");
    }
});

// Get a specific listing
router.get('/:id', async (req, res, next) => {
    try {
        const listing = await listingModel.find({_id: req.params.id}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        res.send(listing);
    } catch (err) {
        next("Internal server error: Couldn't get listing");
    }
});

// Update a listing
router.patch('/:id', authenticated, multer.upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    if (req.file) req.body.image = url + '/real-t/public/images/' + req.file.filename;
    try {
        const listing = await listingModel.findOneAndUpdate({_id: req.params.id, owner: req.user}, { $set: req.body }, { new: true, runValidators: true })
        if (!listing) next("listing not found");
        res.json(listing);
    } catch{
        next("Error in editing a listing")
    }
});

// Delete a listing
router.delete('/:id', authenticated, async (req, res, next) => {
    try {
        const listing = await listingModel.findOneAndDelete({_id: req.params.id, owner: req.user});
        if (!listing) next("listing not found");
        res.json(listing);
    } catch{
        next("Error in removing a listing")
    }
});

module.exports = router
