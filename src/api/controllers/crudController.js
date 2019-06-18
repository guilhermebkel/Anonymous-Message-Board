const BoardSchema = require('../db/schemas/boardSchema');

module.exports = function(){
    
    get('/boards', (req, res) => {
        BoardSchema.find({}, (error, data) => {
            if(error){
                res.json({"error": error});
            }
            else{
                res.json(data);
            }
        })
    });

    get('/boards/:id', (req, res) => {
        BoardSchema.findById(req.params.id, (error, data) => {
            if(error){
                res.json({"error": error});
            }
            else{
                res.json(data);
            } 
        })
    })

}