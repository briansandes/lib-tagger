const BaseRepository = require('../../repositories/BaseRepository');
const AppDataSource = require('../../config/datasource');
const AssetTag = require('./asset-tag.entity');

class AssetTagRepository extends BaseRepository {
  constructor() {
    const repository = AppDataSource.getRepository(AssetTag);
    super(repository);
  }
}

module.exports = new AssetTagRepository();