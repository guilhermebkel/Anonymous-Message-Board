const Sequelize = require('sequelize');

const ThreadSchema = {
    name: 'threads',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        board_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        text: {
            type: Sequelize.STRING,
            required: true,
        },
        created_on: {
            type: Sequelize.DATE,
            required: true,
        },
        bumped_on: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        reported: {
            type: Sequelize.BOOLEAN,
            default: false,
        },
        delete_password: {
            type: Sequelize.STRING,
            required: true,
        },
        replies: {
            type: Sequelize.ARRAY,
            default: [],
        },
    },
    options: {
        tableName: 'TB_THREADS',
        freeTableName: false,
        timestamps: false,
    }
}

module.exports = ThreadSchema;