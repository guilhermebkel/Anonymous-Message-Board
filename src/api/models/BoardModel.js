module.exports = function (sequelize, DataTypes) {
  return sequelize.define('boards', {
    id: {
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    threads: {
      type: DataTypes.JSONB,
      default: []
    },
  }, {
      tableName: 'boards',
    })
}