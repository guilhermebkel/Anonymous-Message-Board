const ReplyController = require('../controllers/ReplyController');

server.post('/replies/:thread_id', ReplyController.createReply);
server.get('/replies/:thread_id', ReplyController.getRepliesByThreadId);
server.delete('/replies', ReplyController.deleteReply);
server.put('/replies', ReplyController.updateReply);