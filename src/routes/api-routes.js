
const express = require('express');
const entityId = require('../middleware/entity-id');
const registerBodyValidator = require ('../middleware/json-body-validate-middleware');
const authMiddleware = require('../middleware/authorizer');

const getMessagesHandler = require('../handlers/get-all-messages-handler');
const showMessageHandler = require('../handlers/show-message-handler');
const updateMessageHandler = require('../handlers/update-message-handler');
const createMessageHandler = require('../handlers/create-message-handler');

const routes = server => {
    const apiRouter = express.Router();
    apiRouter.use(authMiddleware);
    server.use('/api',apiRouter);
    apiRouter.get('/messages', getMessagesHandler);
    apiRouter.post('/messages', registerBodyValidator('create-message-item'), createMessageHandler);
    apiRouter.get('/messages/:id', entityId, showMessageHandler);
    apiRouter.patch('/messages/:id', entityId, registerBodyValidator('status-body'), updateMessageHandler);

};

module.exports = routes;