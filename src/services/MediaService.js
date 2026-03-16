const assetService = require('../modules/assets/asset.service');
const sourceService = require('../modules/sources/source.service');


async function serve(asset_id) {
    const asset = await assetService.getById(asset_id);
    const source = await sourceService.getById(asset.source_id);

    return source.path + '/' + asset.path + asset.filename;
}

module.exports = { serve }