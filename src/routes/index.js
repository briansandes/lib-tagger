const express = require('express');
const path = require('path');
const router = express.Router();
const mediaService = require('../services/MediaService');
const sourceRoutes = require('../modules/sources/source.routes');
const assetRoutes = require('../modules/assets/asset.routes');

router.use('/sources', sourceRoutes);
router.use('/assets', assetRoutes);

router.use('/media/:id', async (req, res) => {
    res.sendFile(path.resolve(await mediaService.serve(req.params.id)));
});

module.exports = router;