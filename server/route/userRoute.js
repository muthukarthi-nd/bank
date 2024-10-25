const express = require('express');
const router = express.Router();
const {getUser} = require('../controller/usercontroller');

router.get('/userdata', getUser);

module.exports = router;
