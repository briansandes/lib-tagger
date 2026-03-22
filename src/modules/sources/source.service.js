const BaseService = require('../../services/BaseService');
const sourceRepository = require('./source.repository');
const assetRepository = require('../assets/asset.repository');
const { crawlDir } = require('../../utils/fileCrawler');

class SourceService extends BaseService {

    constructor() {
        super(sourceRepository);
    }

    // custom parsing for config
    async create(data) {
        data.config = JSON.stringify(data.config);

        const newSource = await super.create(data);

        const assets = await crawlDir(newSource.path);

        // Add source_id to each asset
        const assetsWithSource = assets.map(a => ({ ...a, source_id: newSource.id }));

        assetsWithSource.forEach(async element => {
            assetRepository.create(element);
        });

        return newSource;
    }

    // custom parsing for config
    async update(id, data) {
        data.config = JSON.stringify(data.config);

        return super.update(id, data);
    }
}

module.exports = new SourceService();