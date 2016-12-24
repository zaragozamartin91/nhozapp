var config = require('./config');

var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

/** Elimina un proveedor.
 * @param {Object} queryData Datos de la query.
 * @param {Function} callback Funcion a invocar al terminar.
 */
module.exports.deleteProvider = function (queryData, callback) {
    var id = queryData.id;
    var name = queryData.name;
    var callback = callback || function () { };

    if (id) {
        pool.query(
            `DELETE FROM ${config.providerTableName} WHERE id="${id}"`,
            callback);
    } else if (name) {
        pool.query(
            `DELETE FROM ${config.providerTableName} WHERE name="${name}"`,
            callback);
    } else {
        pool.query(
            `DELETE FROM ${config.providerTableName}`, 
            callback);
    }
};

/** Obtiene proveedores.
 * @param {Object} queryData Datos de los proveedores a eliminar.
 * @param {Function} callback Funcion a invocar cuando se obtengan los proveedores.
 */
module.exports.getProvider = function (queryData, callback) {
    var id = queryData.id;
    var name = queryData.name;
    var callback = callback || function () { };

    if (id) {
        pool.query(
            `SELECT * FROM ${config.providerTableName} WHERE id="${id}"`,
            callback);
    } else if (name) {
        pool.query(
            `SELECT * FROM ${config.providerTableName} WHERE name="${name}"`,
            callback);
    } else {
        pool.query(
            `SELECT * FROM ${config.providerTableName}`,
            callback);
    }
};

/** Agrega un proveedor.
 * @param {Object} queryData Datos del proveedor a agregar.
 * @param {Function} callback Funcion a invocar despues de agregar el proveedor.
 */
module.exports.addProvider = function (queryData, callback) {
    var id = queryData.id;
    var name = queryData.name || `Proveedor ${id}`;
    var callback = callback || function () { };

    if (id) {
        pool.query(
            `INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`,
            callback);
    } else {
        var msg = 'NO SE INGRESO UN ID DE PROVEEDOR';
        console.error(msg);
        callback({ msg: msg });
    }
};

/** Se agrega un articulo.
 * @param {Object} queryData Datos del articulo a agregar.
 * @param {Function} callback Funcion a invocar luego de agregar el articulo.
 */
module.exports.addArticle = function (queryData, callback) {
    var providerId = queryData.providerId;
    var id = queryData.id;
    var description = queryData.description || `Articulo ${id} de proveedor ${providerId}`;
    var price = queryData.price;
    var callback = callback || function () { };

    pool.query(
        `INSERT INTO ${config.articleTableName} VALUES ("${providerId}","${id}","${description}","${price}")`,
        callback);
};

module.exports.endPool = function () {
    pool.end(err => {
        if (err) {
            console.error("OCURRIO UN ERROR AL CERRAR EL POOL DE CONEXIONES: " + err);
        } else {
            console.log("POOL DE CONEXIONES CERRADO");
        }
    });
};