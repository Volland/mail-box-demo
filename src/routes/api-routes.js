const authMiddleware = require('../middleware/authorizer');
const express = require('express');
const getMessageHandler = require('../handlers/get-all-messages-handler');
const routes = server => {
    const apiRouter = express.Router();
    server.use('/api',apiRouter);
    apiRouter.get('/messages', getMessageHandler);
    apiRouter.get('/messages/:id', getMessageHandler);
};

module.exports = routes;