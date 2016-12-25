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
        var msg = "NO SE INDICARON DATOS SUFICIENTES PARA ELIMINAR AL PROVEEDOR";
        console.error(msg);
        callback({ msg });
    }
};

/** Elimina todos los proveedores.
 * @param {Function} callback Funcion a llamar luego de eliminar a los proveedores.
 */
module.exports.deleteAllProviders = function (callback) {
    pool.query(
        `DELETE FROM ${config.providerTableName}`,
        callback);
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
    if (providerId) {
        if (id) {
            var description = queryData.description || `Articulo ${id} de proveedor ${providerId}`;
            var price = queryData.price || 0.0;
            var currStock = queryData.currStock || 0;
            var iniStock = queryData.iniStock || 0;
            var callback = callback || function () { };

            pool.query(
                `INSERT INTO ${config.articleTableName} VALUES ("${providerId}","${id}","${description}","${price}",${currStock},${iniStock})`,
                callback);
        } else {
            var msg = "NO SE INDICO ID DE ARTICULO";
            console.error(msg);
            callback({ msg: msg });
        }
    } else {
        var msg = "NO SE INDICO ID DE PROVEEDOR";
        console.error(msg);
        callback({ msg: msg });
    }
};

/** Elimina articulos.
 * @param {Object} queryData Datos del articulo a eliminar.
 * @param {Function} callback Funcion a invocar cuando termine la eliminacion.
 */
module.exports.deleteArticle = function (queryData, callback) {
    var providerId = queryData.providerId;
    var articleId = queryData.articleId;
    var callback = callback || function () { };

    if (providerId) {
        if (articleId) {
            pool.query(
                `DELETE FROM ${config.articleTableName} WHERE provider_id="${providerId}" AND id="${articleId}"`,
                callback);
        } else {
            pool.query(
                `DELETE FROM ${config.articleTableName} WHERE provider_id="${providerId}"`,
                callback);
        }
    } else {
        var msg = "NO SE INGRESO UN ID DE PROVEEDOR DEL ARTICULO";
        console.error(msg);
        callback({ msg });
    }
};

module.exports.endPool = function () {
    pool.end(function (err) {
        if (err) {
            console.error("OCURRIO UN ERROR AL CERRAR EL POOL DE CONEXIONES: " + err);
        } else {
            console.log("POOL DE CONEXIONES CERRADO");
        }
    });
};