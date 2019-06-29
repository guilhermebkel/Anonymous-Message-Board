module.exports = (models) => {
  const associations = [
    {
      from: models.ReplyModel,
      relation: 'hasMany',
      to: models.ThreadModel,
      options: {
        as: 'Replies',
        constraints: false
      }
    },
    {
      from: models.ThreadModel,
      relation: 'hasMany',
      to: models.BoardModel,
      options: {
        as: 'Threads',
        constraints: false
      }
    },
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

  associateAndGlobalize(models)

  for (let association of associations) {
    // From.belongsTo(To, {as: 'Tos'})
    association.from[association.relation](association.to, association.options)
  }
}

function associateAndGlobalize(models) {
  Object
    .keys(models)
    .forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models)
      }
      global[modelName] = models[modelName]
    })
}
