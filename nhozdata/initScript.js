var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nhozapp'
});

var providerIdType = 'varchar(64)';
var articleIdType = 'varchar(64)';

connection.connect();

connection.query(
    'CREATE TABLE IF NOT EXISTS provider(id ' + providerIdType + ', name varchar(128), primary key (id))',
    function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log("TABLA DE PROVEEDORES OK!");
        }
    });

connection.query(
    'create table IF NOT EXISTS article(provider_id ' + providerIdType + ', id ' + articleIdType + ', description varchar(128), price decimal(10,2), foreign key (provider_id) references provider(id) on delete cascade, primary key (provider_id,id))',
    function (err, rows, fields) {
        if (err) {
            console.error("ERROR AL CREAR LA TABLA DE ARTICULOS: " + err);
        } else {
            console.log("TABLA DE ARTICULOS OK!");
        }
    });

connection.query(
    'create table IF NOT EXISTS stock(provider_id ' + providerIdType + ', article_id ' + articleIdType + ', current int, ini int, foreign key (provider_id,article_id) references article (provider_id,id), primary key (provider_id,article_id))',
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