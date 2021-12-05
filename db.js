var mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'forums'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;