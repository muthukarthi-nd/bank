var express = require('express');
var router = express.Router();
var {controller} =require('../controller/transactioncontroller');


router.post('/transact', controller);

module.exports = router;
