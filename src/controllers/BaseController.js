const response = require('../utils/response');
const NotFoundError = require('../errors/NotFoundError');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');

class BaseController {

    constructor(service, resourceName = 'Resource') {
        this.service = service;
        this.resourceName = resourceName;
    }

    getAll() {
        return asyncHandler(async (req, res) => {

            const items = await this.service.getAll();

            response.success(res, items);

        });
    }

    getById() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.getById(req.params.id);

            if (!item) {
                throw new NotFoundError(`${this.resourceName} ${req.params.id} not found.`);
            }

            response.success(res, item);

        });
    }

    create() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.create(req.body);

            logger.reqInfo(req, `${this.resourceName} created`, { id: item.id });

            response.success(res, item, `${this.resourceName} created`, 201);

        });
    }

    update() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.update(req.params.id, req.body);

            if (!item) {
                throw new NotFoundError(`${this.resourceName} ${req.params.id} not found.`);
            }

            logger.reqInfo(req, `${this.resourceName} updated`, { id: item.id });

            response.success(res, item, `${this.resourceName} updated`);

        });
    }

    delete() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.delete(req.params.id);

            if (!item) {
                throw new NotFoundError(`${this.resourceName} ${req.params.id} not found.`);
            }

            logger.reqInfo(req, `${this.resourceName} deleted`, { id: req.params.id });

            response.success(res, null, `${this.resourceName} deleted`);

        });
    }

}

module.exports = BaseController;