const ReplySchema = require('../../db/schemas/replySchema');
const ThreadSchema = require('../../db/schemas/threadSchema');

module.exports = function(server){
    
    server.post('/replies/:thread_id', (req, res) => {
        ReplySchema.create(req.body, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
        ThreadSchema.updateById(req.params.thread_id, { bumped_on: new Date}, (req, res) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    });

    server.get('/replies/:thread_id', (req, res) => {
        ReplySchema.findAll({thread_id: req.params.thread_id}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    })

    server.delete('/replies', (req, res) => {
        ReplySchema.find({thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password}, (error, data) => {
            if(data){
                ReplySchema.deleteById(req.params.reply_id, (error, data) => {
                    if(data){
                        res.json(data);
                    }
                    else{
                        console.error(error);
                    }
                })
            }
            else{
                console.error(error);
            }
        })
    })

    server.put('/threads', (req, res) => {
        ReplySchema.find({thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password}, (error, data) => {
            if(data){
                ReplySchema.updateById(req.body.thread_id, {reported: true}, (error, data) => {
                    if(data){
                        res.json(data);
                    }
                    else{
                        console.error(error);
                    }
                })
            }
            else{
                console.error(error);
            }
        })
    })

}