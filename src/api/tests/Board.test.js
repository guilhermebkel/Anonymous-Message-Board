const fetch = require('node-fetch')
const assert = require('assert')

module.exports = {
    test
}

async function test(){
    describe('Board Tests', function() {
    
        this.timeout(Infinity)
    
        it('[GET] /boards - Get all boards', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/boards`, { method: 'GET' })
            assert.deepEqual(result.status, 200) 
        })
    })
}