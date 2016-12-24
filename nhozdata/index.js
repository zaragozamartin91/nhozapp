var config = require('./config');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


module.exports.addProvider = function (id, name) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error("OCURRIO UN ERROR AL OBTENER UNA CONEXION CON LA BBDD: " + err);
            return;
        }

        if (id) {
            name = name || `Proveedor ${id}`;

            // Use the connection
            connection.query(`INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`,
                function (err, rows) {
                    if (err) {
                        console.error('OCURRIO UN ERROR AL AGREGAR UN PROVEEDOR: ' + err);
                    } else {
                        console.log(`PROVEEDOR ${id}::${name} AGREGADO EXITOSAMENTE`);
                    }
                });
        } else {
            console.error('NO SE INGRESO UN ID DE PROVEEDOR');
        }

        connection.release();
    });
};

module.exports.endPool = function () {
    pool.end(function (err) {
        if (err) {
            console.error("OCURRIO UN ERROR AL CERRAR EL POOL DE CONEXIONES: " + err);
        }
    });
};

module.exports.addProvider("PEPE");