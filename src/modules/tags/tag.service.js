const BaseService = require('../../services/BaseService');
const tagRepository = require('./tag.repository');

class TagService extends BaseService {

    constructor() {
        super(tagRepository);
    }
}

module.exports = new TagService();