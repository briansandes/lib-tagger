const BaseController = require('../../controllers/BaseController');
const tagService = require('./tag.service');

class TagController extends BaseController {

  constructor() {
    super(tagService, 'Tag');
  }
}

module.exports = new TagController();