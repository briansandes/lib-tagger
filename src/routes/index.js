const express = require('express');
const router = express.Router();
const sourceRoutes = require('../modules/sources/source.routes');
const assetRoutes = require('../modules/assets/asset.routes');

router.use('/sources', sourceRoutes);
router.use('/assets', assetRoutes);

module.exports = router;