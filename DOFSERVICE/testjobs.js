var schedule = require('node-schedule');
const axios = require("axios");
const cheerio = require("cheerio");
var dateFormat = require('dateformat');
var mysql = require('mysql');
var rule = new schedule.RecurrenceRule();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ExchangeRate"
});

var f = new Date();
dateFormat(f, "isoDate");
var year = f.getFullYear();
var month = ('0' + (f.getUTCMonth() + 1)).slice(-2);
var day = ('0' + f.getDate()).slice(-2);

var url = "http://www.dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=" + day + "%2F" + month + "%2F" + year + "&hfecha=" + day + "%2F" + month + "%2F" + year + "";


axios.get(url).then(response => {
    var $ = cheerio.load(response.data);
    var date = $(".txt").last().parent().children().first().text();
    var value = $(".txt").last().text();




    console.log(date);
    console.log(value);
    console.log(url);
    //Insert dates in the table 'rate'
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Data Base \n");

        date = f.format("%Y%m%d", true);
        var sql = `INSERT INTO rate (date,rate) VALUES (${date}, ${value})`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted \n");
            console.log("Last day inserted", month, day, year);
            console.log("------------------- \n");
        });
    });

});




Date.prototype.format = function (fstr, utc) {
    var that = this;
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace(/%[YmdHMS]/g, function (m) {
        switch (m) {
            case '%Y':
                return that[utc + 'FullYear']();
            case '%m':
                m = 1 + that[utc + 'Month']();
                break;
            case '%d':
                m = that[utc + 'Date']();
                break;
            case '%H':
                m = that[utc + 'Hours']();
                break;
            case '%M':
                m = that[utc + 'Minutes']();
                break;
            case '%S':
                m = that[utc + 'Seconds']();
                break;
            default:
                return m.slice(1);
        }
        return ('0' + m).slice(-2);
    });
};