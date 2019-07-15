const fetch = require('node-fetch')
const assert = require('assert')

const REPLY = {
    id: 300,
    text: 'TESTE',
    delete_password: '123',
}

const THREAD = {
    id: null,
    board_id: 120,
    text: 'TESTE',
    bumped_on: null,
    delete_password: '123',
}

const REPLY_CHANGE = {
    thread_id: THREAD.id,
    reply_id: REPLY.id,
    delete_password: REPLY.delete_password
}

module.exports = {
    test
}

async function test(){
    describe('Reply Tests', function() {
    
        this.timeout(Infinity)
    
        it('[POST] /replies/:thread_id - Create reply', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/replies/20`, { 
                method: 'POST',
                body: JSON.stringify(REPLY),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200)
        })
    
        it('[GET] /replies/:thread_id - Get replies by thread id', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/replies/20`, { method: 'GET' })
            assert.deepEqual(result.status, 200)
        })
        
        it('[UPDATE] /replies - Update reply status by thread id reply id and password', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/replies`, { 
                method: 'PUT',
                body: JSON.stringify(REPLY_CHANGE),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200)
        })

        it('[DELETE] /replies - Delete reply by thread id reply id and password', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/replies`, { 
                method: 'DELETE',
                body: JSON.stringify(REPLY_CHANGE),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200)
        }) 
    })
}