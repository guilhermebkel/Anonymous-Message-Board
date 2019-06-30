const express = require('express');
const routes = express.Router();

const BoardController = require('../controllers/BoardController');

module.exports = {
    config(app){
        app.get('/boards', BoardController.getBoards);
    }
}