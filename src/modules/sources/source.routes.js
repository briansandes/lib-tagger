const express = require('express');
const router = express.Router();

const controller = require('./source.controller');

router.post('/', controller.createSource);
router.get('/', controller.getSources);
router.get('/:id', controller.getSourceById);
router.put('/:id', controller.updateSource);
router.delete('/:id', controller.deleteSource);

module.exports = router;