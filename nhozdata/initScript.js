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
    `CREATE TABLE IF NOT EXISTS ${config.providerTableName} (id ${config.providerIdType}, name varchar(128), primary key (id))`,
    function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log("TABLA DE PROVEEDORES OK!");
        }
    });

connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.articleTableName} (provider_id ${config.providerIdType}, id ${config.articleIdType}, description varchar(128), price decimal(10,2), foreign key (provider_id) references ${config.providerTableName}(id) ON DELETE CASCADE ON UPDATE CASCADE , primary key (provider_id,id))`,
    function (err, rows, fields) {
        if (err) {
            console.error("ERROR AL CREAR LA TABLA DE ARTICULOS: " + err);
        } else {
            console.log("TABLA DE ARTICULOS OK!");
        }
    });

connection.query(
    `CREATE TABLE IF NOT EXISTS ${config.stockTableName} (provider_id ${config.providerIdType}, article_id ${config.articleIdType}, current int default 0, ini int default 0, foreign key (provider_id,article_id) references ${config.articleTableName} (provider_id,id) ON DELETE CASCADE ON UPDATE CASCADE, primary key (provider_id,article_id))`
        .replace('%TABLE_NAME%', config.stockTableName)
        .replace('%PROVIDER_ID_TYPE%', config.providerIdType)
        .replace('%ARTICLE_ID_TYPE%', config.articleIdType),
    function (err, rows, fields) {
        if (err) {
            console.error("ERROR AL CREAR LA TABLA DE STOCK: " + err);
        } else {
            console.log("TABLA DE STOCK OK!");
        }
    });

connection.end(function (err) {
    if (err) console.error("Error al cerrar la conexion: " + err);
});