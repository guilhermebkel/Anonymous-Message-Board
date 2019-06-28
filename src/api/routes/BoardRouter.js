const BoardController = require('../controllers/BoardController');

server.get('/boards', BoardController.getBoards);