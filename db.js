var mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.dbpassword,
    database : process.env.database
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;