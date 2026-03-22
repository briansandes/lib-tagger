const BaseRepository = require('../../repositories/BaseRepository');
const AppDataSource = require('../../config/datasource');
const Tag = require('./tag.entity');

class TagRepository extends BaseRepository {
  constructor() {
    const repository = AppDataSource.getRepository(Tag);
    super(repository);
  }
}

module.exports = new TagRepository();