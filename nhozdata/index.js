var config = require('./config');
var mysql = require('mysql');

/** Crea una conexion con la BBDD. */
function createConnection() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
}
exports.createConnection = createConnection;

/** Realiza una query en la BBDD abriendo una conexion, ejecutando queries y cerrando la conexion. No funciona con NESTED QUERIES, solo sirve para queries regulares.
 * @param {Function} queryActions Acciones/Queries a realizar. Funciones que reciben como parametro un objeto tipo conexion listo para usar.
 */
function doQuery(queryActions) {
    var connection = createConnection();
    connection.connect(function (err) {
        if (err) {
            console.error("ERROR AL OBTENER CONEXION CON BBDD");
        }
        if (queryActions.forEach) queryActions.forEach(function (queryAction) { queryAction(connection); });
        else queryActions(connection);

        connection.end();
    });
}
exports.doQuery = doQuery;

/** Elimina un proveedor.
 * @param {Object} queryData Datos de la query.
 * @param {Function} callback Funcion a invocar al terminar.
 */
module.exports.deleteProvider = function (queryData, callback) {
    var id = queryData.id;
    var name = queryData.name;
    var callback = callback || function () { };

    var db = createConnection();
    db.connect(function (err) {
        if (err) {
            callback(err);
        } else {
            if (id) {
                db.query(
                    `DELETE FROM ${config.providerTableName} WHERE id="${id}"`,
                    callback);
            } else if (name) {
                db.query(
                    `DELETE FROM ${config.providerTableName} WHERE name="${name}"`,
                    callback);
            } else {
                var msg = "NO SE INDICARON DATOS SUFICIENTES PARA ELIMINAR AL PROVEEDOR";
                console.error(msg);
                callback(new Error(msg));
            }

            db.end();
        }
    });
};

/** Elimina todos los proveedores.
 * @param {Function} callback Funcion a llamar luego de eliminar a los proveedores.
 */
module.exports.deleteAllProviders = function (callback) {
    doQuery(function (db) {
        db.query(
            `DELETE FROM ${config.providerTableName}`,
            callback);
    });
};

/** Obtiene proveedores a partir de una conexion ya establecida con la BBDD.
 * @param {IConnection} db Conexion con la BBDD.
 * @param {Object} queryData Datos de los proveedores a eliminar.
 * @param {Function} callback Funcion a invocar cuando se obtengan los proveedores.
 */
module.exports.dbGetProvider = function (db, queryData, callback) {
    queryData = queryData || {};
    var callback = callback || function () { };

    if (queryData.id) {
        db.query(
            `SELECT * FROM ${config.providerTableName} WHERE id="${queryData.id}"`,
            callback);
    } else if (queryData.name) {
        db.query(
            `SELECT * FROM ${config.providerTableName} WHERE name="${queryData.name}"`,
            callback);
    } else {
        db.query(
            `SELECT * FROM ${config.providerTableName}`,
            callback);
    }
}

/** Obtiene proveedores.
 * @param {Object} queryData Datos de los proveedores a eliminar.
 * @param {Function} callback Funcion a invocar cuando se obtengan los proveedores.
 */
module.exports.getProvider = function (queryData, callback) {
    queryData = queryData || {};
    var callback = callback || function () { };

    doQuery(function (db) {
        module.exports.dbGetProvider(db, queryData, callback);
    });
};

/** Determina si un proveedor existe.
 * @param {Object} queryData Informacion del proveedor buscado.
 * @param {Function} callback Funcion a ejecutar al finalizar.
 */
module.exports.providerExists = function (queryData, callback) {
    module.exports.getProvider(queryData, function (err, rows) {
        var exists = false;
        if (rows) {
            exists = rows.length > 0;
        }
        callback(err, exists);
    });
};

/** Elimina un grupo de proveedores.
 * @param {Object} queryData Ids de proveedores a eliminar ya sea como arreglo o como objeto: {ids:[proveedores...]}.
 * @param {Function} callback Funcion a invocar cuando termine la eliminacion de los proveedores.
 */
module.exports.deleteProviders = function (queryData, callback) {
    queryData = queryData || [];
    var ids = queryData.ids || queryData;
    if (ids) {
        if (ids.length > 0) {
            var query = `DELETE FROM ${config.providerTableName} WHERE`;
            var lastIndex = ids.length - 1;
            for (var i = 0; i < ids.length; i++) {
                query += ` id="${ids[i]}"`;
                if (i < lastIndex) {
                    query += " OR";
                }
            }
            console.log(`BORRANDO PROVEEDORES CON QUERY: ${query}`);
            doQuery(function (db) {
                db.query(query, callback);
            });
        } else {
            callback(null);
        }
    } else {
        callback(new Error("No se indicaron ids de proveedores a eliminar"));
    }
};

/** Obtiene proveedores.
 * @param {Object} queryData Datos de los proveedores a eliminar.
 * @param {Function} callback Funcion a invocar cuando se obtengan los proveedores.
 */
module.exports.getProviderLike = function (queryData, callback) {
    queryData = queryData || {};

    var id = queryData.id;
    var name = queryData.name;
    var callback = callback || function () { };

    doQuery(function (db) {
        if (id) {
            db.query(
                `SELECT * FROM ${config.providerTableName} WHERE id LIKE "%${id}%"`,
                callback);
        } else if (name) {
            db.query(
                `SELECT * FROM ${config.providerTableName} WHERE name LIKE "%${name}%"`,
                callback);
        } else {
            db.query(
                `SELECT * FROM ${config.providerTableName}`,
                callback);
        }
    });
};

