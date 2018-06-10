const { Pool } = require('pg');
const pool = new Pool();
const pino = require('pino')();


pool.on('connect', function (client) {
    client.on('error', (e) => pino.error(e));
    client.on('query', (sql) => pino.trace(sql));
});
pool.on('error', function (error) {
    pino.error(error);
});

const query = (sql, params) => pool.query(sql, params);

module.exports = {
    query, pool
};
