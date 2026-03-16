const sourceRepository = require('./source.repository');

exports.createSource = async (data) => {
    return await sourceRepository.create({
        name: data.name,
        type: data.type,
        config: JSON.stringify(data.config || {})
    });
};

exports.getSources = async () => {
    return await sourceRepository.findAll();
};

exports.getSourceById = async (id) => {
    return await sourceRepository.findById(id);
};

exports.updateSource = async (id, data) => {
    return await sourceRepository.update(id, {
        name: data.name,
        type: data.type,
        config: JSON.stringify(data.config || {})
    });
};

exports.deleteSource = async (id) => {
    return await sourceRepository.softDelete(id);
};