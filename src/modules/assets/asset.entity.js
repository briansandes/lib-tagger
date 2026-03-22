const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Asset",
    tableName: "assets",

    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },

        source_id: {
            type: Number,
            nullable: true,
        },

        type: {
            type: String,
            nullable: false,
        },

        filename: {
            type: String,
            nullable: false,
        },

        path: {
            type: String,
            nullable: true,
        },

        extension: {
            type: String,
            nullable: false,
        },

        external_url: {
            type: String,
            nullable: true,
        },

        dimensions: {
            type: String,
            nullable: true,
        },

        is_tagged: {
            type: Boolean,
            default: false,
        },

        tagged_at: {
            type: "datetime",
            nullable: true,
        },

        checksum: {
            type: String,
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

    relations: {
        source: {
            type: "many-to-one",
            target: "Source",
            joinColumn: {
                name: "source_id",
            },
            nullable: true,
        },

        asset_tags: {
            type: "one-to-many",
            target: "AssetTag",
            inverseSide: "asset",
        },
    },
});