const BaseRepository = require('../../repositories/BaseRepository');
const AppDataSource = require('../../config/datasource');
const Asset = require('./asset.entity');

class AssetRepository extends BaseRepository {
  constructor() {
    const repository = AppDataSource.getRepository(Asset);
    super(repository);
  }
}

module.exports = new AssetRepository();