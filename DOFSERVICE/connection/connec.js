var mysql = require('mysql');

//Create connection to MYSQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ExchangeRate"
});
