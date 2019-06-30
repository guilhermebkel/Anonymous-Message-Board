const assert = require('assert')

module.exports = {
    test
}

const REPLY = {
    id: 100,
    thread_id: 200,
    text: 'TESTE',
    delete_password: '123',
}

const REPLY_CHANGE = {
    thread_id: THREAD.id,
    reply_id: REPLY.id,
    delete_password: REPLY.delete_password
}

const THREAD = {
    id: 100,
    board_id: 120,
    text: 'TESTE',
    bumped_on: null,
    delete_password: '123',
}

const THREAD_CHANGE = {
    thread_id: THREAD.id,
    delete_password: THREAD.delete_password,
}

async function test(server){
    describe('Reply Tests', function() {
    
        this.timeout(Infinity)
    
        this.beforeAll(async () => {
            app = await server
        })
    
        it('[POST] /replies/:thread_id - Create reply', async () => {
            const result = await app.inject({
                method: 'POST',
                headers,
                url: `/replies/${THREAD.id}`,
                payload: JSON.stringify(REPLY)
            })
            const statusCode = result.statusCode
            assert.deepEqual(statusCode, 200)    
        })
    
        it('[GET] /replies/:thread_id - Get replies by thread id', async () => {
            const result = await app.inject({
                method: 'GET',
                headers,
                url: `/replies/${THREAD.id}`,
            })
            const statusCode = result.statusCode
            assert.deepEqual(statusCode, 200)
        })
        
        it('[UPDATE] /replies - Update reply status by thread id reply id and password', async () => {
            const result = await app.inject({
                method: 'PUT',
                headers,
                url: '/replies',
                payload: JSON.stringify(REPLY_CHANGE),
            })
            const statusCode = result.statusCode
            assert.deepEqual(statusCode, 200)
        })

        it('[DELETE] /replies - Delete reply by thread id reply id and password', async () => {
            const result = await app.inject({
                method: 'DELETE',
                headers,
                url: '/replies',
                payload: JSON.stringify(REPLY_CHANGE),
            })
            const statusCode = result.statusCode
            assert.deepEqual(statusCode, 200)
        }) 
    })
}