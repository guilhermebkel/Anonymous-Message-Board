module.exports = {
    setup(server){
        require('../../tests/Thread.test').test(server)
        require('../../tests/Reply.test.js').test(server)
        require('../../tests/Boards.test.js').test(server)
    }
}