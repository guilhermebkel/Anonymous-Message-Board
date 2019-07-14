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
  try{
    const newReply = await ReplyModel.create(req.body)
    await ThreadModel.update({ bumped_on: new Date }, { where: { id: req.params.thread_id }})
    res.json(newReply)
  }
  catch(error){
    console.error(error)
  }
}

async function getRepliesByThreadId(req, res) {
  try{
    const replies = await ReplyModel.findAll({ where: { thread_id: req.params.thread_id }})
    res.json(replies)
  }
  catch(error){
    console.error(error)
  }
}

async function deleteReply(req, res) {
  try{
    await ReplyModel.destroy({ where: { thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password }})
    res.status(200)
    res.send('Deleted!')
  }
  catch(error){
    console.error(error)
  }
}

async function updateReply(req, res) {
  try{
    await ReplyModel.update({ reported: true }, { where: { thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password }})
    res.status(200)
    res.send('Updated!')
  }
  catch(error){
    console.error(error)
  }
}