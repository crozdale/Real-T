const router = require('express').Router();
const subscribtion_model = require('../models/subscriptions');
const authenticated = require('../middleware/authorization').authenticated();
const isAdmin = require('../middleware/authorization').isAdmin();
// User subscribe route
router.post('/', async (req, res, next) => {
    try {
        // Extracting user email from the body 
        const { email } = req.body;
        await subscribtion_model.create({ email: email.toLowerCase() })
        // Sending a success response
        res.sendStatus(200);
    } catch (e){
        console.log(e)
        // if email is already exist, Sending an error code of 421
        if (e.code === 11000) res.status(421).send();
        // if other validation rules error, Sending an error code of 422 
        else if (e.name === 'ValidationError') res.sendStatus(422);
        // if internal server error send a server-error response
        else res.status(500).send("Internal server error");
    }
})

router.get('/', authenticated, isAdmin, async (req, res) => {
    try {
        const subscribers = await subscribtion_model.find({});
        res.json(subscribers);
    } catch (err) {
        return res.status(500).send("Internal server error: Can't get subscribers");
    }
});

router.patch('/', authenticated, isAdmin, async (req, res, next) => {
    try {
        await subscribtion_model.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't update subscriber");
    }
});

router.delete('/:id', authenticated, isAdmin, async (req, res, next) => {
    try {
        await subscribtion_model.findByIdAndDelete({ _id: req.params.id });
        res.sendStatus(200);
    } catch {
        next("Internal server error: Can't delete subscriber");
    }
});

module.exports = router