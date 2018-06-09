const authMiddleware = require('../middleware/authorizer');
const express = require('express');
const bodyParser = require('body-parser');

const entityId = require('../middleware/entity-id');
const getMessagesHandler = require('../handlers/get-all-messages-handler');
const showMessageHandler = require('../handlers/show-message-handler');
const updateMessageHandler = require('../handlers/update-message-handler');

const jsonParser = bodyParser.json({ type: 'application/json'});
const routes = server => {
    const apiRouter = express.Router();
    server.use('/api',apiRouter);
    apiRouter.get('/messages', getMessagesHandler);
    apiRouter.get('/messages/:id', entityId, showMessageHandler);

    apiRouter.patch('/messages/:id', entityId, jsonParser, updateMessageHandler);
};

module.exports = routes;