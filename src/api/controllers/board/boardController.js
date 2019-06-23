const BoardSchema = require('../../db/schemas/boardSchema');

module.exports = function(){
    
    server.get('/boards', (req, res) => {
        BoardSchema.findAll({}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    })

}