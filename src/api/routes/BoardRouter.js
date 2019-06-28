const express = require('express');
const routes = express.Router();

const BoardController = require('../controllers/BoardController');

routes.get('/boards', BoardController.getBoards);