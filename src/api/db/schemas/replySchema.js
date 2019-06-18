const Sequelize = require('sequelize');

const ReplySchema = {
    name: 'replies',
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
        reported: {
            type: Sequelize.BOOLEAN,
        },
        delete_password: {
            type: Sequelize.STRING,
            required: true,
        },
    },
    options: {
        tableName: 'TB_REPLIES',
        freeTableName: false,
        timestamps: false,
    }
}

module.exports = ReplySchema;