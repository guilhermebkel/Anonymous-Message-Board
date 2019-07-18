const fetch = require('node-fetch')
const assert = require('assert')

const NEW_BOARD = {
    title: "Testing board method"
}

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

        it('[POST] /boards - Create new board', async () => {
            const result = await fetch(`${process.env.LOCAL_HOST}/boards`, { 
                method: 'POST',
                body: JSON.stringify(NEW_BOARD),
                headers: { 'Content-Type': 'application/json' },
            })
            assert.deepEqual(result.status, 200) 
        })
    })
}