module.exports = {
    REPLY,
    REPLY_CHANGE,
    THREAD,
    THREAD_CHANGE
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