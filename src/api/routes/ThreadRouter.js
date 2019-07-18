const express = require('express')
const routes = express.Router()

const ThreadController = require('../controllers/ThreadController')

module.exports = {
    config(app){
        app.post('/threads/:board_id', ThreadController.createThread)
        app.get('/threads', ThreadController.getAllThreads)
        app.get('/threads/:board_id', ThreadController.getThreadByBoardId)
        app.delete('/threads', ThreadController.deleteThread)
        app.put('/threads', ThreadController.updateThread)
    }
}