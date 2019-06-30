const DataTypes = require('sequelize')

const ReplyModel = require('../models/ReplyModel')(sequelize, DataTypes)
const ThreadModel = require('../models/ThreadModel')(sequelize, DataTypes)

module.exports = {
  createReply,
  getRepliesByThreadId,
  deleteReply,
  updateReply,
}

async function createReply(req, res) {
  await ReplyModel.create(req.body)
  .then(reply => res.json(reply))
  .catch(error => console.error(error))

  ThreadModel.updateById(req.params.thread_id, { bumped_on: new Date })
  .then(thread => res.json(thread))
  .catch(error => console.error(error))
}

async function getRepliesByThreadId(req, res) {
  ReplyModel.findAll({ thread_id: req.params.thread_id })
  .then(reply => res.json(reply))
  .catch(error => console.error(error))
}

async function deleteReply(req, res) {
  await ReplyModel.find({ thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password })
  .then(reply => res.json(reply))
  .catch(error => console.error(error))

  ReplyModel.deleteById(req.params.reply_id)
    .then(reply => res.json(reply))
    .catch(error => console.error(error))
}

async function updateReply(req, res) {
  ReplyModel.find({ thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password })
  .then(reply => res.json(reply))
  .catch(error => console.error(error))

  ReplyModel.updateById(req.body.thread_id, { reported: true })
  .then(reply => res.json(reply))
  .catch(error => console.error(error)) 
}