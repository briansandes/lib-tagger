const response = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');
const NotFoundError = require('../../errors/NotFoundError');
const sourceService = require('./source.service');

exports.getSources = asyncHandler(async (req, res) => {
    const sources = await sourceService.getSources();
    response.success(res, sources);
});

exports.getSourceById = asyncHandler(async (req, res) => {
    const source = await sourceService.getSourceById(req.params.id);

    if (!source) {
        throw new NotFoundError('Source not found.');
    }

    response.success(res, source);
});

exports.createSource = asyncHandler(async (req, res) => {
    const source = await sourceService.createSource(req.body);
    response.success(res, source, 'Source created', 201);
});

exports.updateSource = asyncHandler(async (req, res) => {
    const source = await sourceService.updateSource(req.params.id, req.body);
    if (!source) {
        throw new NotFoundError('Source not found.');
    }
    response.success(res, source, 'Source updated');
});

exports.deleteSource = asyncHandler(async (req, res) => {
    await sourceService.deleteSource(req.params.id);
    response.success(res, null, 'Source deleted');
});