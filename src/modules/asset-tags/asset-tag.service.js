const BaseService = require('../../services/BaseService');
const assetTagRepository = require('./asset-tag.repository');

class AssetTagService extends BaseService {

    constructor() {
        super(assetTagRepository);
    }
}

module.exports = new AssetTagService();