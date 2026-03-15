const AppDataSource = require('../../config/datasource');
const Source = require('./source.entity');

exports.createSource = async (data) => {
  const repo = AppDataSource.getRepository(Source);

  const source = repo.create({
    name: data.name,
    type: data.type,
    config: JSON.stringify(data.config || {})
  });

  return await repo.save(source);
};