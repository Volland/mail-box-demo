const { getMessagesPaginated, getMessageById, updateStatus } =require("../../db/repo/messege-repo.js");
const { createPaginator } = require("./paginator-helper");
const paginator = createPaginator('id', 'send_at');

const getMessages = (limit, filterType, cursor) => {
    const cursorData = cursor ? paginator.parseCursorToData(cursor) : {id: null , stamp: null};
    return getMessagesPaginated(limit, filterType, cursorData.id, cursorData.stamp).then(
        result => ({
            messages : result.data,
            nextCursor: paginator.calculateNextCursor(limit, result.data)
        })
    )
};
const getMessage = (id) => getMessageById(id).then(result => result);

const allowedPathKeys = ['is_read', 'is_archived'];
const updateMessage = (id , status) => {
    console.log('server:', id, status);

    if(!status) {

        return Promise.reject({errors : ['Empty object']})
    }

    const notAllowedFields  = Object.keys(status).filter(k => allowedPathKeys.indexOf(k) === -1);

    if(notAllowedFields.length > 0) {

        return Promise.reject({errors: [`Not allowed fields ${notAllowedFields.join(' , ')}`]});
    }

    return updateStatus(id, status.is_read, status.is_archived)
};

module.exports = {
    getMessages, getMessage, updateMessage
};