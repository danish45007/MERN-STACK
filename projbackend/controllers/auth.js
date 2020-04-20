// Import 
const User = require('../models/user')
const { check, validationResult } = require('express-validator');



// Singout 
exports.signout = (req,res) => {
    
    res.json ({
        message: "You are Singout"
    });
};

// Singin
exports.signup = (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            error_param: errors.array()[0].param
        })
    }


    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });

    });
};

