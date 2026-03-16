const BaseService = require('../../services/BaseService');
const sourceRepository = require('./source.repository');

class SourceService extends BaseService {

    constructor() {
        super(sourceRepository);
    }

    // custom parsing for config
    async create(data) {
        data.config = JSON.stringify(data.config);

        return super.create(data);
    }

    // custom parsing for config
    async update(id, data) {
        data.config = JSON.stringify(data.config);

        return super.update(id, data);
    }
}

module.exports = new SourceService();