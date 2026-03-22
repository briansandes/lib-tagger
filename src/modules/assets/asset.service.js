const BaseService = require('../../services/BaseService');
const assetRepository = require('./asset.repository');

class AssetService extends BaseService {

    constructor() {
        super(assetRepository);
    }
}

module.exports = new AssetService();