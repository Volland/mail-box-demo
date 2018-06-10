module.exports = (message) => Object.assign({}, {
    is_read: false,
    is_archived: false,
    send_at: Math.round((new Date).getTime()/ 1000)
}, message);