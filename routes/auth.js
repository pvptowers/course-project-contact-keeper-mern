const express = require('express');
const router = express.Router();

//@Route    GET api/auth
//@Desc     Get logged in user
//@access   Private route
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

//@Route    POST api/auth
//@Desc     Auth user & get token
//@access   Public route
router.post('/', (req, res) => {
    res.send('Log in user');
});

module.exports = router;