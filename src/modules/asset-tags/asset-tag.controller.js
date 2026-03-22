const BaseController = require('../../controllers/BaseController');
const assetTagService = require('./asset-tag.service');

class AssetTagController extends BaseController {

  constructor() {
    super(assetTagService, 'AssetTag');
  }
}

module.exports = new AssetTagController();