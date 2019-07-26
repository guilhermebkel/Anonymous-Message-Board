const express = require('express')
const routes = express.Router()

const ReplyController = require('../controllers/ReplyController')

module.exports = {
    config(app){
        app.post('/replies/:thread_id', ReplyController.createReply)
        app.get('/replies/:thread_id', ReplyController.getRepliesByThreadId)
        app.get('/replies/:board_id', ReplyController.getRepliesByBoardId)
        app.delete('/replies', ReplyController.deleteReply)
        app.put('/replies', ReplyController.updateReply)
    }
}