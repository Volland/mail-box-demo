const authMiddleware = require('../middleware/authorizer');
const express = require('express');
const entityId = require('../middleware/entity-id');
const getMessagesHandler = require('../handlers/get-all-messages-handler');
const showMessageHandler = require('../handlers/show-message-handler');
const updateMessageHandler = require('../handlers/update-message-handler')
const routes = server => {
    const apiRouter = express.Router();
    server.use('/api',apiRouter);
    apiRouter.get('/messages', getMessagesHandler);
    apiRouter.get('/messages/:id', entityId, showMessageHandler);
    apiRouter.patch('/messages/:id', entityId, updateMessageHandler);
};

module.exports = routes;