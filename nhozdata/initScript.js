var config = require('./config');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


connection.connect();

connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.providerTableName} (id ${config.providerIdType}, name VARCHAR(128), PRIMARY KEY (id))`,
    function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log("TABLA DE PROVEEDORES OK!");
        }
    });

connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.articleTableName} (provider_id ${config.providerIdType}, id ${config.articleIdType}, description VARCHAR(128), price DECIMAL(10,2) DEFAULT 0, currStock INT DEFAULT 0, iniStock INT DEFAULT 0, FOREIGN KEY (provider_id) REFERENCES ${config.providerTableName}(id) ON DELETE CASCADE ON UPDATE CASCADE , PRIMARY KEY (provider_id,id))`,
    function (err, rows, fields) {
        if (err) {
            console.error("ERROR AL CREAR LA TABLA DE ARTICULOS: " + err);
        } else {
            console.log("TABLA DE ARTICULOS OK!");
        }
    });

connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.clientTableName} (id ${config.clientIdType}, name VARCHAR(64))`,
    function (err, rows, fields) {
        if (err) {
            console.error("ERROR AL CREAR LA TABLA DE CLIENTES");
        } else {
            console.log("TABLA DE CLIENTES OK!");
        }
    });

connection.end(function (err) {
    if (err) console.error("Error al cerrar la conexion: " + err);
});