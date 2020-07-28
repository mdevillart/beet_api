const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const User = require('../models/User');
const router = express.Router();

function generateToken(params = {} ) {
return token = jwt.sign(params, authConfig.secret, {
    expiresIn: 84600,
});
}

router.post('/register', async (req,res) =>{
    const { email } = req.body;
    try {
        if (await User.findOne({
            email
            }))
        return res.status(400).send({ 
            error: "User already exists"
            })

        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({
            user,
            token: generateToken({ id: user.id, email: user.email, name: user.name }),
        });
    }
    catch (err) {
        return res.status(400).send({
            error: "Registration failed"
        });
    }
});


router.post('/authenticate', async (req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: "User not found"});
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: "Invalid password" });

    user.password = undefined;

    res.send({ 
        user,
        token: generateToken({ id: user.id, email: user.email, name: user.name }),
    });
});

// change this in the future to retrieve pass by email  
router.delete('/register/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id});
        return res.status(200).json({
            message: "User '"+ user._doc.name +"' deleted",
            deletedUser: {
                "id": user._doc._id, 
                "email": user._doc.email, 
                "createdAt": user._doc.createdAt
            } 
        });
    }
    catch (err) {
        return res.status(400).send({
            error: "The userId '"+ req.params.id +"' couldn't be deleted (it may not exist)",
        }); 
    }
});

router.get('/register/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(400).send({
            error: "The userId '"+ req.params.id +"' couldn't be found (it may not exist)",            
        });
    }
});


module.exports = app => app.use('/auth', router);