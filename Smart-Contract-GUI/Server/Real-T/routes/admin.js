const router = require('express').Router();
const user_model = require('../models/users');
const admin_model = require('../models/admins');
const subsc_model = require('../models/subscriptions');
const text_model = require('../models/texts');
const authenticated = require('../middleware/authorization').authenticated();
const isAdmin = require('../middleware/authorization').isAdmin();


// User registeration route
router.post('/', async (req, res, next) => {
    try {
        // Extracting admin data from the body 
        const { username, phone, email, password } = req.body;
        // Creating the admin with the provided data
        await admin_model.create({
            username: username.toLowerCase(),
            phone: phone || null,
            email: email.toLowerCase(),
            password,
        })
        // Sending a success response
        res.sendStatus(200);
    } catch (e){
        console.log(e)
        // if admin is already exist, Sending an error code of 421
        if (e.code === 11000) res.status(421).json(e);
        // if other validation rules error, Sending an error code of 422 
        else if (e.name === 'ValidationError') res.sendStatus(422);
        // if internal server error send a server-error response
        else res.status(500).send("Internal server error");
    }
});

router.get('/', authenticated, isAdmin, async (req, res) => {
    try {
        const admins = await admin_model.find({});
        res.json(admins);
    } catch (err) {
        return res.status(500).send("Internal server error: Can't get admins");
    }
});

router.patch('/', authenticated, isAdmin, async (req, res, next) => {
    try {
        await admin_model.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't update admin");
    }
});

router.delete('/:id', authenticated, isAdmin, async (req, res, next) => {
    try {
        await admin_model.findByIdAndDelete({ _id: req.params.id });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't delete admin");
    }
});

router.post('/statistics', authenticated, isAdmin, async(req, res, next) => {
    try{
        const users = await user_model.count({});
        const admins = await admin_model.count({});
        const landlords = await user_model.count({role: 'landlord'});
        const tenants = await user_model.count({role: 'tenant'});
        const arbitrators = await user_model.count({role: 'arbitrator'});
        const promoters = await user_model.count({role: 'promoter'});
        const subscribers = await subsc_model.count({});
        res.json({
            users,
            admins,
            landlords,
            tenants,
            arbitrators,
            promoters,
            subscribers
        });
    }catch{
        res.sendStatus(500);
    }
});

router.get('/texts', async (req, res) => {
    try {
        const texts = await text_model.findOne({});
        res.json(texts);
    } catch (err) {
        return res.status(500).send("Internal server error: Can't get texts");
    }
});

router.post('/texts', authenticated, isAdmin, async (req, res, next) => {
    try {
        await text_model.create(req.body);
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't add texts");
    }
});

router.patch('/texts', authenticated, isAdmin, async (req, res, next) => {
    try {
        await text_model.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't update admin");
    }
});

module.exports = router;