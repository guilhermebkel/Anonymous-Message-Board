const assert = require('assert')

module.exports = {
    test
}

async function test(server){
    describe('Board Tests', function() {
    
        this.timeout(Infinity)
    
        this.beforeAll(async () => {
            app = await server
        })
    
        it('[GET] /boards - Get all boards', async () => {
            const result = await app.inject({
                method: 'GET',
                headers,
                url: '/boards',
            })
            const dados = JSON.parse(result.payload)
            const statusCode = result.statusCode
            assert.deepEqual(statusCode, 200)
            assert.ok(Array.isArray(dados))
            
        })
    })
}