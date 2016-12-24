var config = require('./config');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

function poolAction(callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error("OCURRIO UN ERROR AL OBTENER UNA CONEXION CON LA BBDD: " + err);
            return;
        }
        callback(connection);
        connection.release();
    });
}

module.exports.addProvider = function (id, name, errCallback, succCallback) {
    poolAction(function (connection) {
        if (id) {
            name = name || `Proveedor ${id}`;
            errCallback = errCallback || function () { };
            succCallback = succCallback || function () { };

            // Use the connection
            connection.query(`INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`,
                function (err, rows) {
                    if (err) {
                        console.error('OCURRIO UN ERROR AL AGREGAR UN PROVEEDOR: ' + err);
                        errCallback();
                    } else {
                        console.log(`PROVEEDOR ${id}::${name} AGREGADO EXITOSAMENTE`);
                        succCallback();
                    }
                });
        } else {
            console.error('NO SE INGRESO UN ID DE PROVEEDOR');
        }
    });
};

module.exports.addArticle = function (providerId, id, description, price) {
    description = description || `Articulo ${id} de proveedor ${providerId}`;

    poolAction(function (connection) {
        connection.query(`INSERT INTO ${config.articleTableName} VALUES ("${providerId}","${id}","${description}","${price}")`,
            function (err) {
                if (err) {
                    console.error(`OCURRIO UN ERROR AL INGRESAR EL ARTICULO ${id} DEL PROVEEDOR ${providerId}: ${err}`);
                }
            });
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