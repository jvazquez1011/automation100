const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql');
var dateFormat = require('dateformat');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ExchangeRate"
});

//Select rate
con.connect(function (errd) {
    if (errd) throw errd;
    //`Select rate, DATE_FORMAT(date, "%d-%m-%Y") from rate ORDER BY "date" DESC`
    con.query("Select rate, DATE_FORMAT(date, '%d-%m-%Y') from rate ORDER BY `rate`.`date` DESC LIMIT 1", function (errd, result, fields) {
        if (errd) throw errd;
        console.log(result);
    });
});


var f = new Date();
dateFormat(f, "isoDate");
var year = f.getFullYear();
var month = ('0' + (f.getUTCMonth() + 1)).slice(-2);
var day = ('0' + f.getDate()).slice(-2);

console.log(month, day, year);
