const BaseController = require('../../controllers/BaseController');
const assetService = require('./asset.service');

class AssetController extends BaseController {

  constructor() {
    super(assetService, 'Asset');
  }
}

module.exports = new AssetController();