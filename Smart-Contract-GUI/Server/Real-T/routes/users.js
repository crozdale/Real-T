const router = require('express').Router();
const user_model = require('../models/users');
const listingModel = require('../models/listing');
const authenticated = require('../middleware/authorization').authenticated();
const isAdmin = require('../middleware/authorization').isAdmin();
const ordersModel = require('../models/orders');
const axios = require('axios');


// User registeration route
router.post('/', async (req, res, next) => {
    try {
        // Extracting user data from the body 
        const { firstName, surname, username, address, role, email, password } = req.body;
        // Creating the user with the provided data
        const user = await user_model.create({
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
        const insertInWPresult = await axios.get(process.env.WP_REGISTER_URL, {
            params: {
                insert_user: "react",
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password,
                user_role: role,
                wallet_address: address,
                user_id: user._id.toString().replace(/^"(.*)"$/, '$1'),
                firstName,
                surname,
            }
        });
        // Sending a success response
        console.log("WP response: ",insertInWPresult);
        res.sendStatus(200);
    } catch (e){
        console.log(e);
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
        const user = await user_model.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true });
        const params = {};
        if (req.body.username) params.username = req.body.username.toLowerCase();
        if (req.body.email) params.email = req.body.email.toLowerCase();
        if (req.body.password) params.password = req.body.password;
        if (req.body.role) params.user_role = req.body.role;
        if (req.body.address) params.wallet_address = req.body.address;
        if (req.body.firstName) params.firstName = req.body.firstName;
        if (req.body.surname) params.surname = req.body.surname;
        params.user_id = user._id.toString().replace(/^"(.*)"$/, '$1');
        
        const WPresult = await axios.get(process.env.WP_UPDATE_URL, { params });
        // Sending a success response
        console.log("WP response: ",WPresult);
        res.sendStatus(200);
    } catch (e){
        console.log(e)
        next("Internal server error: Can't update user");
    }
});

router.delete('/:id', authenticated, isAdmin, async (req, res, next) => {
    try {
        const user = await user_model.findByIdAndDelete({ _id: req.params.id });
        const WPresult = await axios.get(process.env.WP_DELETE_URL, { params: { user_id: user._id.toString().replace(/^"(.*)"$/, '$1') } });
        // Sending a success response
        console.log("WP response: ",WPresult);
        res.sendStatus(200);
    } catch (e){
        console.log(e);
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
        const user = await user_model.findOneAndUpdate({ _id: req.user }, { $set: { 'cart': req.body } }, { new: true }).populate({path:'cart', model: listingModel});
        res.json(user.cart);
    } catch (e){
        next("Internal server error: Can't update your cart");
    }
});

// Get cart listings
router.get('/cart', authenticated, async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: req.user })
        res.json(user.cart);
    } catch {
        next("Internal server error: Can't get cart details");
    }
});

// Get cart listings populated
router.get('/cartPopulated', authenticated, async (req, res, next) => {
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


router.post('/checkout', authenticated, async (req, res, next) => {
    try {
        const { items, date, totalAmount } = req.body;
        await ordersModel.create({
            items,
            customer: req.user,
            date,
            totalAmount
        });
        await items.forEach (async item => {
            await user_model.findByIdAndUpdate(req.user, {$push: {"purchased": item.item} });
            await listingModel.findByIdAndUpdate(item.item, {sold: true, owner: undefined});
        });
        res.sendStatus(200);
    } catch (e){
        next("Error while placing order");
    }
})

router.get('/myOrders', authenticated, async (req, res, next) => {
    try {
        const orders = await ordersModel.find({customer: req.user}).populate({path: 'items.item', model: listingModel}).populate({path: 'customer', model: user_model}).populate({path: 'items.owner', model: user_model})
        res.send(orders);
    } catch (error) {
        console.log(error);
        next("Error while getting orders");
    }
})

module.exports = router;