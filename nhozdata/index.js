var config = require('./config');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports.deleteProvider = function (query) {
    var id = query.id;
    var name = query.name;
    var succCallback = query.succCallback;
    var errCallback = query.errCallback;

    errCallback = errCallback || function () { };
    succCallback = succCallback || function () { };

    if (id) {
        pool.query(`DELETE FROM ${config.providerTableName} WHERE id="${id}"`,
            function (err, rows) {
                if (err) {
                    console.error(`OCURRIO UN ERROR AL ELIMINAR EL PROVEDOR ${id}: ${err}`);
                    errCallback(err);
                } else {
                    console.log(`PROVEEDOR ${id} ELIMINADO`);
                    succCallback(rows);
                }
            });
    } else if (name) {
        pool.query(`DELETE FROM ${config.providerTableName} WHERE name="${name}"`,
            function (err, rows) {
                if (err) {
                    console.error(`OCURRIO UN ERROR AL ELIMINAR LOS PROVEEDORES ${name}: ${err}`);
                    errCallback(err);
                } else {
                    console.log(`PROVEEDORES ${name} ELIMINADOS`);
                    succCallback(rows);
                }
            });
    } else {
        pool.query(`DELETE FROM ${config.providerTableName}`,
            function (err, rows) {
                if (err) {
                    console.error(`OCURRIO UN ERROR AL ELIMINAR LOS PROVEEDORES: ${err}`);
                    errCallback(err);
                } else {
                    console.log(`PROVEEDORES ELIMINADOS`);
                    succCallback(rows);
                }
            });
    }
};

module.exports.getProvider = function (query) {
    var id = query.id;
    var name = query.name;
    var succCallback = query.succCallback;
    var errCallback = query.errCallback;

    errCallback = errCallback || function () { };
    succCallback = succCallback || function () { };

    if (id) {
        pool.query(`SELECT * FROM ${config.providerTableName} WHERE id="${id}"`,
            function (err, rows) {
                if (err) {
                    console.error(`ERROR AL OBTENER EL PROVEEDOR ${id}`);
                    errCallback(err);
                } else {
                    succCallback(rows);
                }
            });
    } else if (name) {
        pool.query(`SELECT * FROM ${config.providerTableName} WHERE name="${name}"`,
            function (err, rows) {
                if (err) {
                    console.error(`ERROR AL OBTENER EL PROVEEDORES ${name}`);
                    errCallback(err);
                } else {
                    succCallback(rows);
                }
            });
    } else {
        pool.query(`SELECT * FROM ${config.providerTableName}`,
            function (err, rows) {
                if (err) {
                    console.error(`ERROR AL OBTENER LOS PROVEEDORES`);
                    errCallback(err);
                } else {
                    succCallback(rows);
                }
            });
    }
};

module.exports.addProvider = function (query) {
    var id = query.id;
    var name = query.name;
    var succCallback = query.succCallback;
    var errCallback = query.errCallback;

    errCallback = errCallback || function () { };
    succCallback = succCallback || function () { };

    if (id) {
        name = name || `Proveedor ${id}`;

        // Use the connection
        pool.query(`INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`,
            function (err, rows) {
                if (err) {
                    console.error('OCURRIO UN ERROR AL AGREGAR UN PROVEEDOR: ' + err);
                    errCallback(err);
                } else {
                    console.log(`PROVEEDOR ${id}::${name} AGREGADO`);
                    succCallback();
                }
            });
    } else {
        console.error('NO SE INGRESO UN ID DE PROVEEDOR');
    }
};

module.exports.addArticle = function (query) {
    var providerId = query.providerId;
    var id = query.id;
    var description = query.description;
    var price = query.price;
    var succCallback = query.succCallback;
    var errCallback = query.errCallback;

    errCallback = errCallback || function () { };
    succCallback = succCallback || function () { };
    description = description || `Articulo ${id} de proveedor ${providerId}`;

    pool.query(`INSERT INTO ${config.articleTableName} VALUES ("${providerId}","${id}","${description}","${price}")`,
        function (err) {
            if (err) {
                console.error(`OCURRIO UN ERROR AL INGRESAR EL ARTICULO ${id} DEL PROVEEDOR ${providerId}: ${err}`);
                errCallback(err);
            } else {
                console.log(`ARTICULO ${providerId}::${id} AGREGADO!`);
                succCallback();
            }
        });
};

module.exports.endPool = function () {
    pool.end(function (err) {
        if (err) {
            console.error("OCURRIO UN ERROR AL CERRAR EL POOL DE CONEXIONES: " + err);
        }
    });
};

var flow = require('nimble');

flow.series([
    function (callback) {
        module.exports.deleteProvider({
            succCallback: function (rows) {
                callback(null, rows);
            },
            errCallback: callback
        });
    },

    function (callback) {
        module.exports.addProvider({
            id: "123",
            name: "MIGLUZ",
            succCallback: function (rows) {
                callback(null, rows);
            }
        });
    },

    function (callback) {
        module.exports.addProvider({
            id: "345",
            name: "PLAVICON",
            succCallback: function (rows) {
                callback(null, rows);
            }
        });
    },

    function (callback) {
        module.exports.getProvider({
            succCallback: function (rows) {
                console.log(`PROVEEDORES:`);
                console.log(rows);
                callback();
            },
            errCallback: callback
        });
    },

    function (callback) {
        pool.end(function (err) {
            if (err) console.error(`ERROR AL CERRAR POOL: ${err}`)
            else console.log("POOL CERRADO");
            callback();
        })
    }
]);