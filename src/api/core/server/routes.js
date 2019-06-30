module.exports = async function setup(app){
    require('../../routes/BoardRouter').config(app)
    require('../../routes/ReplyRouter').config(app)
    require('../../routes/ThreadRouter').config(app)
}