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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      default: null,
    }
  }, {
      tableName: 'threads',
    })
}