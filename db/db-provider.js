const { Pool } = require('pg');
const pool = new Pool();
const copyFrom = require('pg-copy-streams').from;
const streams = require('memory-streams');
const Ajv = require('ajv');
const fs = require('fs');
const pino = require('pino')();

const ajv = new Ajv();
const itemShema = require('./jsonshemas/message-item');


const query = (sql, params) => pool.query(sql, params);


const parseJsonFile = file => {
    try {
       return JSON.parse(fs.realpathSync(file, 'utf8'))
    }
    catch(e) {
        throw Error('not valid json file')
    }
};

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
                 if (ajv.validate(itemShema, item)) {
                     csvWriter.write(`${item.sender},${item.subject},${item.message},${item.time_sent}`);

                 } else {
                     pino.warn(`Invalid item ${JSON.stringify(item)} \n errors : ${ajv.errors}`);
                 }
             })

         });

     } else {
         throw Error('empty export ')
     }
};


export.module = {
    query
};
