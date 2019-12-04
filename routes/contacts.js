const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@Route    GET api/contacts
//@Desc     Get all user contacts
//@access   Private route
// ADDING SECOND PARAMETER OF AUTH PROTECTS THE ROUTE
router.get('/', auth, async (req, res) => {
    try {
        //this finds one user by their id and then displays the contacts that user has
        const contacts = await Contact.find({
            user: req.user.id
        }).sort({
            date: -1
        });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@Route    POST api/contacts
//@Desc     Add new contact
//@access   Private route
// use [] to use multiple middlewares
router.post('/', [auth, [
    check('name', "name is required")
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    //pull out data from the body
    const {
        name,
        email,
        phone,
        type
    } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        //save new contact to db
        const contact = await newContact.save();
        res.json(contact)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});

//@Route    PUT api/contacts/:id
//@Desc     Update contact
//@access   Private route
router.put('/:id', auth, async (req, res) => {
    //pull out data from the body
    const {
        name,
        email,
        phone,
        type
    } = req.body;
    // Build contact object

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        //req.params.id will find the contact in the DB by id
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({
            msg: 'Contact not found'
        });
        //make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contactFields
        }, {
            new: true
        });
        res.json(contact);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }


});

//@Route    DELETE api/contacts/:id
//@Desc     Delete contact
//@access   Private route
router.delete('/:id', auth, async (req, res) => {
    try {
        //req.params.id will find the contact in the DB by id
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({
            msg: 'Contact not found'
        });
        //make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({
            msg: 'Contact removed'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;