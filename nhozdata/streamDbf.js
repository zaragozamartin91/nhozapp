/* Este es el lector de DBF que mejor funciona. */
var DBF = require('stream-dbf');
var parser = new DBF(__dirname + '/LISTAPRE.DBF');
var mysql = require('mysql');
var config = require('./config');

var db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

var stream = parser.stream;


stream.on('readable', function () {
    var record = stream.read();
    if (record) {

        db.query(
            `INSERT INTO ${config.providerTableName} VALUES ('${record.CODIGOPROV}','Proveedor ${record.CODIGOPROV}')`,
            function (err) {
                if (err) {
                    console.error(`ERROR AL INSERTAR PROVEEDOR ${record.CODIGOPROV}: ${err}`);
                } else {
                    console.log(`PROVEEDOR ${record.CODIGOPROV} INSERTADO`);
                }
            });
    };
});

stream.on('end', function () {
    console.log('FINISHED READING');
    setTimeout(function () {
        console.log("CERRANDO CONEXION CON BBDD");
        db.end();
    }, 20 * 1000);
});
