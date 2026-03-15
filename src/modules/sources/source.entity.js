const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Source",
  tableName: "sources",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    type: {
      type: String,
      nullable: false,
    },
    config: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "datetime",
      createDate: true,
    },
    updated_at: {
      type: "datetime",
      updateDate: true,
    },
    deleted_at: {
      type: "datetime",
      nullable: true,
      default: null,
    },
  },
});