const assert = require('assert')
const { REPLY, REPLY_CHANGE, THREAD } = require('../core/tests/models')

module.exports = {
    test
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