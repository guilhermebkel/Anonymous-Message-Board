const ThreadController = require('./../controllers/threadController');

server.post('/threads', ThreadController.createThread);
server.get('/threads/:board_id', ThreadController.getAllThreads);
server.delete('/threads', ThreadController.deleteThread);
server.put('/threads', ThreadController.updateThread);