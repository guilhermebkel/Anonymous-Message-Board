const DataTypes = require('sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
        await bcrypt.hash(req.body.delete_password, saltRounds, async (error, hash) => {
            if(hash){
                const newThread = await ThreadModel.create({ 
                    ...req.body,
                    delete_password: hash 
                })
                res.json(newThread)
            }
            else{
                console.error(error)
            }
        })
    }
    catch(error){
        console.error(error)
    }
}

async function getAllThreads(req, res){
    try{
        const threads = await ThreadModel.findAll({
            order: [[ 'created_at', 'DESC' ]], 
            where: { 
              deleted_at: null
            }
          })
        res.json(threads)
    }
    catch(error){
        console.error(error)
    }
}

async function getThreadByBoardId(req, res){
    try{
        const threads = await ThreadModel.findAll({
            order: [[ 'created_at', 'DESC' ]], 
            where: { 
                board_id: req.params.board_id,
                deleted_at: null
            }
        })
        res.json(threads)
    }
    catch(error){
        console.error(error)
    }
}

async function deleteThread(req, res){
    try{
        const thread = await ThreadModel.findOne({ where: { id: req.body.thread_id }})
        bcrypt.compare(req.body.delete_password, thread.dataValues.delete_password, async (error, result) => {
            if(result){
                await ThreadModel.update({
                    deleted_at: new Date
                }, { 
                    where: { 
                        id: req.body.thread_id 
                    }
                })
                res.status(200)
                res.send('Deleted!')
            }
            else{
                res.status(400)
                res.send('Incorrect password!')
            }
        })     
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