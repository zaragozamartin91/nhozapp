/* Este es el lector de DBF que mejor funciona. */
var DBF = require('stream-dbf');
var parser = new DBF('./LISTAPRE.DBF');

var stream = parser.stream;
stream.on('readable', function () {
    var record = stream.read();
    console.log(record);
});
stream.on('end', function () {
    console.log('finished');
});
