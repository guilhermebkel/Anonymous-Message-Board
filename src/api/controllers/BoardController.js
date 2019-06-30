const DataTypes = require('sequelize')

const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
  getBoards,
}

async function getBoards(req, res){
  BoardModel.findAll({})
  .then(boards => res.json(boards))
  .catch(error => console.error(error))
}