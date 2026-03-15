require("reflect-metadata");
const { DataSource } = require("typeorm");
const Source = require("../modules/sources/source.entity");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Source],
});

module.exports = AppDataSource;