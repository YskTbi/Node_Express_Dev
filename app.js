var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
require('date-utils');

app.use(cors());
app.use('/public', express.static('public'));
app.use('/', require('./routes/index.js'));

app.set('views', './views');
app.set('view engine', 'ejs');

var selectString = "SELECT  COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS AG ,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS BG ,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS CG,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS DG,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS EG,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '2.4G' or null) AND (DATETIME <= ? or null)) AS FG,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS AA,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS BA,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS CA,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS DA,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS EA,"
                 + "COUNT((CONNECTED = 1 or null) AND (TYPE = '5G' or null) AND (DATETIME <= ? or null)) AS FA FROM log_data";

app.get("/api", function(req, res, next){
    var now = new Date();
    var now_formatted = now.toFormat("YYYYMMDDHH24");
    var hour_formattedList = [];
    var lines = [];
    var count = 1;
    for(var i = 5; i > 0; i--){
        var hour = new Date();
        hour.setHours(now.getHours() -i);
        var hour_formatted = hour.toFormat("YYYYMMDDHH24");
        hour_formattedList.push(hour_formatted);
        lines.push({value: count, text: hour_formatted, position: 'start'});
        count++;
    }
    lines.push({value: 6, text: now_formatted, position: 'start'});

    var resList ={};
    resList["lines"]  = lines;
    var dataList = [];
    var def = false;
    var db = new sqlite3.Database('./db/demo.sqlite3');
    db.serialize(function () {
        db.all(selectString,
            [hour_formattedList[4], hour_formattedList[3], hour_formattedList[2], hour_formattedList[1], hour_formattedList[0],now_formatted,
             hour_formattedList[4], hour_formattedList[3], hour_formattedList[2], hour_formattedList[1], hour_formattedList[0],now_formatted],
        function (err, rows) {
            if (err) throw err;
            rows.forEach(function (row) {
                console.log(row);
                dataList.push(['x', 1, 2, 3, 4, 5, 6]);
                dataList.push(['testa', row.AG, row.BG, row.CG, row.DG, row.EG, row.FG]);
                dataList.push(['testg', row.AA, row.BA, row.CA, row.DA, row.EA, row.FA]);
                console.log(dataList);
                resList["columns"]  = dataList;
                res.json(resList);
            });
        });
    });
});

// サーバー起動
app.listen(3000);
//start log
console.log('Server running at http://localhost:3000');
