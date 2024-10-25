const express = require('express');
const { createAdmin } = require('../controller/adminController');

const router = express.Router();

router.post('/create-admin', createAdmin);

module.exports = router;
