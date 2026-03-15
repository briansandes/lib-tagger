const express = require('express');
const router = express.Router();
const sourceRoutes = require('../modules/sources/source.routes');

// api/test 
router.get('/test', (req, res) => { res.json({ message: 'Router working' }); });

// actual api routes
router.use('/sources', sourceRoutes);

module.exports = router;