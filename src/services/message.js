const { getMessagesPaginated } =require("../../db/repo/messege-repo.js");
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

module.exports = {
    getMessages
};