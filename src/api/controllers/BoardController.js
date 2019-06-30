const BoardModel = require('../models/BoardModel')

module.exports = {
  getBoards,
}

async function getBoards(req, res) {
  BoardModel.findAll({}, (error, data) => {
    if (data) {
      res.json(data)
    }
    else {
      console.error(error)
    }
  })
}