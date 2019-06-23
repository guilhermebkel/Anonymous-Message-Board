const ThreadSchema = require('../../db/schemas/threadSchema');

module.exports = function(server){
    
    server.post('/threads', (req, res) => {
        ThreadSchema.create(req.body, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    });

    server.get('/threads/:board_id', (req, res) => {
        ThreadSchema.findAll({board_id: req.params.board_id}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    })

    server.delete('/threads', (req, res) => {
        ThreadSchema.find({id: req.body.thread_id, delete_password: req.body.delete_password}, (error, data) => {
            if(data){
                ThreadSchema.deleteById(req.params.thread_id, (error, data) => {
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
        ThreadSchema.updateById(req.body.thread_id, {reported: true}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    })

}