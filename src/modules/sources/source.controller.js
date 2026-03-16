const BaseController = require('../../controllers/BaseController');
const sourceService = require('./source.service');

class SourceController extends BaseController {

  constructor() {
    super(sourceService, 'Source');
  }

}

module.exports = new SourceController();