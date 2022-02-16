const router = require('express').Router();
const user_model = require('../models/users');
const listingModel = require('../models/listing');
const authenticated = require('../middleware/authorization').authenticated();
const isAdmin = require('../middleware/authorization').isAdmin();


// User registeration route
router.post('/', async (req, res, next) => {
    try {
        // Extracting user data from the body 
        const { firstName, surname, username, address, role, email, password } = req.body;
        // Creating the user with the provided data
        await user_model.create({
            firstName,
            surname,
            username: username.toLowerCase(),
            address,
            role,
            email: email.toLowerCase(),
            password,
            cart: [],
            purchased: [],
            listings: []
        })
        // Sending a success response
        res.sendStatus(200);
    } catch (e){
        // if user is already exist, Sending an error code of 421
        if (e.code === 11000) res.status(421).json(e);
        // if other validation rules error, Sending an error code of 422 
        else if (e.name === 'ValidationError') res.sendStatus(422);
        // if internal server error send a server-error response
        else res.status(500).send("Internal server error");
    }
})

router.get('/', authenticated, isAdmin, async (req, res) => {
    try {
        const users = await user_model.find({});
        res.json(users);
    } catch (err) {
        return res.status(500).send("Internal server error: Can't get users");
    }
});

router.patch('/', authenticated, isAdmin, async (req, res, next) => {
    try {
        await user_model.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't update user");
    }
});

router.delete('/:id', authenticated, isAdmin, async (req, res, next) => {
    try {
        await user_model.findByIdAndDelete({ _id: req.params.id });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't delete user");
    }
});

router.get('/me', authenticated, async (req, res, next) => {
    try {        
        const user = await user_model.findOne({_id : req.user});
        const {__v, _id, password, ...userData} = user._doc;
        res.send(userData);
    } catch (e){
        res.sendStatus(500);
    }
})

// Add a listing to cart
router.post('/cart', authenticated, async (req, res, next) => {
    try {
        await user_model.findOneAndUpdate({ _id: req.user }, { $push: { "cart": req.body._id } }, {new: true});
        res.sendStatus(200);
    } catch (e){
        next("Internal server error: Can't add item to your cart");
    }
});

// Update cart listings
router.patch('/cart', authenticated, async (req, res, next) => {
    try {
        const user = await user_model.findOneAndUpdate({ _id: req.user }, { $set: { 'cart': req.body.cart } }, { new: true }).populate({path:'cart', model: listingModel});
        res.json(user.cart);
    } catch (e){
        next("Internal server error: Can't update your cart");
    }
});

// Get cart listings
router.get('/cart', authenticated, async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: req.user }).populate({path:'cart', model: listingModel});
        res.json(user.cart);
    } catch {
        next("Internal server error: Can't get cart details");
    }
});

// Get purchase history
router.get('/purchased', authenticated, async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: req.user }).populate({ path: 'purchased', model: listingModel});
        res.json(user.purchased);
    } catch {
        next("Internal server error: Can't get purchased details");
    }
});

module.exports = router;