const DataTypes = require('sequelize')

const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
  getBoards,
}

async function getBoards(req, res){
  try {
    const boards = await BoardModel.findAll({})
    res.json(boards)
  }
  catch(error){
    console.error(error)
  }
}