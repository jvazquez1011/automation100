const http = require('http');
const hostname = '127.0.0.1';
const port = 1011;
var mysql = require('mysql');

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
       // console.log(result);

        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-type': 'text/plain' });
            res.write("Test: " + result);
            res.end();

        }).listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}`);
        });

    });
});


/*
var today = new Date();
var month = today.getUTCMonth()+1;
console.log(month);

*/