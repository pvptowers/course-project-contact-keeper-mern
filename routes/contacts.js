const express = require('express');
const router = express.Router();

//@Route    GET api/contacts
//@Desc     Get all user contacts
//@access   Private route
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

//@Route    POST api/contacts
//@Desc     Add new contact
//@access   Private route
router.post('/', (req, res) => {
    res.send('Add contact');
});

//@Route    PUT api/contacts/:id
//@Desc     Update contact
//@access   Private route
router.put('/:id', (req, res) => {
    res.send('Update Contact');
});

//@Route    DELETE api/contacts/:id
//@Desc     Delete contact
//@access   Private route
router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
});

module.exports = router;