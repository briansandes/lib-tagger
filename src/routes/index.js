const express = require('express');
const router = express.Router();
const sourceRoutes = require('../modules/sources/source.routes');

router.use('/sources', sourceRoutes);

module.exports = router;