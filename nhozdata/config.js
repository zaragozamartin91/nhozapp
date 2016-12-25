module.exports.host = 'localhost';
module.exports.user = 'root';
module.exports.password = 'root';
module.exports.database = 'nhozapp';

module.exports.providerTableName = 'provider';
module.exports.providerIdType = 'varchar(64)';

module.exports.articleTableName = 'article';
module.exports.articleIdType = 'varchar(64)';

/* El id de un cliente puede corresponder a su DNI o CUIL/CUIT */
module.exports.clientTableName = 'clients';
module.exports.clientIdType = 'varchar(64)';