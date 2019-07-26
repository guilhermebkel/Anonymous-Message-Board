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
    board_id: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: 'boards',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    delete_password: {
      type: DataTypes.STRING,
      required: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      default: null,
    }
  }, {
      tableName: 'replies',
    })
}