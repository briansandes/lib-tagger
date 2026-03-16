require("reflect-metadata");
const { DataSource } = require("typeorm");
const Source = require("../modules/sources/source.entity");
const Asset = require("../modules/assets/asset.entity");
const Tag = require("../modules/tags/tag.entity");
const AssetTag = require("../modules/asset-tags/asset-tag.entity");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Source, Asset, Tag, AssetTag],
});

module.exports = AppDataSource;