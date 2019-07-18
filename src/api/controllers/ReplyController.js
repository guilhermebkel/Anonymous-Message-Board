const DataTypes = require('sequelize')
const Op = DataTypes.Op;
const bcrypt = require('bcrypt')
const saltRounds = 10

const ReplyModel = require('../models/ReplyModel')(sequelize, DataTypes)
const ThreadModel = require('../models/ThreadModel')(sequelize, DataTypes)

module.exports = {
  createReply,
  getRepliesByThreadId,
  deleteReply,
  updateReply,
}

async function createReply(req, res) {
  try {
    await bcrypt.hash(req.body.delete_password, saltRounds, async (error, hash) => {
      if (hash) {
        const newReply = await ReplyModel.create({ ...req.body, delete_password: hash })
        await ThreadModel.update({ bumped_on: new Date }, { where: { id: req.params.thread_id } })
        res.json(newReply)
      }
      else {
        console.error(error)
      }
    })

  }
  catch (error) {
    console.error(error)
  }
}

async function getRepliesByThreadId(req, res) {
  try {
    const replies = await ReplyModel.findAll({
      order: [[ 'created_at', 'DESC' ]], 
      where: { 
        thread_id: req.params.thread_id,
        deleted_at: null
      }
    })
    res.json(replies)
  }
  catch (error) {
    console.error(error)
  }
}

async function deleteReply(req, res) {
  try {
    const reply = await ReplyModel.findOne({ where: { id: req.body.reply_id, thread_id: req.body.thread_id } })
    bcrypt.compare(req.body.delete_password, reply.dataValues.delete_password, async (error, result) => {
      if (result) {
        await ReplyModel.update(
          {
            deleted_at: new Date
          }, { 
            where: { 
              id: req.body.reply_id, 
              thread_id: req.body.thread_id 
            }
        })
        res.status(200)
        res.send('Deleted!')
      }
      else {
        res.status(400)
        res.send('Incorrect password!')
      }
    })
  }
  catch (error) {
    console.error(error)
  }
}

async function updateReply(req, res) {
  try {
    const reply = await ReplyModel.findOne({ where: { id: req.body.reply_id, thread_id: req.body.thread_id } })
    bcrypt.compare(req.body.delete_password, reply.dataValues.delete_password, async (error, result) => {
      if (result) {
        await ReplyModel.update({ reported: true }, { where: { id: req.body.reply_id, thread_id: req.body.thread_id }})
        res.status(200)
        res.send('Updated!')
      }
      else {
        res.status(400)
        res.send('Incorrect password!')
      }
    })
  }
  catch (error) {
    console.error(error)
  }
}