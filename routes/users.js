const express = require('express');
const router = express.Router();

//@Route    POST api/users
//@Desc     Register a user
//@access   Public route
router.post('/', (req, res) => {
    res.send('Register a user');
});

module.exports = router;