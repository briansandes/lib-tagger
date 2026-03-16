const BaseService = require('../../services/BaseService');
const sourceRepository = require('./source.repository');

class SourceService extends BaseService {

    constructor() {
        super(sourceRepository);
    }

}

module.exports = new SourceService();