const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Tag",
    tableName: "tags",

    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },

        name: {
            type: String,
            unique: true,
            nullable: false,
        },

        created_at: {
            type: "datetime",
            createDate: true,
        },

        updated_at: {
            type: "datetime",
            updateDate: true,
        },
    },

    relations: {
        asset_tags: {
            type: "one-to-many",
            target: "AssetTag",
            inverseSide: "tag",
        },
    },
});