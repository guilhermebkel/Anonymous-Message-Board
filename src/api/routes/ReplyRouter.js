const express = require('express');
const routes = express.Router();

const ReplyController = require('../controllers/ReplyController');

routes.post('/replies/:thread_id', ReplyController.createReply);
routes.get('/replies/:thread_id', ReplyController.getRepliesByThreadId);
routes.delete('/replies', ReplyController.deleteReply);
routes.put('/replies', ReplyController.updateReply);