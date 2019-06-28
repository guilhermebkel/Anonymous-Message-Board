const express = require('express');
const routes = express.Router();

const ThreadController = require('../controllers/ThreadController');

routes.post('/threads', ThreadController.createThread);
routes.get('/threads/:board_id', ThreadController.getAllThreads);
routes.delete('/threads', ThreadController.deleteThread);
routes.put('/threads', ThreadController.updateThread);