const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator/check');

const User = require('../models/User');

//@Route    POST api/users
//@Desc     Register a user
//@access   Public route
router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    //req.body has the name, email and password. Here we destructure it to bring out each component in the req.body
    const {
        name,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        //check if user exists
        if (user) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }
        //If user doesnt exist start process to create a new one
        user = new User({
            name,
            email,
            password
        });
        //Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save hashed password to DB
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }


});

module.exports = router;