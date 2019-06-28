const BoardModel = require('../models/BoardModel');

module.exports = {
    
    async getBoards(req, res){
        BoardModel.findAll({}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    }
}