/** Agrega un proveedor.
 * @param {Object} queryData Datos del proveedor a agregar.
 * @param {Function} callback Funcion a invocar despues de agregar el proveedor.
 */
module.exports.addProvider = function (queryData, callback) {
    queryData = queryData || {};
    var id = queryData.id;
    var name = queryData.name || `Proveedor ${id}`;
    var callback = callback || function () { };

    doQuery(function (db) {
        if (id) {
            db.query(
                `INSERT INTO ${config.providerTableName} VALUES ('${id}','${name}')`,
                callback);
        } else {
            var msg = 'NO SE INGRESO UN ID DE PROVEEDOR';
            console.error(msg);
            callback(new Error(msg));
        }
    });
};

/** Actualiza un proveedor.
 * @param {IConnection} db Conexion con la BBDD.
 * @param {Object} queryData Id del proveedor a actualizar.
 * @param {Object} newData Nuevos datos del proveedor.
 * @param {Function} callback Funcion a invocar despues de agregar el proveedor.
 */
module.exports.dbUpdateProvider = function (db, queryData, newData, callback) {
    var callback = callback || function () { };

    if (queryData) {
        var providerId = queryData.id || queryData;
        var query = `UPDATE ${config.providerTableName} SET id="${newData.id}", name="${newData.name}" WHERE id="${providerId}"`;
        db.query(query, callback);
    } else {
        callback(new Error("No se indico informacion del proveedor a actualizar"));
    }
};

/** Actualiza un proveedor.
 * @param {Object} queryData Id del proveedor a actualizar.
 * @param {Object} newData Nuevos datos del proveedor.
 * @param {Function} callback Funcion a invocar despues de agregar el proveedor.
 */
module.exports.updateProvider = function (queryData, newData, callback) {
    var callback = callback || function () { };

    if (queryData) {
        var providerId = queryData.id || queryData;
        if (providerId) {

            var db = createConnection();
            db.connect(function (err) {
                if (err) {
                    callback(new Error("Error al establecer conexion con la BBDD"));
                } else {
                    exports.dbGetProvider(db, { id: providerId }, function (err, rows) {
                        if (err) {
                            callback(err);
                        } else if (rows.length == 0) {
                            callback(new Error(`Proveedor ${providerId} no existe`));
                        } else {
                            var provider = rows[0];
                            var newId = newData.id || provider.id;
                            var newName = newData.name || provider.name;

                            module.exports.dbUpdateProvider(db, provider.id, { id: newId, name: newName }, function (err) {
                                callback(err);
                                db.end();
                            });
                        }
                    });
                }
            });
        } else {
            callback(new Error("No se indico el ID del proveedor a actualizar"));
        }
    } else {
        callback(new Error("No se indico informacion del proveedor a actualizar"));
    }
};

/** Se agrega un articulo.
 * @param {Object} queryData Datos del articulo a agregar.
 * @param {Function} callback Funcion a invocar luego de agregar el articulo.
 */
module.exports.addArticle = function (queryData, callback) {
    queryData = queryData || {};
    var providerId = queryData.providerId;
    var id = queryData.id;
    var callback = callback || function () { };


    if (providerId) {
        if (id) {
            var description = queryData.description || `Articulo ${id} de proveedor ${providerId}`;
            var price = queryData.price || 0.0;
            var currStock = queryData.currStock || 0;
            var iniStock = queryData.iniStock || 0;
            var callback = callback || function () { };

            db.query(
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

module.exports.getArticle = function (queryData, callback) {
    var queryData = queryData || {};
    var callback = callback || function () { };
    var articleId = queryData.id;
    var providerId = queryData.providerId;
    var description = queryData.description;

    var db = createConnection();
    db.connect(function (err) {
        if (err) {
            callback(new Error("Error al conectarse con BBDD"));
            return;
        }

        if (articleId || providerId || description) {
            var query = `SELECT * FROM ${config.articleTableName} WHERE `;
            var firstWhereSet = false;

            if (providerId) {
                firstWhereSet = true;
                query += `provider_id="${providerId}" `;
            }

            if (articleId) {
                if (firstWhereSet) {
                    query += `AND id="${articleId}"`;
                } else {
                    firstWhereSet = true;
                    query += `id="${articleId}"`;
                }
            }

            if (description) {
                if (firstWhereSet) {
                    query += `AND description="${description}" `;
                } else {
                    query += `description="${description}" `;
                }
            }

            db.query(query, callback);
        } else {
            callback(new Error("No se ingreso informacion para buscar articulo"));
        }

        db.end();
    });
};

/** Elimina articulos.
 * @param {Object} queryData Datos del articulo a eliminar.
 * @param {Function} callback Funcion a invocar cuando termine la eliminacion.
 */
module.exports.deleteArticle = function (queryData, callback) {
    queryData = queryData || {};
    var providerId = queryData.providerId;
    var articleId = queryData.articleId;
    var callback = callback || function () { };

    var db = createConnection();
    db.connect(function (err) {
        if (err) {
            callback(new Error("No se pudo obtener la conexion con la BBDD"));
        } else {
            if (providerId) {
                if (articleId) {
                    db.query(
                        `DELETE FROM ${config.articleTableName} WHERE provider_id="${providerId}" AND id="${articleId}"`,
                        callback);
                } else {
                    db.query(
                        `DELETE FROM ${config.articleTableName} WHERE provider_id="${providerId}"`,
                        callback);
                }
            } else {
                var msg = "NO SE INGRESO UN ID DE PROVEEDOR DEL ARTICULO";
                console.error(msg);
                callback({ msg });
            }
            db.end();
        }
    });
};