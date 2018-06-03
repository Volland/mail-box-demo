const { Pool } = require('pg');
const pool = new Pool();


const query = (sql, params) => {
    pool.query(sql, params);
};

export.module = {
    query
};
