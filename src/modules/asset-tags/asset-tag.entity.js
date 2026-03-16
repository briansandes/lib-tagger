const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "AssetTag",
    tableName: "asset_tags",

    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },

        asset_id: {
            type: Number,
            nullable: false,
        },

        tag_id: {
            type: Number,
            nullable: false,
        },

        created_at: {
            type: "datetime",
            createDate: true,
        },
    },

    relations: {
        asset: {
            type: "many-to-one",
            target: "Asset",
            joinColumn: {
                name: "asset_id",
            },
        },

        tag: {
            type: "many-to-one",
            target: "Tag",
            joinColumn: {
                name: "tag_id",
            },
        },
    },

    indices: [
        {
            name: "IDX_ASSET_TAG_UNIQUE",
            columns: ["asset_id", "tag_id"],
            unique: true,
        },
    ],
});