const express = require('express');
const pino = require('pino')();
const pinoLoggerMiddleware = require('express-pino-logger');
const yargs = require('yargs');
const apiRoutes = require('./routes/api-routes');

const defaultOptions = {
    port: 8080,
    host: 'mailbox.com',
};

const commandLineOptions = yargs.default(defaultOptions).argv;

const server = express();
// add logging middleware
server.use(pinoLoggerMiddleware());

server.get('/health', (req, res ) => res.json({ok: true}));

apiRoutes(server);

server.listen(commandLineOptions.port, () => {
    pino.info(` Server started on port ${commandLineOptions.port}`);
});



