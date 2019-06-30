const DataTypes = require('sequelize')

const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
  getBoards,
}

async function getBoards(req, res) {
  BoardModel.findAll({})
  .then(users => res.json(users))
  .catch(error => console.error(error))
}