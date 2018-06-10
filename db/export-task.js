const copyFrom = require('pg-copy-streams').from;
const streams = require('memory-streams');
const pino = require('pino')();
const { pool } = require('../db-provider');
const validate  = require('../validators/schema-validator');

const exportMessagesFromJson = file => {
    const data = parseJsonFile(file);
    if(data && data.messages && data.messages.length > 0) {
        const csvWriter = streams.WritableStream();
        pool.connect((err, client, done) => {
            if(err) {
                pinno.error('Connection failed',err);
                throw Error(err);
            }
            const copyStream = client.query(copyFrom('COPY public.messages sender,subject,time_sent FROM STDIN'));
            const csvWriterStream = streams.WritableStream();
            csvWriterStream.pipe(copyStream);
            copyStream.on('end', done);
            copyStream.on('error', done);
            data.messages.forEach(item => {
                let validationResult = validate('export-message-item', item);
                if (validationResult.isValid) {
                    csvWriter.write(`${item.sender},${item.subject},${item.message},${item.time_sent}`);

                } else {
                    pino.warn(`Invalid item ${JSON.stringify(item)} \n errors : ${ajv.errorMessage}`);
                }
            })

        });

    } else {
        throw Error('empty export ')
    }
};
module.exports = exportMessagesFromJson;
