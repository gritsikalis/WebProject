const mysql = require('mysql2'); //
const { createPool } = require('mysql2/promise');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database: 'webbase'
})
const promisifiedPool = pool.promise();

module.exports = {promisifiedPool}