module.exports = function (sequelize, DataTypes) {
  return sequelize.define('replies', {
    id: {
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    thread_id: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: 'threads',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    delete_password: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {
      tableName: 'replies',
    })
}