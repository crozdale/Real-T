const router = require('express').Router();
const user_model = require('../models/users');
const authenticated = require('../middleware/authorization').authenticated();
const isAdmin = require('../middleware/authorization').isAdmin();
const bcrypt = require('bcrypt');

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
        })

        await mailsent(email.toLowerCase());
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

// User registeration route
router.post('/login', async (req, res, next) => {
    try {
        // Extracting user data from the body 
        const { email, password } = req.body;

        const user = await user_model.findOne({email : email});
        if(user && user.password) {
            await bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.send(206)
                } else if(result) {
                    res.sendStatus(200);
                } else {
                    res.send(206)
                }
            });
        } else {
            res.sendStatus(205);
        }
    } catch (e){
        res.status(500).send("Internal server error");
    }
})

function mailsent(email) {
    try {
        // const nodemailer = require('nodemailer'); 
        // let mailTransporter = nodemailer.createTransport({ 
        //     service: 'gmail', 
        //     auth: { 
        //         user: 'devtest6785@gmail.com', 
        //         pass: 'helloworld123'
        //     } 
        // }); 

        // let mailDetails = { 
        //     from: 'devtest6785@gmail.com', 
        //     to: email, 
        //     subject: 'Thankyou for registering', 
        //     text: 'Thanks for completing your registration. This email is being sent to confirm you are registered successfully on our platform.'
        // }; 
          
        // mailTransporter.sendMail(mailDetails, function(err, data) {
        //     console.log(err)
        //     if(err) { 
        //         console.log('Error Occurs'); 
        //     } else { 
        //         console.log('Email sent successfully'); 
        //     } 
        // });

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey('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');
        const msg = {
          to: email,
          from: 'devtest6785@gmail.com',
          subject: 'Thankyou for registering',
          text:'Thanks for completing your registration. This email is being sent to confirm you are registered successfully on our platform.',
          html: 'Thanks for completing your registration. This email is being sent to confirm you are registered successfully on our platform.',
        };
        sgMail.send(msg).then(() => {}, error => {
            console.error(error);
         
            if (error.response) {
              console.error(error.response.body)
            }
          });
        return true;
    } catch(err) {
        console.log(err);
    } 
}

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

module.exports = router;