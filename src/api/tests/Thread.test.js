const { boot } = require('../core')
const fetch = require('node-fetch')
const assert = require('assert')

const THREAD = {
    id: 100,
    text: 'TESTE',
    bumped_on: null,
    delete_password: '123',
}

const THREAD_CHANGE = {
    thread_id: THREAD.id,
    delete_password: THREAD.delete_password,
}

module.exports = {
    test
}

async function test(){
    describe('Thread Tests', function() {
    
        this.timeout(Infinity)
    
        this.beforeAll(function(done){
            new Promise(callback => boot(callback))
            .then(() => done())
        })
    
        it('[POST] /threads - Create thread', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/threads`, { 
                method: 'POST',
                body: JSON.stringify(THREAD),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200) 
        })
    
        it('[GET] /threads - Get all threads', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/threads`, { method: 'GET' })
            assert.deepEqual(result.status, 200)
        })
    
        it('[GET] /threads/:board_id - Get threads by board id', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/threads/20`, { method: 'GET' })
            assert.deepEqual(result.status, 200)
        })
    
        it('[UPDATE] /threads - Update thread status', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/threads`, { 
                method: 'PUT',
                body: JSON.stringify(THREAD_CHANGE),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200)
        })

        it('[DELETE] /threads - Delete thread by id and password', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/threads`, { 
                method: 'DELETE',
                body: JSON.stringify(THREAD_CHANGE),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200)
        }) 
    })
}