var mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '2122254',
    database : 'forums',
    port: '3306'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;