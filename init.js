var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/demo.sqlite3');

db.serialize(function() {
    //log_dataテーブルがない場合、テーブルを作成する.
    var sql = "CREATE TABLE IF NOT EXISTS log_data (ID INTEGER PRIMARY KEY,"
            + "TYPE TEXT,"
            + "ADDRESS TEXT,"
            + "CONNECTED INTEGER,"
            + "SEVERITY TEXT,"
            + "MESSAGE TEXT,"
            + "RINFO TEXT,"
            + "DATETIME TEXT)";

    db.run(sql);

    var stmt = db.prepare("INSERT INTO log_data(TYPE,ADDRESS,CONNECTED,SEVERITY,MESSAGE,RINFO,DATETIME) VALUES (?,?,?,?,?,?,?)");
    // 仮データの登録
    stmt.run(["2.4","macaddress",1,"Notice","[macAddress AP1] : [SYSTEM]: WLAN[2.4G](#0), STA(macAddress) had associated successfully","{ address: '192.168.xxx.xxx', family: 'IPv4', port: xxxxx, size: 112 }","123456789"]);
    stmt.finalize();

    db.each("SELECT * FROM log_data", function(err, row) {
        console.log(row);
    });
});

db.close();
