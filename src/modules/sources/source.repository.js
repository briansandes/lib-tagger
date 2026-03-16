const BaseRepository = require('../../repositories/BaseRepository');
const AppDataSource = require('../../config/datasource');
const Source = require('./source.entity');

class SourceRepository extends BaseRepository {
  constructor() {
    const repository = AppDataSource.getRepository(Source);
    super(repository);
  }
}

module.exports = new SourceRepository();