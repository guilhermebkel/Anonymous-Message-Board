const Sequelize = require('sequelize');

const BoardSchema = {
    name: 'boards',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.STRING,
            required: true,
        },
        created_on: {
            type: Sequelize.DATE,
            required: true,
            autoIncrement: true,
        },
        bumped_on: {
            type: Sequelize.DATE,
            autoIncrement: true,
        },
        reported: {
            type: Sequelize.BOOLEAN,
        },
        delete_password: {
            type: Sequelize.STRING,
            required: true,
        },
        replies: {
            type: Sequelize.ARRAY,
        },
    },
    options: {
        tableName: 'TB_BOARDS',
        freeTableName: false,
        timestamps: false,
    }
}

module.exports = BoardSchema;