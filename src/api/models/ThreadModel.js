module.exports = function (sequelize, DataTypes) {
  return sequelize.define('threads', {
    id: {
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    board_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'boards',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    created_on: {
      type: DataTypes.DATE,
      default: new Date,
    },
    bumped_on: {
      type: DataTypes.DATE,
      allowNull: true,
      default: null,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    delete_password: {
      type: DataTypes.STRING,
      required: true,
    },
    replies: {
      type: DataTypes.JSONB,
      default: [],
    },
  }, {
      tableName: 'threads',
    })
}