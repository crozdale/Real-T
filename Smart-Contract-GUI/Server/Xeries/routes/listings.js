const router = require('express').Router();
const listingModel = require('../models/listing');
const userModel = require('../models/users');
const authenticated = require('../middleware/authorization').authenticated();
const multer = require('../middleware/multer');
const axios = require('axios');
// Don't forget to create the images folder first

// Add a new listing
router.post('/', authenticated, multer.upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const { name, description, priceOfOriginal, priceOfCopy, priceOfCanvas, medium, size } = req.body;
        const image = url + '/static/public/images/' + req.file.filename;
        const listing = await listingModel.create({
            name,
            image,
            description,
            medium,
            size,
            priceOfOriginal,
            priceOfCopy,
            priceOfCanvas,
            owner: req.user,
            available: true,
            sold: false,
        });
        await userModel.findByIdAndUpdate(req.user,{$push: {"listings": listing._id} });
        const insertInWPresult = await axios.get(process.env.WP_ADD_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
                token_name: name,
                original_price: priceOfOriginal,
                canvas_copy_price: priceOfCanvas,
                paper_copy_price: priceOfCopy,
                product_author: req.user,
                product_img: image,
                category: "Art",
            }
        }); 
        console.log('WP: ',insertInWPresult);
        res.send(listing)
    } catch(e){
        console.log(e);
        next("Erorr while adding a listing");
    }
});

// Get all listings
router.get('/', async (req, res, next) => {
    try {
        const listings = await listingModel.find({available: true}).populate({ path: "owner", model: userModel, select: {"password": 0}}).sort({"_id": -1});
        res.send(listings);
    } catch (err) {
        next("Internal server error: Couldn't get available listings");
    }
});

// Get all listings for a user
router.get('/user/:id', async (req, res, next) => {
    try {
        const listings = await listingModel.find({owner: req.params.id}).sort({"_id": -1});
        res.send(listings);
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get listings for this user");
    }
});

// Get all listings for a user by username
router.get('/personal/:username', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ username: req.params.username.toLowerCase() });
        if (user){
            const listings = await listingModel.find({available: true, owner: user._id}).populate({ path: "owner", model: userModel, select: {"password": 0}}).sort({"_id": -1});
            res.send(listings);
        } else {
            res.sendStatus(402);
        }
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get listings for this user");
    }
});

// Get a specific listing
router.get('/:id', async (req, res, next) => {
    try {
        const listing = await listingModel.findOne({_id: req.params.id}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        res.send(listing);
    } catch (err) {
        next("Internal server error: Couldn't get listing");
    }
});

// Update a listing
router.patch('/:id', authenticated, multer.upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    if (req.file) req.body.image = url + '/static/public/images/' + req.file.filename;
    try {
        const listing = await listingModel.findOneAndUpdate({_id: req.params.id, owner: req.user}, { $set: req.body }, { new: true, runValidators: true })
        if (!listing) next("listing not found");
        const WPresult = await axios.get(process.env.WP_UPDATE_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1'),
                token_name: req.body.name || listing.name,
                original_price: req.body.priceOfOriginal || listing.priceOfOriginal,
                canvas_copy_price: req.body.priceOfCanvas || listing.priceOfCanvas,
                paper_copy_price: req.body.priceOfCopy || listing.priceOfCopy,
                product_author: req.user,
                product_img: req.body.image || listing.image,
            }
        }); 
        console.log('WP: ',WPresult);
        res.json(listing);
    } catch (e) {
        console.log(e);
        next("Error in editing a listing")
    }
});

// Delete a listing
router.delete('/:id', authenticated, async (req, res, next) => {
    try {
        const listing = await listingModel.findOneAndDelete({_id: req.params.id, owner: req.user});
        if (!listing) next("listing not found");
        const WPresult = await axios.get(process.env.WP_DELETE_PRODUCT, {
            params: {
                product_id: listing._id.toString().replace(/^"(.*)"$/, '$1')
            }
        }); 
        console.log('WP: ',WPresult);
        res.json(listing);
    } catch (e) {
        console.log(e);
        next("Error in removing a listing")
    }
});

module.exports = router
