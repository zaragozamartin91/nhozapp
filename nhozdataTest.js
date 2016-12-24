var nhozdata = require('./nhozdata');
var flow = require('nimble');

flow.series([
    function (callback) {
        nhozdata.deleteAllProviders(callback);
    },

    function (callback) {
        nhozdata.addProvider({
            id: "123",
            name: "MIGLUZ",
        }, callback);
    },

    function (callback) {
        nhozdata.addProvider({
            id: "345",
            name: "PLAVICON",
        }, callback);
    },

    function (callback) {
        nhozdata.getProvider({},
            (err, rows) => {
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