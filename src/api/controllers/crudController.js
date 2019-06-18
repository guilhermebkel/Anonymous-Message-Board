const ThreadSchema = require('../db/schemas/threadSchema');
const ReplySchema = require('../db/schemas/replySchema');

module.exports = function(){
    
    get('/boards', (req, res) => {
        ThreadSchema.find({}, (error, data) => {
            if(error){
                res.json({"error": error});
            }
            else{
                res.json(data);
            }
        })
    });

    get('/boards/:id', (req, res) => {
        ThreadSchema.findById(req.params.id, (error, data) => {
            if(error){
                res.json({"error": error});
            }
            else{
                res.json(data);
            } 
        })
    })

}