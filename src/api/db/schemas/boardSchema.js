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
        threads: {
            type: Sequelize.ARRAY,
            default: []
        }
    },
    options: {
        tableName: 'TB_BOARDS',
        freeTableName: false,
        timestamps: false,
    }
}

module.exports = BoardSchema;