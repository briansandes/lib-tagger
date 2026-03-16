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

            const { page, limit, sort, ...filters } = req.query;

            const result = await this.service.getAll({
                page: Number(page) || 1,
                limit: Number(limit) || 20,
                sort,
                filters
            });

            return response.success(res, result.data, result.meta);
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

            response.success(res, item, `${this.resourceName} #${item.id} created`, 201);

        });
    }

    update() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.update(req.params.id, req.body);

            if (!item) {
                throw new NotFoundError(`${this.resourceName} ${req.params.id} not found.`);
            }

            logger.reqInfo(req, `${this.resourceName} updated`, { id: item.id });

            response.success(res, item, `${this.resourceName} #${req.params.id} updated`);

        });
    }

    delete() {
        return asyncHandler(async (req, res) => {

            const item = await this.service.delete(req.params.id);

            if (!item) {
                throw new NotFoundError(`${this.resourceName} ${req.params.id} not found.`);
            }

            logger.reqInfo(req, `${this.resourceName} deleted`, { id: req.params.id });

            response.success(res, null, `${this.resourceName} #${req.params.id} deleted`);

        });
    }

}

module.exports = BaseController;