var nhozdata = require('./nhozdata');
var flow = require('nimble');

var nhozdata2 = require('./nhozdata');

flow.series([
    function (callback) {
        nhozdata.createPool();
        callback();
    },

    function (callback) {
        nhozdata.deleteAllProviders(function (err) {
            if (err) {
                console.error("ERROR AL ELIMINAR A LOS PROVEEDORES");
                console.error(err);
            } else {
                console.log("PROVEEDORES ELIMINADOS");
            }
            callback(err);
        });
    },

    function (callback) {
        var provider = {
            id: "123",
            name: "MIGLUZ",
        }
        nhozdata2.addProvider(provider, function (err) {
            if (err) {
                console.error(`ERROR AL AGREGAR A ${provider.id}`);
            } else {
                console.log(`PROVEEDOR ${provider.id} AGREGADO`);
            }
            callback(err);
        });
    },

    function (callback) {
        var provider = {
            id: "456",
            name: "PLAVICON",
        }
        nhozdata2.addProvider(provider, function (err) {
            if (err) {
                console.error(`ERROR AL AGREGAR A ${provider.id}`);
            } else {
                console.log(`PROVEEDOR ${provider.id} AGREGADO`);
            }
            callback(err);
        });
    },

    function (callback) {
        nhozdata.getProvider({},
            function (err, rows) {
                console.log("PROVEEDORES: ");
                console.log(rows);
                callback(err, rows);
            });
    },

    function (callback) {
        nhozdata.endPool();
        callback();
    }
]);