const { getMessagesPaginated } =require("../../db/repo/messege-repo.js");

const getMessages = (limit) => getMessagesPaginated(limit, "all")
module.exports = {
    getMessages
};