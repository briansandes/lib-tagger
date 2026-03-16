const BaseRepository = require('../../repositories/BaseRepository');
const Source = require('./source.entity');

class SourceRepository extends BaseRepository {
  constructor() {
    super(Source);
  }
}

module.exports = new SourceRepository();