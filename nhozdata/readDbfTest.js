/*Este lector funciona pero no detecta si un registro fue borrado.*/ 
var readDbf = require('read-dbf');

readDbf('./LISTAPRE.DBF', function (err, res) {
    if(err) {
        console.error(err);
        return;
    }

    res.forEach(function (record) {
        console.log(record);
    });
})