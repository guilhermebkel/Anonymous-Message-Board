async function start(){
    await require('../../tests/Thread.test').test()
    await require('../../tests/Reply.test').test()
    await require('../../tests/Board.test').test()
}

start()