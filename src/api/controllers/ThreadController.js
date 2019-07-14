const DataTypes = require('sequelize')

const ThreadModel = require('../models/ThreadModel')(sequelize, DataTypes)
const BoardModel = require('../models/BoardModel')(sequelize, DataTypes)

module.exports = {
    createThread,
    getThreadByBoardId,
    getAllThreads,
    deleteThread,
    updateThread,
}

async function createThread(req, res){
    try{
        const newBoard = await BoardModel.create({})
        const newThread = await ThreadModel.create({ ...req.body, board_id: newBoard.dataValues.id })
        res.json(newThread)
    }
    catch(error){
        console.error(error)
    }
}

async function getAllThreads(req, res){
    try{
        const threads = await ThreadModel.findAll({})
        res.json(threads)
    }
    catch(error){
        console.error(error)
    }
}

async function getThreadByBoardId(req, res){
    try{
        const threads = await ThreadModel.findAll({ where: { board_id: req.params.board_id }})
        res.json(threads)
    }
    catch(error){
        console.error(error)
    }
}

async function deleteThread(req, res){
    try{
        await ThreadModel.destroy({ where: { id: req.body.thread_id, delete_password: req.body.delete_password }})
        res.status(200)
        res.send('Deleted!')
    }
    catch(error){
        console.error(error)
    }
}

async function updateThread(req, res){
    try{
        await ThreadModel.update({ reported: true }, { where: { id: req.body.thread_id }})
        res.status(200)
        res.send('Updated!')
    }
    catch(error){
        console.error(error)
    }
}