module.exports = (models) => {
  const associations = [
    {
      from: models.BoardModel,
      relation: 'belongsTo',
      to: models.ThreadModel,
      options: {
        as: 'Board',
        foreignKey: 'board_id',
        constraints: false
      }
    },
    {
      from: models.ThreadModel,
      relation: 'belongsTo',
      to: models.ReplyModel,
      options: {
        as: 'Thread',
        foreignKey: 'thread_id',
        constraints: false
      }
    }
  ]
}