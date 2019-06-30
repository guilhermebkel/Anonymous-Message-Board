const DataTypes = require('sequelize')

const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
  getBoards,
  createBoard,
}

async function getBoards(req, res){
  BoardModel.findAll({})
  .then(boards => res.json(boards))
  .catch(error => console.error(error))
}

async function createBoard(req, res){
  BoardModel.create(req.body)
  .then(boards => res.json(boards))
  .catch(error => console.error(error))
}