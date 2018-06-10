const { getMessagesPaginated, getMessageById, updateStatus, createMessage } =require("../../db/repo/messege-repo.js");
const { createPaginator } = require("./paginator-helper");
const normaliseMessage = require('../converters/request-to-normalized-message');
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

const updateMessage = (id , status) => {
    const allowedPathKeys = ['is_read', 'is_archived'];
    if(!status) {

        return Promise.reject({errors : ['Empty object']})
    }

    const notAllowedFields  = Object.keys(status).filter(k => allowedPathKeys.indexOf(k) === -1);

    if(notAllowedFields.length > 0) {

        return Promise.reject({errors: [`Not allowed fields ${notAllowedFields.join(' , ')}`]});
    }

    return updateStatus(id, status.is_read, status.is_archived)
};

const newMessage = (message) => {
   return createMessage(normaliseMessage(message))
};

module.exports = {
    getMessages, getMessage, updateMessage, newMessage
};