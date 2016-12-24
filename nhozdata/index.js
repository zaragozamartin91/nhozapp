var config = require('./config');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

/** Elimina un proveedor.
 * @param {Object} query datos de la query.
 */
module.exports.deleteProvider = function (query) {
    var id = query.id;
    var name = query.name;
    var callback = query.callback || function () { };

    if (id) {
        pool.query(
            `DELETE FROM ${config.providerTableName} WHERE id="${id}"`,
            callback);
    } else if (name) {
        pool.query(
            `DELETE FROM ${config.providerTableName} WHERE name="${name}"`,
            callback);
    } else {
        pool.query(`DELETE FROM ${config.providerTableName}`, callback);
    }
};

module.exports.getProvider = function (query) {
    var id = query.id;
    var name = query.name;
    var callback = query.callback || function () { };

    if (id) {
        pool.query(`SELECT * FROM ${config.providerTableName} WHERE id="${id}"`,
            callback);
    } else if (name) {
        pool.query(`SELECT * FROM ${config.providerTableName} WHERE name="${name}"`,
            callback);
    } else {
        pool.query(`SELECT * FROM ${config.providerTableName}`,
            callback);
    }
};

module.exports.addProvider = function (query) {
    var id = query.id;
    var name = query.name || `Proveedor ${id}`;
    var callback = query.callback || function () { };

    if (id) {
        pool.query(`INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`, callback);
    } else {
        var msg = 'NO SE INGRESO UN ID DE PROVEEDOR';
        console.error(msg);
        callback({ msg: msg });
    }
};

module.exports.addArticle = function (query) {
    var providerId = query.providerId;
    var id = query.id;
    var description = query.description || `Articulo ${id} de proveedor ${providerId}`;
    var price = query.price;
    var callback = query.callback || function () { };

    pool.query(
        `INSERT INTO ${config.articleTableName} VALUES ("${providerId}","${id}","${description}","${price}")`,
        callback);
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
            callback: callback
        });
    },

    function (callback) {
        module.exports.addProvider({
            id: "123",
            name: "MIGLUZ",
            callback: callback
        });
    },

    function (callback) {
        module.exports.addProvider({
            id: "345",
            name: "PLAVICON",
            callback: callback
        });
    },

    function (callback) {
        module.exports.getProvider({
            callback: (err, rows) => {
                console.log("PROVEEDORES: ");
                console.log(rows);
                callback(err, rows);
            }
        });
    },

    function (callback) {
        pool.end(err => {
            if (err) console.error(`ERROR AL CERRAR POOL: ${err}`)
            else console.log("POOL CERRADO");
            callback();
        })
    }
]);