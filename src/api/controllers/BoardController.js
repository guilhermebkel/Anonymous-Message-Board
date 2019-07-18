const DataTypes = require('sequelize')
const Op = DataTypes.Op;

const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
  getBoards,
  createBoard,
}

async function getBoards(req, res){
  try {
    const boards = await BoardModel.findAll({
      order: [[ 'created_at', 'DESC' ]], 
      where: { 
        deleted_at: null
      }
    })
    res.json(boards)
  }
  catch(error){
    console.error(error)
  }
}

async function createBoard(req, res){
  try {
    const newBoard = await BoardModel.create({ title: req.body.title })
    res.json(newBoard)
  }
  catch(error){
    console.error(error)
  }
}