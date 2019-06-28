const ReplyModel = require('../models/ReplyModel');
const ThreadModel = require('../models/ThreadModel');

module.exports = {
    
    async createReply (req, res){
        ReplyModel.create(req.body, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
        ThreadModel.updateById(req.params.thread_id, { bumped_on: new Date}, (req, res) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    },

    async getRepliesByThreadId(req, res){
        ReplyModel.findAll({thread_id: req.params.thread_id}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                console.error(error);
            }
        })
    },

    async deleteReply(req, res){
        ReplyModel.find({thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password}, (error, data) => {
            if(data){
                ReplyModel.deleteById(req.params.reply_id, (error, data) => {
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
    },

    async updateReply(req, res){
        ReplyModel.find({thread_id: req.body.thread_id, reply_id: req.body.reply_id, delete_password: req.body.delete_password}, (error, data) => {
            if(data){
                ReplyModel.updateById(req.body.thread_id, {reported: true}, (error, data) => {
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
    }
}