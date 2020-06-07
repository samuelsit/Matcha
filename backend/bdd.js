var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'matcha'
})

console.log('Connect to mySQL Matcha');

module.exports = connection