const DataTypes = require('sequelize')

const ThreadModel = require('../models/ThreadModel')(sequelize, DataTypes)

module.exports = {
    createThread,
    getThreadByBoardId,
    getAllThreads,
    deleteThread,
    updateThread,
}

async function createThread(req, res){
    BoardModel.create({})
    .then(board => {
        ThreadModel.create(req.body, { board_id: board.id })
        .then(thread => res.json(thread))
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

async function getAllThreads(req, res){
    ThreadModel.findAll({})
    .then(threads => res.json(threads))
    .catch(error => console.error(error))
}

async function getThreadByBoardId(req, res){
    ThreadModel.findAll({board_id: req.params.board_id})
    .then(thread => res.json(thread))
    .catch(error => console.error(error))
}

async function deleteThread(req, res){
    await ThreadModel.find({id: req.body.thread_id, delete_password: req.body.delete_password})
    .then(thread => res.json(thread))
    .catch(error => console.error(error))

    ThreadModel.deleteById(req.params.thread_id)
    .then(thread => res.json(thread))
    .catch(error => console.error(error))
}

async function updateThread(req, res){
    ThreadModel.updateById(req.body.thread_id, {reported: true})
    .then(thread => res.json(thread))
    .catch(error => console.error(error))
}