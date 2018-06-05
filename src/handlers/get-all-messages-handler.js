const { getMessages } = require("../services/message.js");
const getMessageHandler = (req, res) => getMessages(2)
    .then(data => res.status(200).json(data)).catch(e => res.status(400).json(e));

module.exports = getMessageHandler;
