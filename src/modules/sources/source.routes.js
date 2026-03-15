const express = require('express');
const router = express.Router();

const sourceController = require('./source.controller');

router.post('/', sourceController.createSource);

module.exports = router;